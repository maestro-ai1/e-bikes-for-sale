import type { CatalogNode } from "@/lib/catalog";

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
          "Choose by the child's height and inseam, not by age. Look for a low standover height, light weight, reliable disc brakes and a gentle, progressive motor. A lower-capacity battery keeps the weight down. Our TrailYouth 24-inch weighs 16.8 kg.",
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
      "Kids mountain bikes with a small motor let young riders keep up on trails without exhausting themselves on the climbs. The TrailYouth is a 24-inch junior eMTB with a progressive-torque rear hub motor, a 378 Wh battery and youth safety geometry.",
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
      { q: "How heavy is the TrailYouth kids eMTB?", a: "It weighs 16.8 kg, lighter than our adult eMTBs, with a 378 Wh battery listed at up to 65 km per charge." },
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
    title: "Kids E Scooter Australia | Childrens Electric Scooters",
    description:
      "Shop a kids e scooter in Australia: a lean-to-steer 3-wheel childrens electric scooter with a 12 km/h speed governor, LED wheels and a rear foot brake.",
    h1: "Kids E Scooter: Childrens Electric Scooters",
    intro: [
      "A kids e scooter is a fun way for children to get around the neighbourhood, but the speed and the build matter. Our GlideMini is a lean-to-steer 3-wheel scooter with a 150W motor and a speed governor that limits it to 12 km/h.",
      "It has LED wheels, a rear foot brake, a 180 Wh battery, a listed range of up to 20 km and weighs 6.8 kg, light enough for a parent to carry.",
    ],
    bridge: {
      heading: "Childrens electric scooters, childrens e scooter and teen scooters",
      body:
        "Searches for childrens electric scooters, a childrens e scooter, a best childrens electric scooter or electric scooters for 10 year olds all lead to the same question: how fast and how safe. A speed-limited 3-wheel design suits younger children, while older kids and teens may prefer a larger scooter. Check your state's age limit for e-scooters before you buy.",
    },
    guides: [
      {
        heading: "What to look for in a kids electric scooter",
        body:
          "Look for a speed governor, a rear foot brake, a stable 3-wheel design, a low deck and a weight your child can handle. Always use a certified helmet, and supervise young riders away from roads.",
      },
    ],
    faqs: [
      { q: "What is the best childrens electric scooter?", a: "Choose a speed-limited model with a stable 3-wheel design and a rear brake. The GlideMini is governed to 12 km/h." },
      { q: "What age is a kids e scooter suitable for?", a: "It depends on the child's size and the scooter's rating, and state age rules for e-scooters vary. Check the manufacturer's guidance and your state authority." },
      { q: "How fast is the GlideMini?", a: "It is limited to 12 km/h by a speed governor, with a 150W motor." },
      { q: "Do kids need a helmet on an electric scooter?", a: "Yes. Use a certified helmet that fits well and supervise young riders." },
      { q: "Are electric scooters for 10 year olds legal on the road?", a: "E-scooter rules differ by state and are changing, and many restrict where scooters can be used. Check your state authority before riding on public paths or roads." },
    ],
    matches: (p) => p.category === "scooters" && p.subcategoryId === "scooters-kids",
  },

  // ───────────── SCOOTER ACCESSORIES ─────────────
  {
    id: "sc-accessories",
    kind: "sub",
    parent: "sc-electric",
    path: "/scooters/scooter-accessories",
    name: "Scooter Accessories",
    navLabel: "Scooter Accessories",
    title: "Electric Scooter Accessories Australia | Locks & Bags",
    description:
      "Shop electric scooter accessories in Australia: an anti-cut steel lock and waterproof handlebar bag kit, plus a guide to helmets, lights and scooter security.",
    h1: "Electric Scooter Accessories: Locks, Bags and Safety Gear",
    intro: [
      "The right electric scooter accessories keep your scooter secure and your ride comfortable. The most useful are a strong lock, a bag you can fit to the handlebar and a certified helmet.",
      "Our GlideShield kit combines a hardened anti-cut steel lock with a waterproof EVA hard-shell handlebar storage bag in one pack that weighs 1.4 kg.",
    ],
    bridge: {
      heading: "Scooter accessories and scooters and accessories bundles",
      body:
        "Whether you search scooter accessories or scooters and accessories as a bundle, start with security and safety before extras. Theft is the main risk for a scooter parked in public, so a quality lock matters more than a cosmetic upgrade.",
    },
    guides: [
      {
        heading: "Which accessories do you actually need?",
        body:
          "A certified helmet and a good lock are the essentials. Lights and a bell help you be seen and heard, and a handlebar bag keeps your phone and keys secure. Check that any accessory suits your scooter's handlebar and weight rating.",
      },
    ],
    faqs: [
      { q: "What electric scooter accessories do I need?", a: "A certified helmet, a strong lock and lights are the essentials, with a handlebar bag as a useful extra." },
      { q: "Is a scooter lock really necessary?", a: "Yes. Scooters are easy to carry off, and a hardened lock is the best deterrent when you park in public." },
      { q: "What is in the GlideShield kit?", a: "A hardened anti-cut steel lock and a waterproof EVA hard-shell handlebar bag, weighing 1.4 kg together." },
      { q: "Can I use any bag on a scooter handlebar?", a: "Check the handlebar fit and the weight rating. Heavy loads on the handlebar can affect steering." },
      { q: "Do you sell helmets for scooter riders?", a: "Yes, see our kids bike helmet guide and range. Always wear a certified helmet." },
    ],
    matches: (p) => p.category === "scooters" && p.subcategoryId === "scooters-accessories",
  },
];
