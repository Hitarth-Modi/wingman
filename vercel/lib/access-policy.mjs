export function isGumletEmail(email) {
  return typeof email === "string"
    && /^[^@\s]+@gumlet\.com$/.test(email.trim().toLowerCase());
}

export function isApprovedGoogleProfile(provider, profile) {
  return provider === "google"
    && profile?.email_verified === true
    && profile?.hd === "gumlet.com"
    && isGumletEmail(profile?.email);
}
