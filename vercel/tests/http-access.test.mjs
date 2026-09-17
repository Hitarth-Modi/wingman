import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { encode } from "next-auth/jwt";
import { parseAllowlist } from "../lib/access-policy.mjs";

test("production server gates HTML and RSC content using verified, approved sessions", async (t) => {
  const reservation = createServer();
  await new Promise((resolve) => reservation.listen(0, "127.0.0.1", resolve));
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const secret = randomBytes(32).toString("hex");
  const approvedEmail = parseAllowlist(readFileSync(new URL("../access-allowlist.txt", import.meta.url), "utf8")).values().next().value;
  assert.ok(approvedEmail);
  const origin = `http://localhost:${port}`;
  const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", String(port)], {
    cwd: fileURLToPath(new URL("../", import.meta.url)),
    env: {
      ...process.env,
      NEXTAUTH_URL: origin,
      NEXTAUTH_SECRET: secret,
      GOOGLE_CLIENT_ID: "test-placeholder",
      GOOGLE_CLIENT_SECRET: "test-placeholder",
      CALLPILOT_SHEET_TOKEN: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const exited = new Promise((resolve) => child.once("exit", resolve));
  t.after(async () => {
    child.kill("SIGTERM");
    await exited;
  });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Server startup timed out")), 20_000);
    child.once("exit", () => { clearTimeout(timeout); reject(new Error("Server failed to start")); });
    child.stdout.on("data", (data) => {
      if (data.toString().includes("Ready")) { clearTimeout(timeout); resolve(); }
    });
  });

  async function request(token, headers = {}) {
    const cookie = token ? `next-auth.session-token=${await encode({ token, secret, maxAge: 60 })}` : "";
    return fetch(origin, { redirect: "manual", headers: { ...headers, cookie } });
  }

  const anonymous = await request();
  assert.equal(anonymous.status, 307);
  assert.equal(new URL(anonymous.headers.get("location"), origin).pathname, "/login");
  assert.doesNotMatch(await anonymous.text(), /Snapdeal|PDPs|organic traffic/);

  for (const token of [
    { email: approvedEmail },
    { email: approvedEmail, googleVerified: false },
    { email: "stranger@gumlet.com", googleVerified: true },
    { email: "hitarth@gmail.com", googleVerified: true },
  ]) {
    const denied = await request(token);
    assert.equal(denied.status, 307);
    assert.doesNotMatch(await denied.text(), /Snapdeal|PDPs/);
  }

  const spoofed = await request(undefined, {
    "oai-authenticated-user-id": "forged",
    "oai-authenticated-user-email": "hitarth@gumlet.com",
  });
  assert.equal(spoofed.status, 307);

  const rsc = await request(undefined, { RSC: "1" });
  assert.doesNotMatch(await rsc.text(), /Snapdeal|PDPs|organic traffic/);

  const admitted = await request({ email: approvedEmail, googleVerified: true });
  assert.equal(admitted.status, 200);
  const html = await admitted.text();
  assert.match(html, /Choose the prospect industry/);
  assert.match(html, /<title>wingman<\/title>/);
  assert.match(html, /E-commerce/);
  assert.match(html, /Snapdeal/);

  const login = await fetch(`${origin}/login`);
  assert.equal(login.status, 200);
  const loginHtml = await login.text();
  assert.match(loginHtml, /Sign in with Google/);
  assert.doesNotMatch(loginHtml, /Snapdeal|PDPs/);
  const deniedPage = await fetch(`${origin}/login?error=AccessDenied`);
  assert.match(await deniedPage.text(), /does not have access/);

  const csrf = await fetch(`${origin}/api/auth/csrf`);
  assert.equal(csrf.status, 200);
  assert.equal(typeof (await csrf.json()).csrfToken, "string");
  const session = await fetch(`${origin}/api/auth/session`);
  assert.deepEqual(await session.json(), {});

  const staticRoot = fileURLToPath(new URL("../.next/static/", import.meta.url));
  for (const file of readdirSync(staticRoot, { recursive: true }).filter((file) => file.endsWith(".js"))) {
    assert.doesNotMatch(readFileSync(join(staticRoot, file), "utf8"), /Gumlet increased traffic|ecommerceTrafficBenefits|organic visitors a month/);
  }
});
