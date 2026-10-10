/**
 * Brand logos (public/images/brands). Every file is a trimmed transparent WebP:
 * the dark version (#111827 artwork, Merida in its brand colours) is for white and light backgrounds,
 * the white version is for dark backgrounds. Merida has no white version because its mark is two-colour.
 */
export interface BrandLogo {
  name: string;
  src: string;
  srcWhite?: string;
  width: number;
  height: number;
  alt: string;
}

const L = (name: string, key: string, width: number, height: number, white = true): BrandLogo => ({
  name,
  src: `/images/brands/logo-${key}.webp`,
  srcWhite: white ? `/images/brands/logo-${key}-white.webp` : undefined,
  width,
  height,
  alt: `${name} logo`,
});

export const BRAND_LOGOS: Record<string, BrandLogo> = {
  cube: L('Cube', 'cube', 420, 119),
  merida: L('Merida', 'merida', 415, 160, false),
  pedal: L('Pedal', 'pedal', 420, 95),
  dirodi: L('DiroDi', 'dirodi', 161, 160),
  segway: L('Segway-Ninebot', 'segway', 263, 160),
};

/** Look up by catalog node id ("brand-cube") or plain key ("cube"). */
export const brandLogoFor = (idOrKey: string): BrandLogo | undefined => BRAND_LOGOS[idOrKey.replace(/^brand-/, '')];
