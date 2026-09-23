import assert from "node:assert/strict";
import test from "node:test";
import { isGumletEmail, isApprovedGoogleProfile } from "../lib/access-policy.mjs";

const profile = { email: "hitarth@gumlet.com", email_verified: true, hd: "gumlet.com" };

test("all Google-verified Gumlet Workspace accounts are admitted", () => {
  for (const email of ["hitarth@gumlet.com", "new.employee@gumlet.com", "USER@GUMLET.COM"]) {
    assert.equal(isApprovedGoogleProfile("google", { ...profile, email }), true);
  }
  for (const email of ["hitarth@gmail.com", "hitarth@gumlet.com.attacker.com", "", undefined]) {
    assert.equal(isApprovedGoogleProfile("google", { ...profile, email }), false);
  }
  assert.equal(isApprovedGoogleProfile("google", { ...profile, email_verified: false }), false);
  assert.equal(isApprovedGoogleProfile("google", { ...profile, hd: undefined }), false);
  assert.equal(isApprovedGoogleProfile("google", { ...profile, hd: "other.com" }), false);
  assert.equal(isApprovedGoogleProfile("credentials", profile), false);
  assert.equal(isApprovedGoogleProfile("google", undefined), false);
});

test("domain matching is exact and case-insensitive", () => {
  assert.equal(isGumletEmail(" user@gumlet.com "), true);
  assert.equal(isGumletEmail("USER@GUMLET.COM"), true);
  assert.equal(isGumletEmail("user@gmail.com"), false);
  assert.equal(isGumletEmail("attacker@evil.com@gumlet.com"), false);
  assert.equal(isGumletEmail("user@gumlet.com.attacker.com"), false);
  assert.equal(isGumletEmail(undefined), false);
});
