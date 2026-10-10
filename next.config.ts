import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [],
  },
  // Legacy gear URLs now live at the keyword-mapped paths (keyword-map.md)
  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ];
    return [
      { source: '/:path*', headers: security },
      // discovery for agents: where the API catalog and llms.txt live (RFC 9727 / llmstxt.org)
      { source: '/', headers: [{ key: 'Link', value: '</.well-known/api-catalog>; rel="api-catalog", </llms.txt>; rel="describedby"; type="text/plain"' }] },
    ];
  },
  async redirects() {
    return [
      { source: '/accessories', destination: '/e-bike-accessories', permanent: true },
      { source: '/parts', destination: '/e-bike-parts', permanent: true },
      { source: '/product/apex-commuter-urban-pro-250w', destination: '/ebikes/electric-commuter-bikes', permanent: true },
      { source: '/product/outback-beast-fat-tyre-cruiser', destination: '/ebikes/fat-tyre-electric-bicycle', permanent: true },
      { source: '/product/metrofold-ultra-compact-folding-ebike', destination: '/ebikes/folding-e-bike', permanent: true },
      { source: '/product/trailpeak-enduro-carbon-mid-drive-emtb', destination: '/ebikes/electric-mountain-bike', permanent: true },
      { source: '/product/hauler-cargo-max-longtail-family-carrier', destination: '/ebikes/electric-cargo-bikes', permanent: true },
      { source: '/product/glidecity-pro-australian-commuter-scooter', destination: '/scooters/adults-scooters', permanent: true },
      { source: '/product/aussieguard-youth-junior-bike-helmet', destination: '/kids-bike-helmets', permanent: true },
      { source: '/product/schwalbe-marathon-plus-ebike-tyres', destination: '/e-bike-parts', permanent: true },
      { source: '/product/shimano-deore-hydraulic-disc-brake-pads-180mm-rotor-kit', destination: '/e-bike-parts', permanent: true },
      { source: '/product/kmc-e11-turbo-ebike-reinforced-11-speed-chain', destination: '/e-bike-parts', permanent: true },
      { source: '/product/ergon-gp1-biokork-ergonomic-grips-gel-saddle-set', destination: '/e-bike-parts', permanent: true },
      { source: '/product/park-tool-ebike-precision-multi-tool-chain-wear-kit', destination: '/e-bike-parts', permanent: true },
      { source: '/product/summithardtail-apex-29-electric-mountain-bike', destination: '/ebikes/electric-mountain-bike/hardtail', permanent: true },
      { source: '/product/apex-flowtrail-pro-dual-suspension-emtb', destination: '/ebikes/electric-mountain-bike/dual-suspension', permanent: true },
      { source: '/product/trailyouth-24-junior-mountain-ebike', destination: '/ebikes/electric-mountain-bike/kids-mountain-bikes', permanent: true },
      { source: '/product/alpine-trial-suspension-pro-29-emtb', destination: '/ebikes/electric-mountain-bike/trial-suspension', permanent: true },
      { source: '/product/byron-bay-classic-electric-cruiser-250w', destination: '/ebikes/electric-cruiser-bikes', permanent: true },
      { source: '/product/aerovelocity-carbon-endurance-e-road-bike-250w', destination: '/ebikes/electric-road-bikes', permanent: true },
      { source: '/product/glidemini-safe-speed-kids-3-wheel-scooter', destination: '/scooters/kids-scooters', permanent: true },
      { source: '/product/glidex-pro-urban-adults-dual-brake-scooter', destination: '/scooters/adults-scooters', permanent: true },
      { source: '/product/glideshield-heavy-duty-scooter-lock-bag-kit', destination: '/scooters/scooter-accessories', permanent: true },
      { source: '/product/kryptonite-new-york-diamond-standard-ebike-lock', destination: '/e-bike-accessories', permanent: true },
    ];
  },
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
