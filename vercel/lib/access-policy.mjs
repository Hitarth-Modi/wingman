export function parseAllowlist(text) {
  return new Set(
    text.split(/\r?\n/)
      .map((line) => line.trim().toLowerCase())
      .filter((line) => line && !line.startsWith("#") && line.endsWith("@gumlet.com")),
  );
}

export function isAllowedEmail(email, allowlist) {
  return typeof email === "string" && allowlist.has(email.trim().toLowerCase());
}

export function isApprovedGoogleProfile(provider, profile, allowlist) {
  return provider === "google"
    && profile?.email_verified === true
    && profile?.hd === "gumlet.com"
    && isAllowedEmail(profile?.email, allowlist);
}
