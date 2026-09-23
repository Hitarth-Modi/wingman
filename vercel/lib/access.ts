import "server-only";
import { isGumletEmail } from "./access-policy.mjs";

export function isApprovedEmail(email: unknown): boolean {
  return isGumletEmail(email);
}
