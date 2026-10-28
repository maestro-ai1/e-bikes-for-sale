# Blog batch 3 queue (next session)

Updated 2026-10-28. Batch 2 (posts 21 to 40) is live in the code; this is what to write next.

## How to run the next session
1. Read `seo-strategy/preview-site/batch3-keywords.js` (12 verified clusters, one primary and 5 supporting each, all T/C, KD 29 or lower, volume 50 or more, unused anywhere in the site or batches 1 and 2).
2. Re-run `node cand-batch2.js 200` in `seo-strategy/preview-site` to see what is left (774 unused T/C candidates on 2026-10-28), and add more clusters to reach 20. A fresh Semrush export of the AU database widens the pool.
3. Copy `plan2.js`, `build-blog-posts-2.js`, `build-blog-images-2.js` and `blog-src-2` as batch 3 (n from 41), write the copy at about 1,500 words per post (first passes land near 1,200: write 170-word sections plus extras), then run the checks until "no problems".
4. Heroes: 1200x675 WebP, keyword filename, alt contains the primary, clean photo or product composite (no watermark or logo; see the image rule).
5. Add each new post to `lib/guide-links.ts` so category pages link to it, build, crawl with `verify-posts-2.js`, then commit and push (only when the owner says so).
6. Add the new URLs to `docs/gsc-indexing-queue.md` and request indexing after the push.

## The 12 verified clusters
| n | Primary | Vol | KD | Supporting keywords | Watch-out |
|---|---|---|---|---|---|
| 41 | e bike 2nd hand | 480 | 13 | 2nd hand e bikes; used e bikes; used ebikes; second hand ebike; electric bike second hand | overlaps batch-1 second-hand post and the /used-electric-bikes page: pick a different angle (new vs used cost) or skip |
| 42 | folding electric bicycle | 390 | 4 | electric folding e bike; e bikes folding; ebike that folds; folding e bikes; fold up electric bikes | same SERP as batch-1 folding post and post 26: only write if the angle is clearly different |
| 43 | fat tyre electric bikes | 480 | 9 | fat tyre e bike; fat tire e bikes; fat tyre ebikes; fat tire e bike; ebike fat tire | same SERP as batch-1 fat-tire post: angle needed (tyre width and use) |
| 44 | mountain ebike | 480 | 24 | ebike mountain bike; ebike mountain bikes; mtb ebike; e mountain bikes australia; pedal assist mountain bike | same SERP as the e-MTB posts: angle needed |
| 45 | kit conversion ebike | 2900 | 4 | e bike conversion kits; e bike conversion kits australia; ebike battery kit; electric bicycle conversion kit with battery; conversion kit bicycle | near-duplicate of the /electric-bike-conversion-kits sales page keyword: consider adding to that page instead |
| 46 | electric bicycle cost | 480 | 27 | ebikes cost; ebike cost; how much is an electric bike; ebike price in australia; price electric bike | same cluster as the price guide /blog/how-much-are-electric-bicycles: consider refreshing that post instead |
| 47 | best electric cargo bike australia | 110 | 3 | electric cargo bikes australia; cargo ebikes; e-cargo bike; cargo e bike australia; e bikes cargo | cargo cluster already has a sales page and batch-1 post: best-of angle only |
| 48 | affordable e-bike australia | 170 | 9 | best value ebike australia; best value electric bike australia; cheapest ebike australia; cheap electric bike australia; best budget e bike australia | overlaps the cheap-ebike post: value/best-of angle |
| 49 | electric city bike | 110 | 18 | urban electric bicycle; commuter ebike australia; e bikes for commuting; electric hybrid bicycles; hybrid electric bikes | commuter cluster overlap: urban/city angle |
| 50 | electric motor for ebike | 110 | 7 | electric bike motors; ebike motors; electric motors for bikes; e bicycle motor price; electric bikes with motors | overlaps motor guides (22, 34): spare-parts and price angle |
| 51 | battery for an electric bike | 170 | 6 | battery for a electric bike; ebike batteries; electric bike batteries australia; electric bicycle batteries australia; ebike batteries australia | overlaps battery guides: buying and voltage angle |
| 52 | used electric bicycle for sale | 320 | 16 | used electric bike for sale; ebike used for sale; 2nd hand electric bikes for sale; 2nd hand e bikes for sale; second hand ebikes for sale | used-for-sale cluster: check stock rule, only if we sell used bikes |

## Notes
- Rule used: transactional or commercial keywords not used by any sales page, product, tag or FAQ, KD 29 or lower, volume 50 or more, highest volume first, one keyword = one URL.
- Biggest unmapped terms (sales-page candidates, not blog posts): e bike (22,200, KD 29), electric bikes (5,400, KD 29), electric bikes australia (1,900, KD 28), ebikes australia (1,000, KD 29). Decide whether to map them to /ebikes or the homepage.
- Stock rule: posts must not promise items we do not list (no non-electric bikes, no infant helmets under the smallest size listed).
