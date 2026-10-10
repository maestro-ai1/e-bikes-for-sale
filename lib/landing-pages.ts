import type { CatalogNode } from "@/lib/catalog";

type LandingNode = Omit<CatalogNode, "keywords">;

const BIKE_CATS = ["emtb", "folding", "cruiser", "fat-tyre", "cargo", "road", "commuter"];
const isBike = (cat: string) => BIKE_CATS.includes(cat);

const cityNode = (
  id: string,
  slug: string,
  name: string,
  title: string,
  description: string,
  h1: string,
  intro: string[],
  bridge: { heading: string; body: string },
  guide: { heading: string; body: string },
  faqs: { q: string; a: string }[],
): LandingNode => ({
  id,
  kind: "landing",
  path: `/${slug}`,
  name,
  navLabel: name,
  title,
  description,
  h1,
  intro,
  bridge,
  guides: [guide],
  faqs,
  productLimit: 6,
  matches: (p) => isBike(p.category),
});

export const LANDING_NODES: LandingNode[] = [
  // ───────────── LOW COST / CHEAP E-BIKES ─────────────
  {
    id: "cheap",
    kind: "landing",
    path: "/cheap-electric-bikes",
    name: "Low Cost E-Bikes",
    navLabel: "Low Cost E-Bikes",
    title: "Low Cost E Bikes Australia | Cheap Electric Bikes Online",
    description:
      "Shop low cost e bikes in Australia under $2,000: folding, commuter, cruiser and youth e-bikes with 250W motors, EN15194 compliance and fast dispatch.",
    h1: "Low Cost E Bikes: Cheap Electric Bikes Under $2,000",
    intro: [
      "Low cost e bikes let you try electric riding without a four-figure stretch. This page collects the most affordable bikes in our range: a folding e-bike, a step-through commuter, a retro cruiser and a 24-inch youth model, all with 250W motors and pedal assist that cuts out at 25 km/h.",
      "Cheap does not have to mean poor quality. The things that matter most for the money are the battery, the brakes and the warranty, so we list battery capacity, range and weight on every bike.",
    ],
    bridge: {
      heading: "Low cost electric bike or cheap regular bike?",
      body:
        "A regular bike is cheaper to buy, but a low cost electric bike removes the hills, headwinds and sweat that stop many people riding. If you are comparing the electric bicycle price against a car trip or a train pass, the savings on short commutes can add up quickly. Be wary of the cheapest e cycle you can find: very low prices often mean small batteries, weak brakes and no local warranty.",
    },
    guides: [
      {
        heading: "What does an electric bicycle cost in Australia?",
        body:
          "CHOICE reports new e-bikes from under $800 to more than $12,000, with a typical well-equipped bike at $2,000 to $3,500. CHOICE also tested a $599 folding e-bike and found it average, with weak hill-climbing and a small battery. In our range the lowest price is $1,499, so the e bicycle price you see here already includes a quality battery and disc brakes.",
      },
      {
        heading: "How to find cheap electric bikes in Australia without regret",
        body:
          "Check the battery brand and size (Wh), whether the brakes are hydraulic or at least quality mechanical discs, and what warranty applies in Australia. Compare cheap electric bikes australia wide on those three points rather than on price alone, and factor in a battery replacement down the track.",
      },
    ],
    faqs: [
      { q: "What is the cheapest electric bike in your range?", a: "Prices start under $1,000 for entry-level folding and hybrid e-bikes and rise with battery size and build quality. Compare the models listed below." },
      { q: "Are low cost electric bikes any good?", a: "They can be, if the battery, brakes and warranty are solid. CHOICE found a $599 folding e-bike average, so be cautious below about $1,000." },
      { q: "How much is an e bicycle price on average in Australia?", a: "CHOICE puts a typical well-equipped e-bike at $2,000 to $3,500, with prices from under $800 to more than $12,000." },
      { q: "Can I find cheap electric bikes for sale with a warranty?", a: "Yes. Ask for warranty terms in writing before buying, and check what is covered, such as the battery and motor." },
      { q: "Is a price e bike comparison worth doing?", a: "Yes, but compare battery capacity, motor type, brakes and weight alongside the price, not the price alone." },
    ],
    productLimit: 6,
    matches: (p) => isBike(p.category) && p.price <= 2000,
  },

  // ───────────── CONVERSION KITS ─────────────
  {
    id: "conversion",
    kind: "landing",
    path: "/electric-bike-conversion-kits",
    name: "E-Bike Conversion Kits",
    navLabel: "E-Bike Conversion Kits",
    title: "Ebike Conversion Kit Australia | Convert Your Bike Guide",
    description:
      "Everything about an ebike conversion kit in Australia: hub vs mid-drive motors, battery size, legal limits and when buying a ready-built e-bike is smarter.",
    h1: "Ebike Conversion Kit: Convert a Bike to Electric",
    intro: [
      "An ebike conversion kit adds a motor, battery, controller and display to a bicycle you already own. It can be a cost-effective way to go electric, but the result must still meet the power, speed and age rules that apply to e-bikes in your state.",
      "This guide explains what is in a kit, how hub and mid-drive motors differ, and how to decide between converting and buying a factory-built e-bike. Ask us about kit availability, as stock changes.",
    ],
    bridge: {
      heading: "Convert bike to ebike or buy an electric bike?",
      body:
        "If you are weighing a converter e bike against a new bike, the answer depends on your frame, budget and skills. A conversion works best on a solid, well-fitting bike with good brakes. A factory-built e-bike is engineered as a whole, comes with a compliance label and a warranty, and is usually less work. Whether you call it an electric engine for bicycle use, an electric motor for bicycle conversion or a cycle electric motor, the legal limits are the same.",
    },
    guides: [
      {
        heading: "What is in a conversion e bike kit?",
        body:
          "A typical electric bike kit includes a motor (front hub, rear hub or mid-drive), a battery pack, a controller, a display or throttle, brake cut-off sensors and wiring. Hub motors replace a wheel and suit flat commuting. Mid-drive kits drive the chain and handle hills better, but need a compatible bottom bracket.",
      },
      {
        heading: "Are conversion kits legal in Australia?",
        body:
          "A converted bike still has to meet your state's rules, which differ and are changing in 2026. EN 15194 sets 250W continuous power with assistance cutting out at 25 km/h. In Victoria, converted e-bikes are not allowed on trains. Check your state authority before riding on public roads.",
      },
    ],
    faqs: [
      { q: "How much does an ebike conversion kit cost?", a: "Prices vary widely with motor type and battery size. Budget for the kit, a quality battery and possibly new brakes, and compare the total against a ready-built e-bike." },
      { q: "Can I convert any bike to electric?", a: "Not every bike suits a kit. You need a sturdy frame, good brakes and compatible dropouts or bottom bracket. A bike shop can check fit before you buy." },
      { q: "Is a hub motor or mid-drive kit better?", a: "Hub motors are simpler and suit flat commuting. Mid-drive kits climb hills better and use the bike's gears, but are costlier and more complex to fit." },
      { q: "Are electric bike conversion kits legal?", a: "They must still meet your state's rules for power, speed and rider age. Check your state transport authority, as the rules are changing in 2026." },
      { q: "Is it better to buy a ready-built e-bike?", a: "Often yes for most riders. A factory-built e-bike is tested as a system, carries a compliance label and has a warranty." },
    ],
    matches: () => false,
  },

  // ───────────── BATTERIES ─────────────
  {
    id: "batteries",
    kind: "landing",
    path: "/electric-bike-batteries",
    name: "E-Bike Batteries",
    navLabel: "E-Bike Batteries",
    title: "Ebike Battery Australia | 48V E-Bike Batteries & Chargers",
    description:
      "Learn how to choose an ebike battery in Australia: voltage, capacity, 48V packs, charger safety and replacement costs, plus how to ask about battery stock.",
    h1: "Ebike Battery: Choosing a Replacement or Upgrade",
    intro: [
      "An ebike battery is the most expensive part of an electric bike to replace, so it pays to choose carefully. The right pack depends on your motor, controller and connector, not just voltage and capacity.",
      "This guide covers how to read battery specs, what a 48V pack means, how long batteries last and how to charge safely. Contact us about battery availability for your bike.",
    ],
    bridge: {
      heading: "Battery for electric bicycle: how to read the specs",
      body:
        "Voltage (V) tells you the system the pack suits, and amp-hours (Ah) tell you the capacity. Multiply them to get watt-hours (Wh): a 48V 13Ah pack is about 624 Wh. A larger Wh figure means more range. Whether you search battery for electric bicycle or e cycle battery, the specification is what counts.",
    },
    guides: [
      {
        heading: "How long does an electric bike battery last?",
        body:
          "CHOICE says e-bike batteries are generally expected to last around 500 charges, with replacement costing roughly $350 to $1,000 depending on size, so budget for a replacement every few years. Storing and charging the pack sensibly extends its life.",
      },
      {
        heading: "Battery safety: chargers and third-party packs",
        body:
          "Use the manufacturer charger on a hard, non-flammable surface and stop using any battery that is swollen, hot or damaged. Product Safety Australia warns that low-quality, unbranded or incompatible lithium-ion batteries are the main fire risk, so avoid cheap third-party packs and a 48v ebike battery that does not match your controller.",
      },
    ],
    faqs: [
      { q: "How do I choose the right e-bike battery?", a: "Match the voltage and connector to your motor and controller, then choose capacity (Wh) for the range you need. Ask the bike maker or a workshop if you are unsure." },
      { q: "What does a 48v ebike battery mean?", a: "It is the nominal voltage of the pack. It must suit your motor and controller, so do not swap voltages without checking compatibility." },
      { q: "How much does an electric bike battery replacement cost?", a: "CHOICE reports replacements from roughly $350 to $1,000, depending on capacity and brand." },
      { q: "Can I use a different charger for my e bike battery?", a: "Use the charger supplied or recommended by the manufacturer. Mismatched chargers are a fire risk." },
      { q: "How should I store an ebike battery?", a: "Keep it in a cool, dry place away from direct sunlight, partially charged if stored for long periods, and never in a parked vehicle." },
    ],
    matches: () => false,
  },

  // ───────────── KIDS HELMETS ─────────────
  {
    id: "kids-helmets",
    kind: "landing",
    path: "/kids-bike-helmets",
    name: "Kids Bike Helmets",
    navLabel: "Kids Bike Helmets",
    title: "Kids Bike Helmets Australia | Helmet Youth Bike Guide",
    description:
      "Choose a certified kids bike helmet in Australia: AS/NZS 2063 safety, how to size a helmet youth bike riders can trust, fit checks and our youth helmet range.",
    h1: "Kids Bike Helmets: Helmet Youth Bike Riders Can Trust",
    intro: [
      "A helmet youth bike riders actually wear is one that fits properly and carries the Australian standard. In Australia, bicycle helmets must meet AS/NZS 2063, and a certified helmet is required when riding.",
      "This page explains how to size a childs cycling helmet, how to check the fit, and shows the youth helmet in our range.",
    ],
    bridge: {
      heading: "Childrens cycle helmet or full face childs helmet?",
      body:
        "For everyday riding, a standard certified childrens cycle helmet is the right choice. A full face childs helmet gives extra protection for downhill and mountain-bike riding, but check that it meets the relevant standard for your activity. Whichever you choose, it needs to fit snugly and sit level on the head.",
    },
    guides: [
      {
        heading: "How to size a childrens cycling helmet",
        body:
          "Measure around the head just above the eyebrows and ears and match it to the size chart. The helmet should sit level, with about two fingers of space above the eyebrows. The straps should form a V under each ear, and you should fit no more than one finger between the chin and the strap.",
      },
      {
        heading: "When to replace a kids helmet",
        body:
          "Replace a helmet after any significant impact, if the shell or straps are damaged, or when the child outgrows it. Children grow quickly, so recheck the fit regularly instead of buying a helmet to grow into.",
      },
    ],
    faqs: [
      { q: "Do kids need a helmet on a bike in Australia?", a: "Yes. Wearing an approved, properly fitted bicycle helmet is a legal requirement when cycling in Australia." },
      { q: "What standard should a kids bike helmet meet?", a: "Look for AS/NZS 2063 certification. Our youth helmet in this range is certified to that standard." },
      { q: "How tight should a childs cycling helmet be?", a: "Snug but comfortable: it should not rock side to side or slide back, and the chin strap should allow one finger underneath." },
      { q: "Can my child use a helmet for an electric scooter or e-bike?", a: "Check the helmet's rating and your state rules. Many riders use a certified bicycle helmet, but faster e-bikes may call for a helmet rated for higher speeds." },
      { q: "Are full face childrens helmets safer?", a: "They protect more of the face and are popular for mountain biking, but only if the helmet meets the right standard and fits well." },
    ],
    productLimit: 3,
    matches: (p) => p.category === "helmets",
  },

  // ───────────── TRIKES ─────────────
  {
    id: "trikes",
    kind: "landing",
    path: "/electric-trikes",
    name: "Electric Trikes",
    navLabel: "Electric Trikes",
    title: "3 Wheel Electric Bike Australia | Electric Trike Guide",
    description:
      "A guide to the 3 wheel electric bike in Australia: stability, load capacity, who e-trikes suit, rules for adults and cargo alternatives available now.",
    h1: "3 Wheel Electric Bike: Electric Trikes Explained",
    intro: [
      "A 3 wheel electric bike gives you the stability of a trike with a motor to do the hard work. It suits riders who want to stay upright without balancing, carry a load, or ride with confidence after time off the bike.",
      "This guide explains how e-trikes compare with two-wheel e-bikes, what to look for, and which of our bikes is the closest alternative today. Ask us if you want to know about e-trike availability.",
    ],
    bridge: {
      heading: "Trike bike, e tricycle or electric trike?",
      body:
        "Trike bike, e tricycle, electric trike and electric tricycle all describe the same thing: a three-wheeled bicycle with pedal assist. Searches for an adult tricycle or tricycle for adults usually mean a stable, comfortable ride with a rear basket or cargo area. CHOICE has compared electric trikes with electric bikes if you want an independent view. Buyers searching for a trike bike australia wide, an electric trike australia stockist or a 3 wheel electric bicycle are all after the same thing, and an electric tricycle australia riders choose should still meet EN 15194.",
    },
    guides: [
      {
        heading: "Who is an electric trike best for?",
        body:
          "Riders who want stability at low speed, a low step-through, or the ability to carry shopping and gear. Trikes are wider and heavier than bikes, so check storage space and the turning circle. They also lean less, so take corners slowly.",
      },
      {
        heading: "Cargo e-bike as a stable alternative",
        body:
          "If a trike is not available, a longtail electric cargo bike is a stable way to carry loads. A longtail carries two kids or heavy cargo and has a step-through frame with a mid-drive motor.",
      },
    ],
    faqs: [
      { q: "What is a 3 wheel electric bike?", a: "It is a three-wheeled bicycle (a trike) with a motor that assists your pedalling, offering stability without needing to balance." },
      { q: "Are electric trikes legal in Australia?", a: "Rules depend on your state and on whether the trike meets EN 15194 power and speed limits. Check your state authority." },
      { q: "Are electric tricycles good for adults?", a: "Yes. They suit adults who want a stable, comfortable ride or need to carry loads." },
      { q: "Do you sell an electric trike for adults?", a: "Contact us for current availability. The closest stable option in our range today is a longtail cargo e-bike." },
      { q: "Is a trike harder to ride than a bike?", a: "It is easier to start and stop, but wider and heavier, so it needs more space and careful cornering." },
    ],
    productLimit: 3,
    matches: (p) => p.category === "cargo",
  },

  // ───────────── CITIES ─────────────
  cityNode(
    "city-melbourne",
    "electric-bikes-melbourne",
    "Electric Bikes Melbourne",
    "Electric Bikes Melbourne | E-Bikes Delivered Australia-Wide",
    "Shop electric bikes Melbourne riders love: commuter, folding and cruiser e-bikes for trams and bay trails. 250W EN15194 models, delivered Australia-wide.",
    "Electric Bikes Melbourne: E-Bikes for the City and the Bay",
    [
      "Electric bikes Melbourne riders choose are usually built for mixed commutes: flat city streets, tram tracks, long trail rides along the river and bay, and the occasional climb out to the hills. A step-through commuter or a folding e-bike covers most of these.",
      "We deliver e-bikes Australia-wide, so you can order online from anywhere in Victoria. Every bike below is a 250W, 25 km/h pedal-assist model built to EN 15194.",
    ],
    {
      heading: "Ebike Melbourne: what to know before you buy",
      body:
        "Whether you search ebike melbourne or melbourne electric bicycles, the key points are the same. Check the battery size for your commute, choose hydraulic disc brakes for wet days, and think about storage. In Victoria only compliant e-bikes may be used on public roads and paths, and converted e-bikes are not allowed on trains.",
    },
    {
      heading: "Electric bikes Melbourne Victoria: rules and routes",
      body:
        "Electric bicycles Victoria riders use need to follow Victorian road rules for e-bikes, including helmet use. Check the state authority for the latest requirements before you ride, as rules across Australia are changing in 2026.",
    },
    [
      { q: "Where can I buy electric bikes in Melbourne?", a: "You can order online from us and have the bike delivered Australia-wide, including Melbourne. Contact us if you have questions about sizing or availability." },
      { q: "What is the best electric bike for Melbourne commuting?", a: "A step-through commuter or a folding e-bike suits tram-and-train commutes. Choose a battery that covers your daily round trip." },
      { q: "Are e-bikes allowed on Melbourne trains?", a: "Standard e-bikes may be, but converted e-bikes are not allowed on Victorian trains. Check the operator's rules before you travel." },
      { q: "Do I need a licence to ride an e-bike in Victoria?", a: "Compliant e-bikes are generally treated like bicycles in Victoria, but rules are changing, so check the state authority." },
      { q: "Can I get an e bikes Melbourne Australia delivery?", a: "Yes, we deliver across Australia. Delivery details are shown at checkout." },
    ],
  ),
  cityNode(
    "city-brisbane",
    "electric-bikes-brisbane",
    "Ebikes Brisbane",
    "Ebikes Brisbane | Electric Bikes for Brisbane Riders",
    "Shop ebikes Brisbane riders choose: commuter, folding, cargo and mountain e-bikes for river paths, hills and heat. 250W EN15194, delivered Australia-wide.",
    "Ebikes Brisbane: Electric Bikes for River Paths and Hills",
    [
      "Ebikes Brisbane riders choose are built for heat, humidity and hills. Pedal assist means you arrive at work less sweaty, and a good motor makes the climb to Mount Coot-tha or the western suburbs manageable.",
      "We deliver e-bikes across Australia, including Brisbane and the rest of Queensland. Every model below has a 250W motor with assistance cutting out at 25 km/h.",
    ],
    {
      heading: "Electric bikes Brisbane: choosing for the climate",
      body:
        "Whether you search electric bikes brisbane or an electric bicycle brisbane riders can use daily, look for sealed components, hydraulic disc brakes and a battery that handles heat. Store the battery in the shade and charge it indoors. Riders also search e bikes brisbane, electric bikes australia brisbane and cheap electric bikes brisbane; for the lowest prices see our low cost e-bikes.",
    },
    {
      heading: "Queensland e-bike licence rules",
      body:
        "Bicycle Network reports that Queensland now requires a driver licence or learner permit to ride e-bikes, with laws in force from 31 August 2026, and that children aged 12 to 15 can ride only under adult supervision. Check the Queensland authority before riding, as the rules are changing.",
    },
    [
      { q: "Where can I buy ebikes in Brisbane?", a: "Order online and we deliver across Australia, including Brisbane. Contact us with any questions about fit or availability." },
      { q: "Do I need a licence to ride an electric bike in Queensland?", a: "Bicycle Network reports that Queensland now requires a driver licence or learner permit for e-bikes. Check the current rules with the Queensland authority." },
      { q: "What is the best e-bike for Brisbane hills?", a: "A mid-drive e-bike or eMTB gives the best climbing. Choose a larger battery if your routes are hilly." },
      { q: "Are cheap electric bikes in Brisbane worth it?", a: "Be cautious: check battery quality, brakes and warranty. See our low cost e-bikes for the most affordable options in our range." },
      { q: "Can I ride an e bike on Brisbane river paths?", a: "Many shared paths allow bikes, but rules and speed limits apply. Check local signage and council rules." },
    ],
  ),
  cityNode(
    "city-perth",
    "electric-bikes-perth",
    "Electric Bicycle Perth WA",
    "Electric Bicycle Perth WA | E-Bikes for Perth Riders",
    "Shop an electric bicycle Perth WA riders trust: commuter, folding, fat tyre and cargo e-bikes for coastal paths. 250W EN15194, delivered Australia-wide.",
    "Electric Bicycle Perth WA: E-Bikes for Coast and River Paths",
    [
      "An electric bicycle Perth riders choose usually has to cover distance. Perth is flat, with long river and coastal paths and strong afternoon winds, so a bike with a bigger battery and a comfortable riding position makes sense.",
      "We deliver e-bikes across Australia, including Perth and the rest of Western Australia. All bikes here are 250W pedal-assist models with assistance cutting out at 25 km/h.",
    ],
    {
      heading: "Ebike Perth: range matters more than hills",
      body:
        "Whether you search ebike perth or electric bikes perth australia riders can compare, look at battery capacity first. Cargo and fat tyre models have the largest batteries in our range, and a fat tyre handles sandy tracks near the coast. Whichever electric bike perth buyers choose, Perth electric bicycles follow the same EN 15194 limits as bikes anywhere else in Australia.",
    },
    {
      heading: "Electric bikes Perth Western Australia: rules",
      body:
        "Bicycle Network reports that Western Australia has an age limit of 16 for riding an e-bike. Check the WA transport authority for the latest rules before you ride, as laws across Australia are changing in 2026.",
    },
    [
      { q: "Where can I buy an electric bicycle in Perth WA?", a: "Order online and we deliver across Australia, including Perth. Contact us for sizing or availability questions." },
      { q: "What is the best e-bike for long rides in Perth?", a: "Choose a larger battery and a comfortable frame. Our cargo and fat tyre e-bikes list the longest ranges, at up to 120 km and 110 km." },
      { q: "Is there an age limit for e-bikes in Western Australia?", a: "Bicycle Network reports an age limit of 16 in WA. Check the current rules with the WA authority." },
      { q: "Can I ride an e-bike on the Perth coastal paths?", a: "Shared paths generally allow bikes, but speed and access rules apply. Follow local signage." },
      { q: "Do electric bikes cope with Perth wind?", a: "Pedal assist helps with headwinds, and a larger battery gives you spare range when the wind picks up." },
    ],
  ),
  cityNode(
    "city-adelaide",
    "electric-bikes-adelaide",
    "Ebikes Adelaide",
    "Ebikes Adelaide | Electric Bikes for Adelaide Riders",
    "Shop ebikes Adelaide riders choose: commuter, folding, mountain and cargo e-bikes for flat city rides and the Hills. 250W EN15194, delivered Australia-wide.",
    "Ebikes Adelaide: Electric Bikes for the City and the Hills",
    [
      "Ebikes Adelaide riders choose often split into two types: easy city commuters for the flat grid, and mountain e-bikes for the Adelaide Hills. A mid-drive motor makes hill climbs a pleasure rather than a slog.",
      "We deliver e-bikes across Australia, including Adelaide and South Australia. Every bike below is a 250W pedal-assist model with a 25 km/h cut-out.",
    ],
    {
      heading: "Electric bikes Adelaide: city commuter or Hills trail bike?",
      body:
        "If you search electric bikes adelaide or an electric bicycle adelaide riders use for work, a step-through commuter is the easy answer. For Hills riding, look at our electric mountain bikes, which pair a mid-drive motor with suspension for control on rough ground. Shoppers searching electric bikes for sale adelaide or electric bikes adelaide south australia can order online for delivery.",
    },
    {
      heading: "Electric bikes Adelaide SA: check local rules",
      body:
        "E-bike rules in South Australia may differ from other states and are changing across Australia in 2026. Check the SA authority before riding, and always wear a certified helmet.",
    },
    [
      { q: "Where can I buy ebikes in Adelaide?", a: "Order online and we deliver across Australia, including Adelaide. Contact us if you need help choosing a size." },
      { q: "What is the best electric bike for the Adelaide Hills?", a: "A mid-drive electric mountain bike gives the best climbing. See our hardtail and dual suspension eMTBs." },
      { q: "Are electric bikes good for Adelaide commuting?", a: "Yes. The city is largely flat, so a step-through commuter with a rack is a practical choice." },
      { q: "Do I need a licence for an e-bike in South Australia?", a: "Compliant e-bikes are generally treated like bicycles, but rules are changing. Check the South Australian authority." },
      { q: "Do you have electric bikes for sale in Adelaide?", a: "We sell online and deliver across Australia, including Adelaide. Delivery details are shown at checkout." },
    ],
  ),
  cityNode(
    "city-sydney",
    "electric-bikes-sydney",
    "Electric Bike Sydney",
    "Electric Bike Sydney | E-Bikes for Sydney Riders",
    "Shop an electric bike Sydney riders can use daily: commuter, folding and mountain e-bikes for hills and trains. 250W EN15194, delivered Australia-wide.",
    "Electric Bike Sydney: E-Bikes for Hills, Harbour and Trains",
    [
      "An electric bike Sydney riders choose has to handle hills and mixed commutes. Pedal assist flattens the climbs, and a folding e-bike makes it easier to combine riding with trains and ferries.",
      "We deliver e-bikes across Australia, including Sydney and NSW. All bikes here are 250W models with pedal assist cutting out at 25 km/h.",
    ],
    {
      heading: "E bike Sydney: choose for hills and storage",
      body:
        "Whether you search e bike sydney or an electric bicycle sydney buyers compare, think about hills, storage and transport. Mid-drive motors climb best, and a folding e-bike suits small apartments and public transport. Shoppers searching electric bikes for sale sydney, an ebike shop sydney or electric cycles sydney can order online for delivery.",
    },
    {
      heading: "NSW e-bike rules",
      body:
        "Bicycle Network reports that NSW has reduced its maximum e-bike power to 250W and is reviewing a minimum riding age. Check Transport for NSW before you ride, because the rules are changing.",
    },
    [
      { q: "Where can I buy an electric bike in Sydney?", a: "Order online and we deliver across Australia, including Sydney. Contact us for help choosing a frame size." },
      { q: "What is the maximum e-bike power in NSW?", a: "Bicycle Network reports NSW has reduced the limit to 250W. All bikes in our range are 250W." },
      { q: "What is the best e-bike for Sydney hills?", a: "A mid-drive e-bike or eMTB climbs best. Check motor torque and battery size." },
      { q: "Can I take an e-bike on Sydney trains?", a: "Rules vary by operator. A folding e-bike is easiest to take on public transport." },
      { q: "Are there electric bikes for sale in Sydney under $2,000?", a: "Yes, see our low cost e-bikes. Delivery is Australia-wide." },
    ],
  ),
];
