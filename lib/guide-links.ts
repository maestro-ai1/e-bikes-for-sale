// Internal links from category pages to the buying guides that match them.
// Guides were linked only from the blog list, so each gets extra inbound links from the relevant category pages.
type GuideLink = { label: string; href: string };

const GUIDE = {
  emtb: { label: 'E mountain bike guide: hardtail vs dual suspension', href: '/blog/e-mountain-bike-guide-australia' },
  fat: { label: 'Fat tire ebike guide: sand, gravel and city riding', href: '/blog/fat-tire-ebike-guide-australia' },
  helmet: { label: 'E bike helmets: the standard and how to fit', href: '/blog/e-bike-helmets-guide-australia' },
  kids: { label: 'Electric bike kids guide: ages, speed limits and safety', href: '/blog/electric-bike-kids-guide' },
  childSeat: { label: 'Electric bike with child seat in Australia', href: '/blog/electric-bike-with-child-seat-australia' },
  size: { label: 'E-bike size guide: frame and height chart', href: '/blog/bike-size-guide-electric-bicycles' },
  motor: { label: 'E bike motor guide: hub vs mid-drive', href: '/blog/e-bike-motor-guide-hub-vs-mid-drive' },
} satisfies Record<string, GuideLink>;

const PATH_GUIDES: Record<string, GuideLink[]> = {
  '/ebikes': [GUIDE.size, GUIDE.motor],
  '/ebikes/electric-mountain-bike': [GUIDE.emtb, GUIDE.motor],
  '/ebikes/electric-mountain-bike/hardtail': [GUIDE.emtb],
  '/ebikes/electric-mountain-bike/dual-suspension': [GUIDE.emtb],
  '/ebikes/electric-mountain-bike/enduro': [GUIDE.emtb],
  '/ebikes/electric-mountain-bike/kids-mountain-bikes': [GUIDE.emtb, GUIDE.kids],
  '/ebikes/fat-tyre-electric-bicycle': [GUIDE.fat],
  '/ebikes/folding-e-bike': [GUIDE.size],
  '/ebikes/electric-commuter-bikes': [GUIDE.size, GUIDE.motor],
  '/ebikes/electric-cargo-bikes': [GUIDE.childSeat],
  '/ebikes/kids-electric-bikes': [GUIDE.kids, GUIDE.childSeat],
  '/electric-hybrid-bikes': [GUIDE.motor, GUIDE.size],
  '/e-bike-helmets': [GUIDE.helmet],
  '/kids-bike-helmets': [GUIDE.helmet, GUIDE.kids],
  '/e-bike-accessories': [GUIDE.childSeat],
};

export const guideLinksFor = (path: string): GuideLink[] => PATH_GUIDES[path] ?? [];
