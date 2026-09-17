import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { parseAllowlist, isAllowedEmail, isApprovedGoogleProfile } from "../lib/access-policy.mjs";

const allowlist = parseAllowlist(readFileSync(new URL("../access-allowlist.txt", import.meta.url), "utf8"));
const profile = { email: "hitarth@gumlet.com", email_verified: true, hd: "gumlet.com" };

test("only approved, Google-verified Gumlet Workspace accounts are admitted", () => {
  assert.ok(allowlist.size > 0);
  for (const email of allowlist) {
    assert.equal(isApprovedGoogleProfile("google", { ...profile, email }, allowlist), true);
  }
  for (const email of ["stranger@gumlet.com", "hitarth@gmail.com", "hitarth@gumlet.com.attacker.com", "", undefined]) {
    assert.equal(isApprovedGoogleProfile("google", { ...profile, email }, allowlist), false);
  }
  assert.equal(isApprovedGoogleProfile("google", { ...profile, email_verified: false }, allowlist), false);
  assert.equal(isApprovedGoogleProfile("google", { ...profile, hd: undefined }, allowlist), false);
  assert.equal(isApprovedGoogleProfile("google", { ...profile, hd: "other.com" }, allowlist), false);
  assert.equal(isApprovedGoogleProfile("credentials", profile, allowlist), false);
  assert.equal(isApprovedGoogleProfile("google", undefined, allowlist), false);
});

test("removing an email revokes access; parsing ignores comments and outside domains", () => {
  const edited = parseAllowlist("# Approved\r\n NISHA@GUMLET.COM \r\nattacker@gmail.com\n\n");
  assert.equal(isAllowedEmail("nisha@gumlet.com", edited), true);
  assert.equal(isAllowedEmail("hitarth@gumlet.com", edited), false);
  assert.equal(isAllowedEmail("attacker@gmail.com", edited), false);
  assert.equal(isAllowedEmail(profile.email, new Set()), false);
});
