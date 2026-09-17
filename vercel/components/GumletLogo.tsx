const gumletLogoUrl =
  "https://next-website-images.gumlet.io/Gumlet_Full_Logo_c14150a0bd.png";

type GumletLogoProps = {
  compact?: boolean;
};

export function GumletLogo({ compact = false }: GumletLogoProps) {
  return (
    // Gumlet serves this asset through its own image CDN, so a direct img keeps it simple.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={gumletLogoUrl}
      alt="Gumlet"
      className={compact ? "h-7 w-auto" : "h-9 w-auto"}
      loading="eager"
    />
  );
}
