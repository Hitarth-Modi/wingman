import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isAllowedEmail, parseAllowlist } from "./access-policy.mjs";

export function getAllowlist(): Set<string> {
  try {
    return parseAllowlist(readFileSync(join(process.cwd(), "access-allowlist.txt"), "utf8"));
  } catch {
    // Missing configuration must deny access.
    return new Set();
  }
}

export function isApprovedEmail(email: unknown): boolean {
  return isAllowedEmail(email, getAllowlist());
}
