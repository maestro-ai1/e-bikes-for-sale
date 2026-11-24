import type { CatalogNode } from "@/lib/catalog";
import { isKidsPush, isScooterPart, isStunt } from "@/lib/scooter-kinds";

type KidsNode = Omit<CatalogNode, "keywords">;

export const KIDS_NODES: KidsNode[] = [
  // ───────────── KIDS ELECTRIC BIKES (category under /ebikes) ─────────────
  {
    id: "kids-ebikes",
    kind: "category",
    path: "/ebikes/kids-electric-bikes",
    name: "Kids Electric Bikes",
    navLabel: "Kids Electric Bikes",
    title: "Kids Electric Bike Australia | Childrens E-Bikes Guide",
    description:
      "Looking for a kids electric bike in Australia? Compare children electric bike options, age rules, helmets and our 24-inch youth e-bike with 250W pedal assist.",
    h1: "Kids Electric Bike: Children's E-Bikes for Australian Families",
    intro: [
      "A kids electric bike gives young riders a confidence boost on hills and longer rides while they build skills. Pedal assist only helps while the rider pedals, and it cuts out at 25 km/h, so it behaves like a bicycle, not a motorbike.",
      "Our youth model is a 24-inch mountain e-bike with a progressive-torque rear hub motor, a 378 Wh battery, a listed range of up to 65 km and a light 16.8 kg frame. Check the age rules for your state first, and always pair a kids e bike with a certified helmet.",
    ],
    bridge: {
      heading: "Children electric bike, childs e bike or kids ebike: same thing?",
      body:
        "Children electric bike, childs electric bicycle, electric childs bike and kids ebike all describe a bicycle with a small motor that assists pedalling. They are different from a childrens electric moped or kids electric motorbike, which are motorised vehicles with their own rules. If you are buying an electric bike for 10 year olds, look at frame size and weight first, because a bike that is too big or heavy is unsafe whatever the motor.",
    },
    guides: [
      {
        heading: "What are the age rules for kids e-bikes in Australia?",
        body:
          "Rules differ by state and are changing in 2026. Bicycle Network reports that Western Australia has a minimum age of 16, that Queensland allows 12 to 15 year olds to ride e-bikes only under adult supervision, and that NSW is reviewing a minimum riding age between 12 and 16. Check your state authority before you buy.",
      },
      {
        heading: "How to choose a kids electric bike",
        body:
          "Choose by the child's height and inseam, not by age. Look for a low standover height, light weight, reliable disc brakes and a gentle, progressive motor. A lower-capacity battery keeps the weight down.",
      },
    ],
    faqs: [
      { q: "Is a kids electric bike legal in Australia?", a: "A pedal-assist e-bike that meets EN 15194 (250W, 25 km/h) is treated like a bicycle, but age rules differ by state and are changing in 2026. Check your state authority." },
      { q: "What is the best electric bike for 10 year olds?", a: "Choose by height and weight, with a low standover, disc brakes and a gentle motor. Our 24-inch youth e-bike weighs 16.8 kg and suits taller kids in this range." },
      { q: "Is a childs electric bicycle safe?", a: "It can be, with a certified helmet, adult supervision and a bike that fits. Start at the lowest assist level and practise in a safe space." },
      { q: "What is the difference between a kids ebike and a childrens electric moped?", a: "A kids ebike assists pedalling and is limited to 25 km/h. A childrens electric moped is a motorised vehicle with its own rules and is generally not a bicycle, so check the law before buying." },
      { q: "Do kids need a helmet on an electric bike?", a: "Yes. Riders must wear an approved helmet, and a certified AS/NZS 2063 helmet is the minimum. See our kids bike helmet guide." },
    ],
    productLimit: 2,
    matches: (p) => p.category === "emtb" && /trailyouth|junior/.test(p.slug),
  },

  // ───────────── KIDS MOUNTAIN BIKES (eMTB subcategory) ─────────────
  {
    id: "emtb-kids",
    kind: "sub",
    parent: "emtb",
    path: "/ebikes/electric-mountain-bike/kids-mountain-bikes",
    name: "Kids and Youths 24\" eMTB's",
    navLabel: "Kids and Youths 24\" eMTB's",
    title: "Kids Mountain Bikes Australia | Youth 24-Inch Electric eMTB",
    description:
      "Shop kids mountain bikes with a motor: a 24-inch youth eMTB with progressive torque, a 378 Wh battery and youth-fit geometry. Kids mtb options.",
    h1: "Kids Mountain Bikes: Youth 24-Inch Electric eMTB",
    intro: [
      "Kids mountain bikes with a small motor let young riders keep up on trails without exhausting themselves on the climbs. A 24-inch junior eMTB has a progressive-torque motor, a smaller battery and youth safety geometry.",
      "It lists up to 65 km per charge and weighs 16.8 kg, which is light for an e-bike. It suits taller kids and teens who have outgrown a 20-inch bike, and it cuts assist at 25 km/h like every bike in our range.",
    ],
    bridge: {
      heading: "Kids mountain bikes, childrens mountain bikes or a kids electric mountain bike?",
      body:
        "Parents searching for a kids mountain bike, childrens mountain bikes or a kids mtb usually want a capable trail bike that fits. The electric version adds assist for hills and longer family rides. Our range does not include a kids 20 inch mountain bike, so this page covers the larger 24-inch size. For mountain bikes for kids on smaller wheels, a bike shop can help with sizing.",
    },
    guides: [
      {
        heading: "Is a 24-inch eMTB right for my child?",
        body:
          "Choose by height and standover rather than age. A 24-inch bike generally suits taller children and early teens, and the rider should be able to straddle the frame with both feet flat. Rules for young e-bike riders differ by state, so check yours.",
      },
    ],
    faqs: [
      { q: "What is the best kids mountain bike for a growing child?", a: "Pick the right frame size for height, with disc brakes and a light frame. A 24-inch bike suits taller kids moving up from 20 inches." },
      { q: "Can kids ride an electric mountain bike?", a: "Age rules differ by state and are changing in 2026. For example, Bicycle Network reports Queensland allows ages 12 to 15 only under adult supervision." },
      { q: "How heavy is a kids eMTB?", a: "Kids 24-inch eMTBs are lighter than adult eMTBs and use a smaller battery. Check the listed weight on each product page." },
      { q: "Do kids need a helmet for mountain biking?", a: "Yes. Use a certified helmet that fits well, and consider a full face option for rougher trails if it meets the right standard." },
      { q: "Is a kids mtb or an electric version better?", a: "An electric version helps on hills and longer rides, while a regular kids mtb is lighter and simpler. Choose by the child's riding and fitness." },
    ],
    matches: (p) => p.category === "emtb" && /trailyouth|junior/.test(p.slug),
  },

  // ───────────── KIDS SCOOTERS ─────────────
  {
    id: "sc-kids",
    kind: "sub",
    parent: "sc-electric",
    path: "/scooters/kids-scooters",
    name: "Kids Scooters",
    navLabel: "Kids Scooters",
    title: "Scooter Kids Australia | Push, Foldable & 3-Wheel Scooters",
    description:
      "Shop scooters for kids in Australia: 3-wheel and 2-wheel push scooters from Globber and Vital, from $119 to $229, with delivery Australia-wide.",
    h1: "Scooter Kids: Push, Foldable and 3-Wheel Scooters",
    intro: [
      "A kids scooter is a fun way for children to get around the neighbourhood, and the right one depends on age and confidence. Younger children usually start on a stable 3-wheel scooter, while older kids move to a 2-wheel scooter.",
      "Our kids range is push scooters: the rider kicks along and there is no motor or battery. They come from Globber and Vital, from $119 to $229, and several models fold for the car and have light-up wheels. Older kids who want to learn tricks can look at our stunt scooters.",
    ],
    bridge: {
      heading: "Scooters for kids, kids 2 wheel scooters and 3 wheel scooters",
      body:
        "Searches for scooters for kids, a 3 wheel scooter for kids, a kids 2 wheel scooter or the best kids scooter all come down to age, size and stability. A 3-wheel design suits younger children, while a 2-wheel scooter suits older kids. We list push scooters only and do not currently stock a motorised kids scooter.",
    },
    guides: [
      {
        heading: "What to look for in a kids scooter",
        body:
          "Look for a stable 3-wheel design for a first scooter, a deck and handlebar height your child can manage, working brakes and a weight they can lift. Foldable models are easier to store. Always use a certified helmet, and supervise young riders away from roads.",
      },
    ],
    faqs: [
      { q: "What is the best kids scooter for a young child?", a: "Choose a stable 3-wheel model with a low deck and a brake, and match it to your child's height and the age range on the manufacturer's listing." },
      { q: "Are these kids scooters electric?", a: "No. They are push scooters with no motor or battery. If you want an electric scooter, our adult range is Segway-Ninebot, and manufacturer and state rules set age limits for those." },
      { q: "What age is a kids scooter suitable for?", a: "It depends on the child's size and the scooter's rating. Check the age and weight guidance on each product page, and ask us if you are unsure." },
      { q: "Do kids need a helmet on a scooter?", a: "Yes. Use a certified helmet that fits well and supervise young riders." },
      { q: "What is the difference between a kids scooter and a stunt scooter?", a: "A kids scooter is built around stability and low weight, while a stunt scooter is built for tricks at the skate park. See our stunt scooters if your child wants to learn tricks." },
    ],
    matches: isKidsPush,
  },

  // ───────────── STUNT SCOOTERS ─────────────
  {
    id: "sc-stunt",
    kind: "sub",
    parent: "sc-electric",
    path: "/scooters/stunt-scooters",
    name: "Stunt Scooters",
    navLabel: "Stunt Scooters",
    title: "Stunt Trick Scooter Australia | Envy, Grit & Raven Scooters",
    description:
      "Shop a stunt trick scooter in Australia: complete stunt scooters from Envy, Grit and Raven, from $110 to $305, with delivery Australia-wide.",
    h1: "Stunt Trick Scooter: Complete Stunt Scooters from Envy, Grit and Raven",
    intro: [
      "A stunt trick scooter is built for the skate park and the street: a solid bar, a strong deck and small hard wheels made for tricks and landings. A complete stunt scooter comes with the deck, bars, fork, wheels and grips already fitted, so you do not have to pick parts one by one.",
      "Our range has more than 20 stunt scooters from Envy, Grit and Raven, from $110 to $305. A lower-priced complete scooter is a good first stunt scooter, and the higher-priced models suit riders who are already learning tricks.",
    ],
    bridge: {
      heading: "Stunt scooter, kids stunt scooter and stunt scooter for beginners",
      body:
        "Searches for a stunt scooter, a childrens stunt scooter, a pro stunt scooter or a stunt scooter for beginners all lead to the same choice: size, weight and build quality. Match the bar height to the rider, choose a complete scooter rather than loose parts if you are starting out, and add a certified helmet before the first session.",
    },
    guides: [
      {
        heading: "What to look for in a stunt scooter",
        body:
          "Check the bar height against the rider, the deck length and the wheel size, and look for a bar and fork that feel solid when you push and pull them. Lighter scooters are easier to spin and flip, while heavier ones feel steadier. Always wear a certified helmet, and replace worn wheels and grips early.",
      },
    ],
    faqs: [
      { q: "What is the best stunt scooter for a beginner?", a: "Choose a complete stunt scooter in your budget with a bar at the right height for the rider and a solid, rattle-free build. Our lower-priced Envy, Grit and Raven models are a good place to start, and you can ask us for help choosing." },
      { q: "What is a complete stunt scooter?", a: "A complete scooter comes with the deck, bars, fork, wheels and grips already fitted, so it is ready to ride without buying parts separately." },
      { q: "Are stunt scooters electric?", a: "No. They are push scooters with no motor or battery." },
      { q: "Do I need a helmet for stunt scooting?", a: "Yes. Wear a certified helmet that fits well, and consider pads while you learn new tricks." },
      { q: "Can I replace parts on a stunt scooter?", a: "Yes. Wheels, grips and clamps wear out and can be replaced. Check the size before you buy, and see our scooter parts range." },
    ],
    matches: isStunt,
  },

  // ───────────── SCOOTER ACCESSORIES ─────────────
  {
    id: "sc-accessories",
    kind: "sub",
    parent: "sc-electric",
    path: "/scooters/scooter-accessories",
    name: "Scooter Accessories",
    navLabel: "Scooter Accessories",
    title: "Scooter Parts Australia | Wheels, Grips, Clamps & Accessories",
    description:
      "Shop scooter parts in Australia: Envy wheels, grips and clamps, Globber trikes and skates, a cable lock and a brake rotor. Delivery Australia-wide.",
    h1: "Scooter Parts: Wheels, Grips, Clamps and Accessories",
    intro: [
      "Scooter parts and accessories keep a push or stunt scooter rolling and safe. Wheels, grips, clamps and hardware are the parts that wear out first, and a lock keeps a scooter secure when you leave it.",
      "This range covers Envy wheels, grips, clamps, a hardware pack and a stand, Globber trikes and skates for younger kids, a Globber cable lock and a brake disc rotor listed for Dragon, Kaabo and Mercane e-scooters. Prices run from $7 to $319. Looking for a complete scooter instead? See our stunt scooters and kids scooters.",
    ],
    bridge: {
      heading: "Scooter parts, parts for a scooter and scooter accessories",
      body:
        "Whether you search scooter parts, scooter parts Australia, parts for a scooter or scooters and accessories, start with what wears out or keeps the rider safe: wheels, grips and a certified helmet. Parts are not universal, so check wheel diameter and clamp size against your scooter before you buy.",
    },
    guides: [
      {
        heading: "Which parts and accessories do you actually need?",
        body:
          "Wheels and grips wear first, so replace them when they are worn or chipped. Check the wheel diameter (the Envy wheels listed here are 120 mm), the bearing fit and the clamp type against your scooter. A certified helmet and a lock are the essentials for riding and parking. Ask us if you are unsure what fits.",
      },
    ],
    faqs: [
      { q: "What scooter parts do you sell in Australia?", a: "Wheels, grips, clamps, a hardware pack and a stand from Envy, plus a brake disc rotor listed for some e-scooters." },
      { q: "How do I know which scooter wheels fit?", a: "Match the wheel diameter and width and check the bearing fit. The Envy wheels listed here are 120 mm, in a few widths." },
      { q: "Is a scooter lock really necessary?", a: "Yes. Scooters are easy to carry off, and a lock is the best deterrent when you park in public." },
      { q: "Do you sell stunt scooters?", a: "Yes, see our stunt scooter page for complete scooters from Envy, Grit and Raven." },
      { q: "Do you sell helmets for scooter riders?", a: "Yes, see our kids bike helmet guide and range. Always wear a certified helmet." },
    ],
    matches: isScooterPart,
  },
];
