// ─── PoolConnection Blog Articles ─────────────────────────────────────────────
// 12 full articles, April 2026 – March 2027
// Australian seasonal calendar: Summer Dec–Feb, Autumn Mar–May, Winter Jun–Aug, Spring Sep–Nov
//
// Content block types:
//   { type: "intro",    text }
//   { type: "h2",       text }
//   { type: "h3",       text }
//   { type: "p",        text }
//   { type: "checklist", items: [] }
//   { type: "steps",    items: [] or [{label, detail}] }
//   { type: "tip",      label, text }
//   { type: "warning",  label, text }
//   { type: "cta",      headline, body, action }
//   { type: "divider" }
// ─────────────────────────────────────────────────────────────────────────────

export const ARTICLES = [

  // ─── 1. APRIL 2026 — Autumn ───────────────────────────────────────────────
  {
    slug: "autumn-pool-reset-post-summer-checklist",
    title: "The Autumn Pool Reset: Your Post-Summer Water Care Checklist",
    publishDate: "2026-04-08",
    category: "Maintenance",
    season: "Autumn",
    readTime: "6 min read",
    heroEmoji: "🍂",
    excerpt:
      "Summer was relentless on your pool. Now that the heat has eased, it's time to reset your water chemistry, cut back on chemicals, and set your pool up for a smooth transition into cooler months.",
    content: [
      {
        type: "intro",
        text: "After three months of heavy use, extra chemical loads, and scorching temperatures, your pool has earned a reset. Autumn is actually one of the best times of year to get your water in great shape — cooler temperatures mean chemistry stabilises faster, algae growth slows, and your pool is easier to manage. Here's how to do it properly.",
      },
      {
        type: "h2",
        text: "Why Autumn is the Perfect Time to Reset",
      },
      {
        type: "p",
        text: "During summer, your pool fights constant battles: UV degrading chlorine faster, high bather loads introducing contaminants, and heat causing rapid chemical fluctuations. As temperatures drop into the 20s and below, everything stabilises. Chlorine lasts longer, algae grows slower, and your sanitiser works more efficiently.",
      },
      {
        type: "tip",
        label: "Pool Smart",
        text: "Many pool owners overdose chemicals in autumn out of habit from summer. You'll likely need 30–40% less sanitiser as water temperatures fall below 25°C. Adjust gradually and test weekly.",
      },
      {
        type: "h2",
        text: "Step 1: Test and Rebalance Your Water",
      },
      {
        type: "p",
        text: "Start with a full water test — either a home test kit, test strips, or a professional strip at your local pool shop. You're looking to bring everything into the ideal range before the cooler months set in.",
      },
      {
        type: "checklist",
        items: [
          "Free chlorine: 1.0–3.0 ppm (you may find it's elevated from summer dosing — let it naturally drop before adding more)",
          "pH: 7.2–7.6 (aim for the lower end in autumn as CO₂ levels in the water increase)",
          "Total alkalinity: 80–120 ppm (acts as a pH buffer — adjust this first before pH)",
          "Calcium hardness: 200–400 ppm (prevents water from becoming corrosive or scaling)",
          "Stabiliser (cyanuric acid): 30–50 ppm (you may not need to top up until spring)",
          "Salt (if saltwater): 3,000–4,000 ppm — check before reducing chlorinator output",
        ],
      },
      {
        type: "h2",
        text: "Step 2: Clean Out Summer's Residue",
      },
      {
        type: "p",
        text: "Heavy summer use leaves behind body oils, sunscreen, and other organic contaminants that bind to pool surfaces and cloud the water. A thorough clean now prevents staining and reduces the demand on your sanitiser going into winter.",
      },
      {
        type: "steps",
        items: [
          { label: "Backwash or clean your filter", detail: "If you have a sand filter, backwash until the water runs clear. Cartridge filters should be removed, hosed down thoroughly, and inspected for tears. DE filters need to be backwashed and recharged." },
          { label: "Brush all surfaces", detail: "Walls, steps, and the waterline tile or coping. Pay extra attention to corners and around fittings where algae loves to hide." },
          { label: "Vacuum to waste", detail: "If there's sediment or debris on the floor, vacuum directly to waste rather than through the filter to avoid overloading the media." },
          { label: "Shock dose (if needed)", detail: "If your water looks dull or has a combined chlorine reading above 0.2 ppm, add a shock treatment. Use a granular shock (calcium hypochlorite or potassium monopersulfate for salt pools) in the evening to maximise effectiveness." },
          { label: "Run the pump for 24 hours", detail: "Circulate everything you've added and let the filter work. Test again the next morning before swimming." },
        ],
      },
      {
        type: "h2",
        text: "Step 3: Reduce Your Chemical Routine",
      },
      {
        type: "p",
        text: "Summer habits don't suit autumn. Overchlorinating in cooler months wastes money, can irritate swimmers, and creates unnecessary chemical buildup. Gradually scale back and let your test results guide you.",
      },
      {
        type: "checklist",
        items: [
          "Reduce chlorinator output on saltwater pools by 20–30% once water temps drop below 25°C",
          "Space out liquid or granular chlorine additions — weekly rather than every few days",
          "You can reduce your algaecide dose frequency — monthly rather than fortnightly",
          "Continue checking pH weekly as autumn rain can cause pH swings",
        ],
      },
      {
        type: "h2",
        text: "Step 4: Prepare for Autumn Leaves and Debris",
      },
      {
        type: "p",
        text: "If you have deciduous trees nearby, April through May is when debris really starts. Leaves break down quickly in pool water, releasing tannins that stain surfaces and consume chlorine. Get ahead of it now.",
      },
      {
        type: "checklist",
        items: [
          "Empty your skimmer basket daily during peak leaf fall",
          "Consider a leaf catcher or oversized skimmer net for the pump basket",
          "Skim the surface morning and evening if you have heavy tree cover",
          "Keep a pool cover handy — even a basic leaf net saves hours of cleaning",
          "Check and clear pump pre-filter baskets regularly to avoid reduced flow",
        ],
      },
      {
        type: "warning",
        label: "Watch for Tannin Staining",
        text: "Leaves left in the pool for even a day can leach tannins into the water, causing brown or yellow staining on surfaces. If you notice discolouration, treat with a stain remover and follow up with a metal sequestrant to prevent it binding permanently.",
      },
      {
        type: "h2",
        text: "Step 5: Check Your Equipment Before Demand Drops",
      },
      {
        type: "p",
        text: "Autumn is the ideal time to service equipment — before the winter months when pool shops are quieter and wait times for parts are shorter. Check everything while there's no urgency.",
      },
      {
        type: "checklist",
        items: [
          "Inspect O-rings and seals on the pump lid and filter — replace if cracked or brittle",
          "Check the pump impeller for debris that may have passed through the basket",
          "Test your pool heater if you have one — make sure it lights and reaches temperature before you actually need it",
          "Inspect saltwater chlorinator cell for scale buildup — clean with diluted acid if needed",
          "Look for any cracks, lifting tiles, or deteriorating grout around the pool shell — autumn is the time to address these before winter rain",
        ],
      },
      {
        type: "cta",
        headline: "Track your water balance through every season",
        body: "PoolConnection logs your test results, reminds you when chemistry drifts, and calculates exact dose amounts for your pool's volume.",
        action: "Start free — 7 days",
      },
    ],
  },

  // ─── 2. MAY 2026 — Late Autumn ────────────────────────────────────────────
  {
    slug: "preparing-pool-for-winter-5-step-checklist",
    title: "Getting Your Pool Ready for Winter: The 5-Step Shutdown Checklist",
    publishDate: "2026-05-06",
    category: "Seasonal",
    season: "Autumn",
    readTime: "5 min read",
    heroEmoji: "❄️",
    excerpt:
      "Most Australian pools don't fully shut down in winter — but a proper pre-winter prep can save you hundreds in chemical costs and prevent headaches when summer comes back around.",
    content: [
      {
        type: "intro",
        text: "Unlike colder climates that fully winterise pools, most Australian pools stay running year-round — but winter is still the time when things go wrong if you take your eye off the ball. Water sits cooler, evaporation slows, and bather load drops. Done right, a winter prep takes one afternoon and saves you a full-scale chemical recovery in September.",
      },
      {
        type: "h2",
        text: "Why Winter Prep Matters in Australia",
      },
      {
        type: "p",
        text: "Even in warmer northern states, winter brings less UV exposure, longer nights, and more rain — all of which affect your pool's chemistry. In southern states like Victoria, SA, and WA, pools can sit at 15°C or below, which dramatically changes how chemicals behave. Algae doesn't stop growing in cool water — it just grows more slowly. One neglected fortnight in July can turn clear water green by August.",
      },
      {
        type: "tip",
        label: "Regional Note",
        text: "If you're in QLD or NT, 'winter' still means 20°C+ water temperatures. Your pool needs less adjustment but doesn't get the same break as pools in southern states. Continue your regular testing schedule year-round.",
      },
      {
        type: "h2",
        text: "Step 1: Shock the Pool Before the Season Turns",
      },
      {
        type: "p",
        text: "Before you reduce your maintenance routine, give the pool a good shock dose to kill off any lingering organic matter from summer. This sets a clean baseline.",
      },
      {
        type: "steps",
        items: [
          { label: "Choose your shock product", detail: "Granular calcium hypochlorite (70%+ chlorine) is most effective. For saltwater pools, use a non-chlorine shock (potassium monopersulfate) to avoid salt system conflicts." },
          { label: "Dose in the evening", detail: "UV destroys chlorine rapidly, so adding at dusk gives the product overnight to circulate without degrading." },
          { label: "Run the pump overnight", detail: "At least 8 hours to ensure thorough distribution through all parts of the pool." },
          { label: "Test the next morning", detail: "Chlorine should be back within the 1–3 ppm range before you reduce your dosing schedule." },
        ],
      },
      {
        type: "h2",
        text: "Step 2: Balance Your Water Chemistry for the Season",
      },
      {
        type: "p",
        text: "Cooler water holds chemicals differently. Get these numbers right before winter and you'll have far less adjustment to do through the cold months.",
      },
      {
        type: "checklist",
        items: [
          "pH: 7.4–7.6 (slightly higher than summer — cooler water tends to be more acidic)",
          "Total alkalinity: 100–120 ppm (higher end for winter stability)",
          "Calcium hardness: 250–350 ppm (prevents plaster erosion in cool, low-activity water)",
          "Stabiliser: 40–60 ppm (UV is weaker in winter, so you need less stabiliser — don't overdose)",
          "Add a winter algaecide dose — a quality polyquat algaecide lasts 2–3 months",
        ],
      },
      {
        type: "h2",
        text: "Step 3: Reduce Filtration Run Times (But Not Too Much)",
      },
      {
        type: "p",
        text: "A common winter mistake is cutting pump run times too aggressively. In summer you might run 8–10 hours per day; in winter 4–6 hours is usually sufficient — but dropping below 4 hours risks poor circulation and algae forming in dead zones.",
      },
      {
        type: "tip",
        label: "Save on Power Bills",
        text: "Schedule your pump to run during off-peak electricity hours overnight. Most Australian energy plans have lower rates between 10pm–6am. Combined with winter's reduced run time, you can cut pool power costs by 40% or more.",
      },
      {
        type: "h2",
        text: "Step 4: Cover the Pool",
      },
      {
        type: "p",
        text: "A pool cover is the single most effective thing you can do for winter. It reduces evaporation (which can be surprisingly high even in winter), keeps leaves and debris out, and helps retain the small amount of heat your pool does get.",
      },
      {
        type: "checklist",
        items: [
          "Solar covers (bubble wrap style) retain heat and reduce evaporation — ideal for winter",
          "Leaf net covers are a good secondary layer if you have trees nearby",
          "Solid safety covers provide full protection but require a pump-off to remove accumulated rainwater",
          "Rinse and dry your cover before storing to prevent mildew and extend its life",
        ],
      },
      {
        type: "h2",
        text: "Step 5: Set Your Winter Testing Schedule",
      },
      {
        type: "p",
        text: "Once the pool is balanced and covered, you don't need daily attention — but you can't ignore it entirely. A simple fortnightly check is all it takes.",
      },
      {
        type: "checklist",
        items: [
          "Test water every 1–2 weeks (not daily as in summer)",
          "Check for algae growth around skimmer and return fittings monthly",
          "Inspect the cover after heavy rain or wind events",
          "Top up water level after rainfall — heavy rain can dilute chemicals significantly",
          "Check saltwater chlorinator output monthly — cool water reduces salt cell efficiency",
        ],
      },
      {
        type: "warning",
        label: "Don't Switch Off Completely",
        text: "Turning the pump off for weeks at a time in winter is one of the most expensive mistakes pool owners make. Stagnant water breeds algae and bacteria rapidly. Even a 4-hour daily run keeps things moving.",
      },
      {
        type: "cta",
        headline: "Never lose track of your winter schedule",
        body: "PoolConnection sends you fortnightly reminders, tracks your last test date, and alerts you when chemistry drifts — so you can relax over winter without the nasty spring surprise.",
        action: "Set up your pool for free",
      },
    ],
  },

  // ─── 3. JUNE 2026 — Winter ────────────────────────────────────────────────
  {
    slug: "winter-pool-care-protect-without-overdoing-it",
    title: "Winter Pool Care: How to Protect Your Pool Without Overdoing It",
    publishDate: "2026-06-03",
    category: "Maintenance",
    season: "Winter",
    readTime: "5 min read",
    heroEmoji: "🌧️",
    excerpt:
      "Winter doesn't mean zero work — but it does mean far less. Here's what to actually keep an eye on and what you can comfortably let slide until the warmer months return.",
    content: [
      {
        type: "intro",
        text: "The biggest winter pool mistake isn't neglect — it's over-maintenance. Pool owners who treat their winter pool the same as their summer pool end up spending more time and money than necessary, and sometimes create new problems in the process. Here's the lean, smart approach to getting through winter with your pool in great condition.",
      },
      {
        type: "h2",
        text: "What Actually Changes in Winter",
      },
      {
        type: "p",
        text: "Understanding why winter is different helps you make smarter decisions about what to adjust.",
      },
      {
        type: "checklist",
        items: [
          "Water temperature drops — chlorine is more stable and lasts longer in cool water",
          "UV index is lower — stabiliser (cyanuric acid) matters less, so don't over-add",
          "Algae growth slows significantly below 15°C but doesn't stop completely",
          "Bather load is zero or minimal — far fewer contaminants entering the water",
          "Rain events can significantly dilute your chemistry — the main winter wildcard",
          "Evaporation is slower — water level changes less, so fewer top-ups needed",
        ],
      },
      {
        type: "h2",
        text: "What You Still Need to Do Regularly",
      },
      {
        type: "h3",
        text: "Test Every 1–2 Weeks",
      },
      {
        type: "p",
        text: "This is the non-negotiable. Even in the quietest winter conditions, pH drift can occur — especially after rain. An out-of-range pH affects everything from chlorine effectiveness to equipment corrosion.",
      },
      {
        type: "h3",
        text: "Maintain Minimum Pump Run Time",
      },
      {
        type: "p",
        text: "4–6 hours per day is the winter sweet spot for most Australian pools. Anything less and you risk dead zones where algae and bacteria can establish. Use a timer to automate this — it's not something you should have to think about daily.",
      },
      {
        type: "h3",
        text: "Clear Debris After Rain and Wind",
      },
      {
        type: "p",
        text: "Winter storms bring leaves, dust, and organic matter into the pool faster than it can break down. A quick skim after each significant weather event prevents the chlorine demand spike that comes with decomposing organic material.",
      },
      {
        type: "tip",
        label: "After Heavy Rain",
        text: "Heavy rainfall can drop your pH and dilute your sanitiser significantly. Always test within 24 hours of a major rain event and adjust accordingly. If more than 50mm fell, treat it like a partial water change and rebalance from scratch.",
      },
      {
        type: "h2",
        text: "What You Can Safely Reduce",
      },
      {
        type: "checklist",
        items: [
          "Chlorine dosing — reduce by 30–50% compared to summer peaks",
          "Algaecide — a single monthly dose of a quality polyquat algaecide is sufficient",
          "Pump run time — 4–6 hours instead of 8–10",
          "Surface brushing — weekly is enough (was daily in peak summer)",
          "Filter backwashing — monthly rather than fortnightly unless flow drops",
        ],
      },
      {
        type: "h2",
        text: "The Rain Problem: Managing Winter Water Chemistry",
      },
      {
        type: "p",
        text: "In winter rainfall regions (Perth, Melbourne, Adelaide, parts of NSW and QLD), rain is the biggest chemistry disruptor. Each downpour dilutes your carefully balanced water with fresh, low-pH rainwater.",
      },
      {
        type: "steps",
        items: [
          { label: "After any rain over 25mm", detail: "Test your pH and chlorine. Rain is slightly acidic and will push pH down." },
          { label: "After 50mm or more", detail: "Full retest of all parameters. Alkalinity and sanitiser will likely need adjustment." },
          { label: "Extended wet weather", detail: "If you've had several days of rain, check the pool water level. Overfull pools can't skim properly and may need water pumped out." },
          { label: "Watch for turbid water", detail: "Muddy or grey water after heavy rain indicates high suspended particulates. Clarifier (pool flocculant) can speed up clearing." },
        ],
      },
      {
        type: "h2",
        text: "Equipment: What to Watch in Winter",
      },
      {
        type: "p",
        text: "Cold water is actually easier on most pool equipment — but there are a few winter-specific issues to watch for.",
      },
      {
        type: "checklist",
        items: [
          "Heat pump efficiency drops significantly below 10°C — if you're running a heat pump in winter, expect higher power bills and potentially longer run times",
          "Saltwater chlorinator cell efficiency drops in cold water — you may need to increase the output percentage even though you're producing the same chlorine demand",
          "Check for condensation or water ingress around electrical components — winter moisture can cause corrosion",
          "If you're in a frost-prone area (high altitude NSW/VIC), check pipe connections after any freeze-thaw cycles",
        ],
      },
      {
        type: "cta",
        headline: "Take the guesswork out of winter maintenance",
        body: "PoolConnection tracks your testing history, adjusts dose recommendations for seasonal conditions, and reminds you when it's time to check your water.",
        action: "Try it free for 7 days",
      },
    ],
  },

  // ─── 4. JULY 2026 — Winter ────────────────────────────────────────────────
  {
    slug: "saving-money-pool-chemicals-winter",
    title: "Saving Money on Pool Chemicals Over Winter: What You Actually Need",
    publishDate: "2026-07-01",
    category: "Water Care",
    season: "Winter",
    readTime: "5 min read",
    heroEmoji: "💰",
    excerpt:
      "Pool chemicals are one of the biggest recurring costs for Australian pool owners. Winter is when most people overspend — here's how to cut your chemical bill without cutting corners on water quality.",
    content: [
      {
        type: "intro",
        text: "Walk into any pool shop in July with a water sample and you'll leave with a bag full of products. Some you genuinely need. Others are optional upgrades, seasonal upsells, or things that would have been more useful in November. This guide helps you understand exactly what your pool needs in winter — and what you can skip.",
      },
      {
        type: "h2",
        text: "The Core Winter Chemical Basket",
      },
      {
        type: "p",
        text: "In winter, your essential chemical list is shorter than you think. Here's what actually matters:",
      },
      {
        type: "h3",
        text: "1. Sanitiser (Chlorine or Salt)",
      },
      {
        type: "p",
        text: "Still non-negotiable, but your demand drops significantly. In cold water, chlorine is more stable and degrades more slowly. A pool that needed daily chlorine additions in January might only need one dose per week in July.",
      },
      {
        type: "tip",
        label: "Saltwater pool owners",
        text: "Turn your chlorinator output down to 30–40% of your summer setting. Cold water (below 20°C) reduces cell efficiency but also reduces your demand — these two effects roughly cancel out at lower output settings.",
      },
      {
        type: "h3",
        text: "2. pH Adjusters",
      },
      {
        type: "p",
        text: "pH drift still happens in winter, primarily driven by rain and organic debris. Keep pH Up (sodium carbonate) and pH Down (sodium bisulphate or dry acid) on hand. You don't need large quantities — a 1kg pack of each is usually enough for the whole season.",
      },
      {
        type: "h3",
        text: "3. Alkalinity Buffer",
      },
      {
        type: "p",
        text: "If your total alkalinity is in range at the start of winter (80–120 ppm), one or two adjustments through the season is all you'll need. A 2kg bag of sodium bicarbonate (bicarb) covers most pool owners for the whole winter.",
      },
      {
        type: "h3",
        text: "4. Algaecide",
      },
      {
        type: "p",
        text: "This is genuinely useful in winter because it provides ongoing protection during periods when you might miss a test or have a heavy rain event dilute your chlorine. A quality polyquat 60 algaecide, dosed once a month, is excellent winter insurance.",
      },
      {
        type: "h2",
        text: "What You Probably Don't Need Right Now",
      },
      {
        type: "checklist",
        items: [
          "Stabiliser (cyanuric acid) top-up — UV is low in winter, so stabiliser isn't being depleted quickly. Test before buying.",
          "Enzyme treatments — great for summer organic loads, but minimal benefit in a low-usage winter pool",
          "Phosphate remover — phosphates only become a problem when combined with high temps and algae growth. Monitor in spring instead.",
          "Clarifier — only needed if your water is visually cloudy. Not a routine winter addition.",
          "Scale inhibitor — needed in areas with very hard water, but not a monthly necessity for most pools",
        ],
      },
      {
        type: "h2",
        text: "Buying Smart: Tips to Reduce Your Chemical Spend",
      },
      {
        type: "steps",
        items: [
          { label: "Buy in bulk during end-of-season sales", detail: "Pool shops often discount chemicals in April–May. Chlorine granules, bicarb, and dry acid have long shelf lives when stored correctly (cool, dry, sealed)." },
          { label: "Test before you treat", detail: "Never add chemicals based on guesswork. A $15 test kit pays for itself in one season by preventing over-dosing." },
          { label: "Store chemicals properly", detail: "Chemicals stored in hot, humid conditions (like a garden shed in winter rain) degrade faster. Keep in a cool, dry, ventilated space away from direct sunlight." },
          { label: "Learn to dose by volume", detail: "Dosing by 'capful' or 'a handful' is imprecise and expensive. Know your pool's volume in litres and use the manufacturer's dose rate for accurate additions." },
          { label: "Get a free water test at your pool shop monthly", detail: "Most pool shops offer free testing. Use it to cross-check your home tests and get professional advice — without being pressured to buy everything on the shelf." },
        ],
      },
      {
        type: "h2",
        text: "Approximate Winter Chemical Budget",
      },
      {
        type: "p",
        text: "For a typical 50,000-litre backyard pool in a southern Australian climate, a realistic winter chemical budget looks like this:",
      },
      {
        type: "checklist",
        items: [
          "Chlorine granules or tablets: $30–50 for the season (vs. $100–150 in summer)",
          "pH adjusters (up and down): $15–25",
          "Alkalinity buffer (bicarb): $10–15",
          "Algaecide (polyquat): $20–35 for the season",
          "Total estimate: $75–125 for winter vs. $250–400 in summer",
        ],
      },
      {
        type: "warning",
        label: "Don't Skip Testing to Save Money",
        text: "Recovering from a green pool in August costs far more in chemicals than consistent fortnightly testing through winter. A single algae treatment event can use as many chemicals as an entire winter of regular maintenance.",
      },
      {
        type: "cta",
        headline: "Know exactly what your pool needs — and nothing extra",
        body: "PoolConnection calculates precise chemical doses based on your pool's actual water readings and volume. Stop guessing, stop overspending.",
        action: "Start your free trial",
      },
    ],
  },

  // ─── 5. AUGUST 2026 — Late Winter / Dust Season ──────────────────────────
  {
    slug: "dust-storm-pool-recovery-guide",
    title: "After the Dust Storm: How to Recover Your Pool Fast",
    publishDate: "2026-08-05",
    category: "Weather Events",
    season: "Winter",
    readTime: "5 min read",
    heroEmoji: "🌫️",
    excerpt:
      "Dust storms hit parts of Australia hard — particularly NSW, QLD, SA, and WA inland regions. A single event can dump kilograms of red dust, clay particles, and mineral-laden sediment into your pool. Here's how to clear it quickly.",
    content: [
      {
        type: "intro",
        text: "If you've woken up to find your pool the colour of red cordial or a murky brown, a dust storm has hit. The good news is that dust events are recoverable — usually within 48–72 hours with the right approach. The key is acting quickly, before the particles settle permanently into your surface or stain the waterline.",
      },
      {
        type: "warning",
        label: "Don't Swim First",
        text: "Post-dust-storm water can have very high levels of suspended fine particles, altered pH, and sometimes mineral content that irritates eyes and skin. Get the chemistry right before anyone gets in.",
      },
      {
        type: "h2",
        text: "What a Dust Storm Does to Your Pool",
      },
      {
        type: "p",
        text: "Australian dust storms carry a complex mix of fine clay particles, iron oxide (the red-brown colour), organic matter, and minerals. When this enters your pool it:",
      },
      {
        type: "checklist",
        items: [
          "Drops pH rapidly — dust is often alkaline in some regions, acidic in others, but the organic content consistently drives pH shifts",
          "Creates massive chlorine demand — organic material in the dust consumes sanitiser rapidly",
          "Turns the water turbid (cloudy) due to millions of tiny suspended particles",
          "Deposits iron and other metals that can stain pool surfaces if left untreated",
          "Clogs filters quickly — filter pressure will spike much faster than normal",
        ],
      },
      {
        type: "h2",
        text: "Recovery Steps: Do These in Order",
      },
      {
        type: "steps",
        items: [
          { label: "Run the pump immediately — don't stop", detail: "Keep circulation going continuously until the water is clear. Stopping the pump lets particles settle and stain. Run 24 hours a day if needed." },
          { label: "Test your water", detail: "Check pH, chlorine, and alkalinity. Dust typically crashes pH — adjust alkalinity first, then pH if needed." },
          { label: "Add a clarifier or flocculant", detail: "A pool clarifier (polyelectrolyte) helps tiny particles clump together so your filter can capture them. Add as per the label for your pool volume. For severe cases, a flocculant (alum) drops particles to the floor so you can vacuum to waste." },
          { label: "Shock dose your chlorine", detail: "Dust creates enormous chlorine demand. Add 2–3x your normal shock dose — in a severe event, more. Keep adding until the chlorine level holds above 2 ppm for a full hour." },
          { label: "Backwash or clean your filter frequently", detail: "Check filter pressure every 4–6 hours. With fine dust loading, pressure builds fast. Sand filters may need backwashing 3–4 times in the first 24 hours. Cartridge filters should be removed, hosed, and replaced." },
          { label: "Vacuum to waste (if using flocculant)", detail: "If you added alum flocculant, wait 24 hours for particles to settle to the floor, then vacuum very slowly directly to waste — not through the filter. Disturbing the settled layer will send everything back into suspension." },
          { label: "Add a sequestrant for iron", detail: "Red dust is rich in iron. A sequestrant (metal chelator) prevents dissolved iron from staining surfaces as the water clears. Add this within the first 12 hours." },
        ],
      },
      {
        type: "h2",
        text: "Dealing with Waterline Staining",
      },
      {
        type: "p",
        text: "Fine dust particles cling to the waterline and can leave a red-brown tide mark even after the water clears. Treat this quickly before it sets.",
      },
      {
        type: "checklist",
        items: [
          "Use a tile and waterline cleaner specifically designed for pool surfaces — not household cleaners",
          "A paste of bicarb soda and a damp cloth removes light staining without scratching tiles",
          "For stubborn staining on plaster or pebblecrete, a diluted acid wash may be needed — consult your pool shop before attempting",
          "Rinse any cleaning products off the waterline before they enter the pool water",
        ],
      },
      {
        type: "h2",
        text: "Timeline: What to Expect",
      },
      {
        type: "checklist",
        items: [
          "0–12 hours: Begin treatment, add clarifier or flocculant, shock, run filter continuously",
          "12–24 hours: Water should start to shift from opaque to hazy. Filter will be working hard — backwash as needed.",
          "24–48 hours: If flocculant was used, vacuum to waste. Water should be significantly clearer.",
          "48–72 hours: Most pools fully clear within three days. Final pH and chlorine check and adjust.",
          "After clearing: Retest all parameters, check for iron staining, add a preventive dose of sequestrant",
        ],
      },
      {
        type: "tip",
        label: "Future Prevention",
        text: "If you live in a dust-prone area (central NSW, western QLD, parts of SA and WA), a solar or safety cover is the best investment you can make. A good cover kept the pool pristine during a major dust event that turned uncovered pools red overnight.",
      },
      {
        type: "cta",
        headline: "Track your water recovery in real time",
        body: "Log each test during your dust storm recovery and PoolConnection will tell you exactly what to add and when — taking the guesswork out of a stressful situation.",
        action: "Get started free",
      },
    ],
  },

  // ─── 6. SEPTEMBER 2026 — Spring ───────────────────────────────────────────
  {
    slug: "spring-pool-opening-complete-guide",
    title: "Spring Pool Opening: The Complete Step-by-Step Guide",
    publishDate: "2026-09-02",
    category: "Seasonal",
    season: "Spring",
    readTime: "7 min read",
    heroEmoji: "🌸",
    excerpt:
      "Opening a pool after winter is either a 2-hour job or a 2-week nightmare — and the difference comes down to preparation. Here's how to do it right, from cover removal to first swim.",
    content: [
      {
        type: "intro",
        text: "September is the starting gun for pool season in most of Australia. If you've maintained your pool through winter, opening is a straightforward process. If you took your eye off it, you might be looking at green water and a week of recovery. Either way, this guide walks you through everything from cover removal to the moment it's safe to jump in.",
      },
      {
        type: "h2",
        text: "Before You Remove the Cover",
      },
      {
        type: "p",
        text: "A few checks before you reveal what winter left behind will save you time and prevent debris falling into the pool.",
      },
      {
        type: "checklist",
        items: [
          "Remove any standing water from the top of solid covers using a submersible pump or cover pump",
          "Clear leaves and debris from the cover surface before lifting to prevent them falling in",
          "Have your chemicals and testing kit ready before you start — you'll test immediately after removing the cover",
          "Check the water level through the skimmer box before removing the cover — top up if needed",
        ],
      },
      {
        type: "h2",
        text: "Step 1: Remove, Clean, and Store the Cover",
      },
      {
        type: "steps",
        items: [
          { label: "Get help for large covers", detail: "Pool covers are heavy and awkward when wet. A second set of hands prevents dragging it across the pool surface." },
          { label: "Hose down the cover", detail: "Clean any algae, dirt, or mildew before storing. A mild pool-safe sanitiser can be wiped on the cover and rinsed." },
          { label: "Allow to dry completely before folding", detail: "Storing a damp cover promotes mould and deterioration. Lay it in the sun for a few hours first." },
          { label: "Store in a cool, dry place", detail: "Out of direct sunlight — UV breaks down the cover material over time." },
        ],
      },
      {
        type: "h2",
        text: "Step 2: The Opening Assessment",
      },
      {
        type: "p",
        text: "Once the cover is off, take stock before adding anything to the water.",
      },
      {
        type: "checklist",
        items: [
          "Is the water clear, hazy, or green? This determines how much work is ahead.",
          "Check the water level — top up to mid-skimmer level if low",
          "Inspect pool walls and floor visually for algae patches (green, yellow, or black spots)",
          "Look at the waterline for any staining or tide marks from winter debris",
          "Check equipment — ensure the pump is primed, valves are in the correct position, and the filter media looks intact",
        ],
      },
      {
        type: "h2",
        text: "Step 3: Full Water Test",
      },
      {
        type: "p",
        text: "This is your baseline. Don't add any chemicals until you have test results — you need to know what you're working with.",
      },
      {
        type: "checklist",
        items: [
          "Free chlorine: likely low or zero after winter — this is normal",
          "pH: test before anything else — determines what you adjust first",
          "Total alkalinity: adjust this before pH if it's out of range",
          "Calcium hardness: important for plaster pools — low hardness is corrosive",
          "Stabiliser (CYA): check before adding more — over-stabilised water causes chlorine lock",
          "Salt level (if salt pool): top up before turning on the chlorinator",
          "Phosphate levels: high phosphates in spring fuel the algae bloom cycle — treat proactively",
        ],
      },
      {
        type: "tip",
        label: "Take Your Sample to the Pool Shop",
        text: "For opening day, consider getting a professional lab-style test at your pool shop rather than relying solely on home strips. They can identify metal levels, phosphates, and other parameters that basic home kits miss. Most pool shops offer this free or for a small fee.",
      },
      {
        type: "h2",
        text: "Step 4: Balance in the Right Order",
      },
      {
        type: "p",
        text: "Chemistry adjustments work best in a specific sequence. Doing them out of order wastes product and time.",
      },
      {
        type: "steps",
        items: [
          { label: "Total alkalinity first (80–120 ppm)", detail: "Alkalinity is the buffer that stabilises pH. Getting this right makes pH adjustment far easier. Add sodium bicarbonate to raise, or dry acid (diluted) to lower." },
          { label: "Calcium hardness (200–400 ppm)", detail: "Add calcium chloride to raise if needed. Don't skip this — soft water attacks plaster, pebblecrete, and grout over time." },
          { label: "pH (7.2–7.6)", detail: "Use pH Up (sodium carbonate) or pH Down (dry acid). Retest 4 hours after adjusting — pH drifts as it equilibrates." },
          { label: "Stabiliser (30–50 ppm)", detail: "Add cyanuric acid if below 30 ppm. This is critical for outdoor pools going into spring UV exposure. Don't exceed 80 ppm." },
          { label: "Shock treatment", detail: "Once all parameters are balanced, add a full shock dose (follow product label for your pool volume). Run the pump for 24 hours before retesting." },
          { label: "Algaecide", detail: "After shocking, add a quality algaecide as a preventive spring dose — particularly important if any algae was visible during the opening inspection." },
        ],
      },
      {
        type: "h2",
        text: "Step 5: Filter and Circulation",
      },
      {
        type: "checklist",
        items: [
          "Run your filter continuously (24 hours) for the first 48 hours of spring opening",
          "Backwash sand filters after the first 24-hour run, then repeat as pressure builds",
          "Clean cartridge filter elements before reinstalling for spring",
          "Check all return jets are pointing downward and circulating properly",
          "Clear any debris from skimmer baskets and pump pre-filter baskets",
          "Turn on the saltwater chlorinator only after confirming salt level is within spec",
        ],
      },
      {
        type: "h2",
        text: "When Can You Swim?",
      },
      {
        type: "p",
        text: "The pool is ready for swimming when all of the following are true:",
      },
      {
        type: "checklist",
        items: [
          "Water is visually clear — you can clearly see the floor of the deep end",
          "Free chlorine is between 1–3 ppm (not higher than 5 ppm)",
          "pH is between 7.2–7.6",
          "No visible algae on surfaces",
          "Pump and filter are operating normally",
        ],
      },
      {
        type: "cta",
        headline: "Ready for another season? Track it from day one.",
        body: "PoolConnection logs every test, calculates your doses, and keeps a full history of your pool's health. Start spring right.",
        action: "Start your pool profile free",
      },
    ],
  },

  // ─── 7. OCTOBER 2026 — Spring ─────────────────────────────────────────────
  {
    slug: "spring-water-chemistry-balancing-guide",
    title: "Getting Your Spring Chemistry Right: A Complete Balancing Guide",
    publishDate: "2026-10-07",
    category: "Water Care",
    season: "Spring",
    readTime: "6 min read",
    heroEmoji: "⚗️",
    excerpt:
      "Spring is when chemistry problems that were manageable in winter suddenly become visible and urgent. Algae blooms, cloudy water, and pH instability are all common — here's how to get ahead of every one of them.",
    content: [
      {
        type: "intro",
        text: "October is where most of the year's pool chemistry problems are born. Rising water temperatures, increased UV exposure, and the ramp-up of bather load all create conditions that stress water balance. The good news: fix it right in October and you'll sail through the summer.",
      },
      {
        type: "h2",
        text: "The Spring Chemistry Shift",
      },
      {
        type: "p",
        text: "As water temperatures climb from winter's 15–18°C toward spring's 20–25°C, several things change at once:",
      },
      {
        type: "checklist",
        items: [
          "Algae growth rate increases exponentially — algae that was dormant at 15°C becomes active above 18°C",
          "Chlorine degrades faster — UV exposure is increasing week by week through spring",
          "Stabiliser becomes more important — CYA protects chlorine from UV degradation",
          "Phosphate levels — winter debris breaks down and releases phosphates, which feed algae",
          "pH tends to rise in warmer water — you'll adjust pH Down more frequently",
        ],
      },
      {
        type: "h2",
        text: "The Spring Testing Schedule",
      },
      {
        type: "p",
        text: "Spring demands more frequent testing than winter. Move from fortnightly to weekly in September and October, then shift to twice-weekly as November approaches.",
      },
      {
        type: "checklist",
        items: [
          "September: Test weekly",
          "October: Test twice weekly as temperatures rise",
          "November: Consider testing every 2–3 days, particularly after rain or heavy use",
          "Always test 30 minutes before sunset or in the shade — UV affects test strip readings",
          "Compare each result to your previous reading to spot trends early",
        ],
      },
      {
        type: "h2",
        text: "Phosphates: The Hidden Spring Trigger",
      },
      {
        type: "p",
        text: "Phosphates are algae food, and they accumulate over winter from decaying leaves, dust, and organic debris. In spring, rising temps turn those phosphates into fuel for algae blooms. Most home test kits don't test phosphates — but your pool shop can test for them.",
      },
      {
        type: "checklist",
        items: [
          "Ideal phosphate level: under 100 ppb (parts per billion)",
          "Above 500 ppb: increase algaecide frequency and treat with a phosphate remover",
          "Above 1,000 ppb: aggressive phosphate treatment is needed before you increase pool use",
          "Phosphate removers (lanthanum chloride-based) are highly effective — follow dosing instructions carefully as they can temporarily cloud the water",
          "Prevention: remove leaves and debris promptly rather than letting them decompose in the water",
        ],
      },
      {
        type: "h2",
        text: "Chlorine Demand: Understanding and Managing It",
      },
      {
        type: "p",
        text: "A frustrating spring problem is 'chlorine demand' — where the pool seems to consume chlorine almost as fast as you add it. This is usually a sign that there's a large amount of combined chlorine (chloramines) or organic material in the water that needs to be broken through.",
      },
      {
        type: "steps",
        items: [
          { label: "Test combined chlorine", detail: "Total chlorine minus free chlorine equals combined chlorine. If combined is above 0.2 ppm, you need to break it down." },
          { label: "Breakpoint chlorination", detail: "Add enough chlorine to reach 10x the combined chlorine level. This 'breaks' the chloramines. For example, if combined chlorine is 1 ppm, you need to raise free chlorine to 10 ppm to break through it." },
          { label: "Non-chlorine shock (MPS)", detail: "Potassium monopersulphate shock oxidises organic matter without raising chlorine levels — useful for saltwater pools or when you want to swim sooner." },
          { label: "UV system", detail: "If you struggle with chlorine demand repeatedly, a UV system dramatically reduces organic load and chloramine formation — worth considering for high-use pools." },
        ],
      },
      {
        type: "h2",
        text: "Managing pH in Spring",
      },
      {
        type: "p",
        text: "pH is the most active parameter in spring. Every rain event, chemical addition, and bather pushes it around. Here's how to stay on top of it efficiently:",
      },
      {
        type: "checklist",
        items: [
          "Adjust alkalinity before pH — alkalinity stabilises pH and makes it easier to hold",
          "When using pH Down, add in small doses (100–200g per 50,000L) and retest 4 hours later",
          "Don't over-correct — overshooting pH in the wrong direction creates a correction cycle",
          "After heavy rain, expect pH to drop — have dry acid or sodium bisulphate on hand",
          "After bather loads, pH tends to rise — this is normal and expected",
          "CO₂ injectors (natural pH reduction systems) are worth investigating if you battle pH constantly",
        ],
      },
      {
        type: "tip",
        label: "Spring Clarity Secret",
        text: "If your water looks slightly dull or hazy in spring despite balanced chemistry, a dose of a quality clarifier and increasing filtration hours to 10–12 hours per day for a week usually resolves it. The combination of increasing debris, rising temps, and ramping use temporarily overwhelms even well-balanced water.",
      },
      {
        type: "cta",
        headline: "Stop chasing chemistry problems after they appear",
        body: "PoolConnection tracks your readings over time and spots trends before they become problems. Get alerts when phosphates climb, pH drifts, or chlorine demand spikes.",
        action: "Set up your pool profile",
      },
    ],
  },

  // ─── 8. NOVEMBER 2026 — Pre-Summer ────────────────────────────────────────
  {
    slug: "pre-summer-pool-prep-10-things-to-do",
    title: "10 Things to Do Before Summer Starts (Don't Wait Until December)",
    publishDate: "2026-11-04",
    category: "Maintenance",
    season: "Spring",
    readTime: "5 min read",
    heroEmoji: "☀️",
    excerpt:
      "November is the most important month for pool owners. Get these 10 things done now and you'll start summer with a pool that's crystal clear, fully equipped, and ready to entertain — instead of scrambling when the heat hits.",
    content: [
      {
        type: "intro",
        text: "Every year, pool shops are overwhelmed in December with frantic customers chasing parts, chemicals, and emergency repairs. The heater that stopped working. The filter that's been quietly failing. The green pool that appeared overnight. Almost all of these are November problems that got ignored until summer. Here's how to get ahead.",
      },
      {
        type: "h2",
        text: "The November Pre-Summer Checklist",
      },
      {
        type: "h3",
        text: "1. Service Your Pump and Filter",
      },
      {
        type: "p",
        text: "Summer is not the time to discover your pump is making a grinding noise or your filter media hasn't been changed in five years. Service everything now while lead times for parts and technician visits are shorter.",
      },
      {
        type: "checklist",
        items: [
          "Check pump impeller — remove the lid and inspect for cracking or wear",
          "Test capacitor on single-speed pumps if it struggles to start",
          "Inspect all O-rings and gaskets — replace if cracked or brittle",
          "Sand filter: change media if it's been more than 3–5 years (channelling reduces effectiveness significantly)",
          "Cartridge filter: inspect elements for tears or collapse — replace if damaged",
          "DE filter: check fingers or grids for tears — a torn DE filter introduces DE into the pool",
        ],
      },
      {
        type: "h3",
        text: "2. Test and Service Your Pool Heater",
      },
      {
        type: "p",
        text: "Run your heat pump or gas heater now — don't wait until the first cold December night when every pool technician in the state is booked out.",
      },
      {
        type: "checklist",
        items: [
          "Turn on the heater and verify it reaches your target temperature",
          "Check the heat pump for any frost or condensation damage from winter",
          "Clean the heat pump coils of any debris",
          "Gas heaters: check ignition and gas connections — consider a professional service every 2 years",
          "Solar heating: inspect panels and pipes for leaks or blockages after winter",
        ],
      },
      {
        type: "h3",
        text: "3. Check Your Saltwater Chlorinator",
      },
      {
        type: "p",
        text: "Cells have a finite life — typically 3–7 years depending on use and maintenance. A tired cell in November becomes a crisis in January.",
      },
      {
        type: "checklist",
        items: [
          "Run a cell output test — most modern units display this on screen",
          "Clean the cell with diluted acid if there's calcium scale on the plates",
          "Check salt level and top up if needed",
          "Inspect cell connections and O-rings",
          "If output has dropped significantly, budget for a cell replacement before summer",
        ],
      },
      {
        type: "h3",
        text: "4. Inspect Pool Surfaces and Fittings",
      },
      {
        type: "checklist",
        items: [
          "Walk the pool shell and look for cracks, lifting tiles, or deteriorating grout",
          "Check skimmer boxes for cracks or loose connections — skimmer bodies are a common leak point",
          "Inspect return jets — remove and clean any with reduced flow",
          "Check main drain covers are secure and in good condition (safety requirement)",
          "Look for any discolouration or rough patches on plaster that might indicate etching or staining",
        ],
      },
      {
        type: "h3",
        text: "5. Stock Your Chemical Inventory",
      },
      {
        type: "p",
        text: "December is not the time to discover you're out of chlorine on a 38°C day. Get your summer stock ready in November.",
      },
      {
        type: "checklist",
        items: [
          "Chlorine (granular or liquid) — at least a 2–3 month supply",
          "Shock treatment — have 4–6 doses ready",
          "pH Down and pH Up",
          "Alkalinity buffer (bicarb)",
          "Stabiliser — if you need to top up to 40–50 ppm before peak UV season",
          "Algaecide — at least 2 months' supply",
          "Clarifier",
          "Test kit — replace strips if they're expired or out of reagent",
        ],
      },
      {
        type: "h3",
        text: "6. Check Water Safety Equipment",
      },
      {
        type: "checklist",
        items: [
          "CPR chart — must be displayed at the pool in most states",
          "Pool fence: check all latches, hinges, and gate returns are functioning correctly",
          "Resecure any fence panels that have lifted or shifted over winter",
          "Rescue equipment (shepherd's crook, ring buoy) — in good condition and accessible",
          "Pool lighting — test all underwater and perimeter lights before summer night swims",
        ],
      },
      {
        type: "h3",
        text: "7. Deep Clean the Pool",
      },
      {
        type: "checklist",
        items: [
          "Brush all walls, floor, and steps — spring algae often hides in low-flow areas",
          "Vacuum thoroughly and backwash after",
          "Clean the waterline with a purpose-made waterline cleaner",
          "Skim the surface and clear all baskets",
          "Hose down the pool deck, coping, and surrounding area",
        ],
      },
      {
        type: "h3",
        text: "8. Upgrade Where It Counts",
      },
      {
        type: "p",
        text: "November is a good time to consider upgrades you've been putting off — before you need them urgently.",
      },
      {
        type: "checklist",
        items: [
          "Variable speed pump: dramatically reduces power bills and qualifies for rebates in some states",
          "Pool automation: control pump, heater, and lights from your phone",
          "Robotic cleaner: takes daily vacuuming off your plate entirely",
          "LED lighting upgrade: lower power, longer life, multiple colours",
          "Solar cover: reduces evaporation and heating costs significantly",
        ],
      },
      {
        type: "h3",
        text: "9. Increase Filtration Hours",
      },
      {
        type: "p",
        text: "Start stepping up your run time now — from the 4–6 hours of winter to the 8–10 hours summer requires. Do this gradually through November so the system is already in summer mode when the heat arrives.",
      },
      {
        type: "h3",
        text: "10. Book a Professional Water Test",
      },
      {
        type: "p",
        text: "Get a comprehensive water analysis at your pool shop in late November. They can identify metal levels, phosphates, and stabiliser levels that home kits can't measure. This gives you a clean starting point for summer.",
      },
      {
        type: "cta",
        headline: "Head into summer with a perfectly balanced pool",
        body: "PoolConnection tracks your pre-summer prep, reminds you what's due, and keeps your chemistry on target as temperatures climb.",
        action: "Start your free trial now",
      },
    ],
  },

  // ─── 9. DECEMBER 2026 — Summer ────────────────────────────────────────────
  {
    slug: "hosting-safe-summer-pool-days",
    title: "Hosting Safe Summer Pool Days: Water Quality, Safety Rules & Entertainment Tips",
    publishDate: "2026-12-02",
    category: "Pool Safety",
    season: "Summer",
    readTime: "6 min read",
    heroEmoji: "🎉",
    excerpt:
      "Christmas pool parties are an Australian tradition. Here's how to keep the water clean when you have 20 people in it, maintain pool safety for guests of all ages, and still enjoy your own party.",
    content: [
      {
        type: "intro",
        text: "Summer entertaining and pool ownership are natural partners in Australia. But a pool that's perfectly balanced for two people behaves very differently when there's a crowd. Understanding how bather load affects water chemistry — and having a simple safety checklist — means you can focus on being a great host instead of managing a chemistry crisis at 2pm on Christmas Day.",
      },
      {
        type: "h2",
        text: "Before the Party: Water Prep",
      },
      {
        type: "p",
        text: "The day before a big gathering is the most important time to tend to your pool — not the morning of, when there's no time to adjust if something is off.",
      },
      {
        type: "checklist",
        items: [
          "Test all parameters the day before — pH, chlorine, alkalinity, and salt if applicable",
          "Shock the pool the evening before the party to give it overnight to work and for chlorine to drop back to safe swimming levels (1–3 ppm)",
          "Raise free chlorine slightly above your normal target — aim for 2.5–3 ppm going into the party (high bather load will consume chlorine rapidly)",
          "Check pH is at 7.4–7.6 — this is the optimal range for both sanitation and swimmer comfort",
          "Skim and vacuum the pool the morning of the event",
          "Empty all skimmer and pump baskets so they're at full capacity when loads increase",
          "Run the pump for at least 4 hours before guests arrive to ensure full water turnover",
        ],
      },
      {
        type: "tip",
        label: "The Sunscreen Problem",
        text: "Sunscreen is one of the biggest chlorine consumers in a pool. A group of people wearing SPF 50+ can crash a pool's chlorine level in hours. Consider a mid-party chlorine top-up if you have 10+ people swimming for more than 2 hours.",
      },
      {
        type: "h2",
        text: "During the Party: Simple Chemistry Monitoring",
      },
      {
        type: "p",
        text: "You don't need to be hovering over the pool with a test kit all day — but a quick mid-afternoon check takes less than 5 minutes and can prevent problems.",
      },
      {
        type: "checklist",
        items: [
          "Check free chlorine mid-party if you have 8+ people swimming — use a test strip for a quick read",
          "If chlorine drops below 1 ppm with people still swimming, add a top-up dose of liquid chlorine",
          "Watch for eye irritation complaints from swimmers — often a sign of low chlorine or pH problems, not high chlorine",
          "Keep a lid on the filtration system — run the pump continuously during the party",
          "Watch the waterline for floating debris, oils, and sunscreen — skim as needed",
        ],
      },
      {
        type: "h2",
        text: "Pool Safety: Non-Negotiable Rules for Gatherings",
      },
      {
        type: "p",
        text: "Pool safety becomes more complex when there are guests — especially children from different families who don't know your pool's depths, entry points, or rules. Establish expectations early.",
      },
      {
        type: "checklist",
        items: [
          "Designate an adult as pool supervisor — not 'sort of watching' — dedicated supervision for children in and around the pool",
          "Rotate supervision responsibility if it's a long event — 20 minutes of close attention is more effective than 4 hours of distracted watching",
          "Brief guests on pool rules before swimming: no running, no diving in the shallow end, no pushing",
          "Ensure non-swimmers and young children wear appropriately rated life vests or arm bands",
          "Know the depth of every part of your pool — shallow areas can be deceptive from the surface",
          "Keep the pool gate closed and latched when not actively supervising — even at a party",
          "Know where rescue equipment is located and how to use it",
          "Know CPR — consider a refresher course if it's been more than 2 years (St John Ambulance runs regular community sessions)",
        ],
      },
      {
        type: "warning",
        label: "Alcohol and Pool Supervision Don't Mix",
        text: "The risk of drowning increases significantly around alcohol. If adults are drinking, ensure a clearly designated sober supervisor is responsible for the pool. Rotate this responsibility so everyone can enjoy the day, but never leave the pool unsupervised during the event.",
      },
      {
        type: "h2",
        text: "After the Party: Recovery",
      },
      {
        type: "p",
        text: "After a big swim day, your pool needs attention. Don't assume it'll sort itself out overnight.",
      },
      {
        type: "steps",
        items: [
          { label: "Shock the pool that evening", detail: "A post-party shock restores sanitiser levels and oxidises the organic load from sunscreen, body oils, and waste that's accumulated through the day." },
          { label: "Run the filter for 8+ hours overnight", detail: "Continuous filtration pushes the post-party turnover through the system." },
          { label: "Test the next morning", detail: "Check pH, chlorine, and clarity. Adjust before the next swim day." },
          { label: "Backwash or clean the filter", detail: "Heavy bather loads clog filters quickly. Check and clean as needed." },
        ],
      },
      {
        type: "cta",
        headline: "Your pool, party-ready all summer",
        body: "PoolConnection helps you prep before events, monitor through the season, and recover after big use days. Set up your pool in minutes.",
        action: "Start free — 7 days on us",
      },
    ],
  },

  // ─── 10. JANUARY 2027 — Peak Summer / Heat ────────────────────────────────
  {
    slug: "pool-water-balance-extreme-heat-40-degrees",
    title: "Pool Chemistry in Extreme Heat: What to Do When It Hits 40°C",
    publishDate: "2027-01-07",
    category: "Water Care",
    season: "Summer",
    readTime: "6 min read",
    heroEmoji: "🌡️",
    excerpt:
      "Heatwaves are the hardest test for pool chemistry. 40°C days can destroy a week's worth of careful balancing in hours. Here's how to protect your pool when the temperature climbs — and when it stays up for days at a time.",
    content: [
      {
        type: "intro",
        text: "January in Australia can be brutal. When temperatures hold above 35–40°C for several days in a row, your pool chemistry enters a different mode entirely. Evaporation accelerates, UV degrades chlorine at maximum rate, algae growth spikes, and bather demand peaks all at once. Here's how to manage through the toughest weeks of the year.",
      },
      {
        type: "h2",
        text: "What Extreme Heat Does to Pool Chemistry",
      },
      {
        type: "checklist",
        items: [
          "Chlorine degrades 2–5x faster in direct sunlight above 35°C — particularly in pools with low stabiliser",
          "Water temperature above 28°C creates ideal algae growth conditions — algae can visibly bloom within 24–48 hours",
          "Evaporation accelerates — you may lose 2–5cm of water per day in extreme heat, concentrating all chemicals",
          "pH rises more quickly in warm water — you'll need pH Down more frequently",
          "Bather load is highest in extreme heat — swimmers bring more sweat, oils, and contaminants",
          "Stabiliser (CYA) becomes critical — without it, a full day's worth of chlorine can be destroyed by UV in hours",
        ],
      },
      {
        type: "h2",
        text: "Adjusting Your Routine for a Heatwave",
      },
      {
        type: "p",
        text: "The first 40°C day is manageable. A five-day heatwave requires a fundamentally different approach.",
      },
      {
        type: "steps",
        items: [
          { label: "Test daily — morning and evening if possible", detail: "Chemistry can shift dramatically from morning to evening on a hot day. Don't rely on yesterday's reading." },
          { label: "Add chlorine in the evening", detail: "Morning additions are largely destroyed by the day's UV before they can work. Evening additions have all night to circulate and work — then the next day's UV degrades what remains. You get far more value from the same amount of product." },
          { label: "Check your stabiliser level", detail: "CYA (cyanuric acid) is your chlorine's sunscreen. At 40–50 ppm it protects chlorine from UV degradation. If you're below 30 ppm in a heatwave, you're fighting a losing battle." },
          { label: "Increase filtration hours to 12–14 hours per day", detail: "More water turnover equals better sanitation in high-demand periods. Run extra hours in the morning before the peak heat of the day." },
          { label: "Watch the water level daily", detail: "High evaporation concentrates all chemicals. If the pool loses more than 5cm, top it up — but test after topping up as fresh water dilutes your chemistry." },
          { label: "Shock every 2–3 days (not weekly)", detail: "In a prolonged heatwave with high bather load, weekly shocking isn't enough. Every 2–3 days keeps organic load under control and prevents chloramine buildup." },
        ],
      },
      {
        type: "h2",
        text: "Dealing with Rapid Algae Growth",
      },
      {
        type: "p",
        text: "If you see the first signs of algae — slight green tinge to the water, reduced visibility, or green patches on walls — act immediately. In 40°C heat, algae can go from a hint to a full bloom in 24 hours.",
      },
      {
        type: "steps",
        items: [
          { label: "Brush all surfaces", detail: "Break the biofilm that algae forms on surfaces. Brush into the water, not into the skimmer." },
          { label: "Triple-shock immediately", detail: "Calculate your shock dose for triple the usual rate. Add in the evening." },
          { label: "Add algaecide", detail: "Use a polyquat 60 algaecide after shocking (not at the same time — chlorine degrades some algaecides rapidly). Algaecide attacks the algae at a cellular level as shock works on the bulk population." },
          { label: "Run filter 24 hours", detail: "Don't let the pump stop until the water is clear. Backwash every 4–6 hours during active algae treatment." },
          { label: "Test phosphates", detail: "Heatwaves + high phosphates = accelerated algae growth. If phosphates are above 500 ppb, treat with a phosphate remover once the algae is under control." },
        ],
      },
      {
        type: "h2",
        text: "Heatwave-Specific Warnings",
      },
      {
        type: "warning",
        label: "Concentrated Chemicals",
        text: "If evaporation has been high and you haven't topped up the water, ALL your chemical levels will be elevated — including salt, stabiliser, and calcium hardness. Test before adding anything or you may overdose.",
      },
      {
        type: "warning",
        label: "Chemical Storage in Heat",
        text: "Never leave chlorine or shock products in direct sunlight. Extreme heat can degrade products rapidly, cause containers to bloat or leak, and creates fire and explosion risks with some chemical combinations. Keep all pool chemicals in a cool, well-ventilated, shaded storage area.",
      },
      {
        type: "tip",
        label: "Run Your Pump at Night",
        text: "Overnight pump operation during a heatwave can be a game-changer. Cooler overnight temperatures mean the pump works more efficiently, evaporation slows, and the pool gets a full turnover before the next day's assault. Consider running 6 hours overnight plus 6 hours during the day rather than all-day operation.",
      },
      {
        type: "cta",
        headline: "Heat won't catch you off guard again",
        body: "PoolConnection tracks daily readings, sends alerts when chlorine drops during heatwave conditions, and calculates exactly how much to add each evening.",
        action: "Try PoolConnection free",
      },
    ],
  },

  // ─── 11. FEBRUARY 2027 — Summer / Cyclone & Rain Season ──────────────────
  {
    slug: "heavy-rain-flood-pool-recovery-guide",
    title: "After the Storm: What Heavy Rain and Flooding Does to Your Pool",
    publishDate: "2027-02-03",
    category: "Weather Events",
    season: "Summer",
    readTime: "6 min read",
    heroEmoji: "⛈️",
    excerpt:
      "Whether it's a cyclone, a summer storm, or a week of relentless rain, water from the sky creates a very specific set of problems for your pool. Here's how to recover quickly — and safely.",
    content: [
      {
        type: "intro",
        text: "February is peak tropical cyclone and heavy rainfall season across northern Australia, and intense summer storms hit coastal regions from QLD to WA and NSW. Pool owners routinely face 100mm+ rain events that dump thousands of litres of fresh, chemically unbalanced water directly into their pools. Here's what it does and how to fix it.",
      },
      {
        type: "h2",
        text: "What Heavy Rain Does to Your Pool",
      },
      {
        type: "checklist",
        items: [
          "Dilutes all chemical levels — chlorine, alkalinity, pH buffers, stabiliser, and salt all drop in proportion to the volume of rain added",
          "Drops pH — rainwater is naturally slightly acidic (pH 5.5–6.5 in most regions), pulling pool pH down",
          "Lowers total alkalinity — the pH buffer weakens, making future pH more volatile",
          "Introduces organic matter — airborne contaminants, dust, bird droppings, leaves, and runoff all enter during storms",
          "Can introduce copper, iron, or other metals from runoff — particularly in rural or industrial areas",
          "Overfills the pool — reducing skimmer effectiveness and limiting chemical contact time",
          "In flood conditions: soil, clay, debris, and biological matter enter the pool in large quantities",
        ],
      },
      {
        type: "h2",
        text: "Immediate Steps After Heavy Rain",
      },
      {
        type: "steps",
        items: [
          { label: "Check the water level first", detail: "If the pool is overfull (water above the skimmer opening), the skimmer can't work. Pump water down to the mid-skimmer level before doing anything else." },
          { label: "Remove surface debris", detail: "Skim off leaves, insects, and visible debris before they sink and decompose. This reduces the chemical load you're about to treat." },
          { label: "Test all parameters", detail: "A full water test — pH, chlorine, alkalinity, calcium hardness, and stabiliser — gives you a clear picture of what you're working with. Don't guess." },
          { label: "Adjust alkalinity first", detail: "Alkalinity is the buffer. If it's crashed (common after heavy rain), bring it back to 80–120 ppm with sodium bicarbonate before touching pH." },
          { label: "Adjust pH to 7.2–7.6", detail: "After alkalinity is correct, add pH Up (sodium carbonate) to bring pH back into range. Retest 4 hours later." },
          { label: "Shock the pool", detail: "Heavy rain introduces significant organic load. A shock dose restores sanitiser levels and oxidises contaminants." },
          { label: "Add a sequestrant if flooding occurred", detail: "Floodwater carries metals. A metal sequestrant prevents staining and scale from iron, copper, and manganese deposits." },
          { label: "Run the filter continuously until clear", detail: "Keep the pump running 24 hours through the recovery period. Backwash as pressure builds." },
        ],
      },
      {
        type: "h2",
        text: "Cyclone-Specific Considerations",
      },
      {
        type: "p",
        text: "A tropical cyclone or ex-tropical cyclone delivers not just rain but wind-driven debris, saltwater spray (in coastal areas), and in some cases contaminated floodwater. The recovery process is more intensive.",
      },
      {
        type: "warning",
        label: "Floodwater Contamination",
        text: "If your pool has been contaminated with genuine floodwater — not just rainwater, but water that flowed in from surrounding land — treat it as biologically compromised. Super-chlorinate to 10+ ppm and maintain this level for 24 hours before retesting. Consider consulting a pool professional if the contamination was severe.",
      },
      {
        type: "checklist",
        items: [
          "Remove large debris carefully — do not use the pool pump to vacuum up large material, it will damage the impeller",
          "Saltwater coastal spray can affect salt levels in saltwater pools — test salt level and adjust chlorinator output",
          "Cyclone rain is often extremely acidic — expect significant pH and alkalinity correction to be needed",
          "Check equipment enclosures for water ingress — particularly saltwater chlorinator controllers and automation systems",
          "Inspect the pool structure after a significant event — cyclone-force winds can shift pool coping, fencing, and equipment housing",
        ],
      },
      {
        type: "h2",
        text: "Extended Wet Season Management (Far North QLD and NT)",
      },
      {
        type: "p",
        text: "If you're in the tropics, the wet season isn't one event — it's months of consistent heavy rainfall from November to April. Maintaining a pool through the wet season requires a different approach to the annual cycle.",
      },
      {
        type: "checklist",
        items: [
          "Test weekly minimum — the wet season adds unpredictable variables constantly",
          "Keep a supply of sodium bicarbonate on hand at all times — you'll use it frequently",
          "Consider a phosphate remover as a regular part of your wet season routine — rain carries phosphates that fuel algae",
          "Check pool level after every significant rain event — overfull pools are a constant wet season issue",
          "Algaecide monthly as a preventive measure — warm wet conditions are peak algae territory",
          "Have a submersible pump ready for rapid water level reduction after heavy events",
        ],
      },
      {
        type: "cta",
        headline: "Recover faster after every weather event",
        body: "PoolConnection tells you exactly what to adjust based on your test results — so you spend less time calculating and more time enjoying a clear pool.",
        action: "Get started free",
      },
    ],
  },

  // ─── 12. MARCH 2027 — End of Summer / Early Autumn ───────────────────────
  {
    slug: "end-of-summer-pool-audit",
    title: "The End-of-Summer Pool Audit: 12 Things to Check Before Autumn",
    publishDate: "2027-03-03",
    category: "Maintenance",
    season: "Autumn",
    readTime: "5 min read",
    heroEmoji: "📋",
    excerpt:
      "March is the best time to take an honest look at how your pool has held up through summer. A thorough end-of-season audit now means you head into autumn — and next summer — in far better shape.",
    content: [
      {
        type: "intro",
        text: "Summer is hard on pools. Six months of intense UV, high bather loads, heatwaves, summer storms, and peak chemical demand puts everything under stress — from the water chemistry to the equipment to the pool shell itself. March is the moment to take stock before the maintenance load drops and small problems get forgotten until October.",
      },
      {
        type: "h2",
        text: "The March Pool Audit Checklist",
      },
      {
        type: "h3",
        text: "Water Chemistry",
      },
      {
        type: "checklist",
        items: [
          "Full water test — establish your end-of-season baseline for all parameters",
          "Check stabiliser levels — summer UV often depletes CYA faster than expected in high-use pools",
          "Test salt levels if saltwater — evaporation through summer may have concentrated salt above the ideal range",
          "Check calcium hardness — summer evaporation concentrates calcium; high hardness can cause scaling on cells and heat exchangers",
          "Look for combined chlorine — post-summer water often has elevated chloramines. A shock treatment now clears this before autumn.",
        ],
      },
      {
        type: "h3",
        text: "Equipment",
      },
      {
        type: "checklist",
        items: [
          "Listen to your pump — any new vibrations, grinding, or changes in sound indicate bearing or impeller wear",
          "Check pump basket for cracks — high summer use takes its toll on equipment",
          "Inspect filter pressure gauge — if it reads differently at the same flow rate as earlier in the season, the media may be compacted or the gauge is failing",
          "Saltwater cell: inspect for calcium scale buildup from the concentrated summer water — clean with diluted acid if needed",
          "Heat pump: end-of-season is a good time for a professional service before the unit sits quieter through winter",
          "Pool cleaner: check tyres, brushes, and connections after a full season of use",
        ],
      },
      {
        type: "h3",
        text: "Pool Shell and Surfaces",
      },
      {
        type: "checklist",
        items: [
          "Walk the pool edge and look for new cracks, lifted or loose tiles, or deteriorating grout",
          "Check for staining — iron, copper, or tannin staining is easier to treat before it sets completely",
          "Inspect the waterline for calcium scale ring — end of summer is the time to descale before it hardens further",
          "Look at the skimmer box — cracks or movement in skimmer bodies are a common summer leak source",
          "Inspect pool coping and surrounds for lifting, cracking, or settlement after the dry summer months",
        ],
      },
      {
        type: "h3",
        text: "Safety and Compliance",
      },
      {
        type: "checklist",
        items: [
          "Pool fence: check all hinges, latches, and self-closing mechanisms — summer use puts wear on gate hardware",
          "CPR signage: ensure the approved CPR chart is still clearly displayed and weatherproof",
          "Rescue equipment: verify it's accessible and in good condition",
          "Pool lighting: test all underwater lights — water gets into fixtures over time and LED replacements should be done with the pool level low",
          "Automatic pool safety covers: service the mechanism annually — autumn is a good time before it sits unused",
        ],
      },
      {
        type: "h2",
        text: "What to Act on Now vs. What Can Wait",
      },
      {
        type: "p",
        text: "Not everything needs immediate attention. Here's how to prioritise your March findings:",
      },
      {
        type: "h3",
        text: "Act Now",
      },
      {
        type: "checklist",
        items: [
          "Any pool leaks — water loss compounds damage to surroundings over winter rains",
          "Broken or damaged pool fencing — safety compliance isn't optional",
          "Equipment making new or unusual sounds — problems get worse over winter without use",
          "Active staining that will set permanently if left",
          "Water chemistry that's significantly out of range",
        ],
      },
      {
        type: "h3",
        text: "Can Wait Until Autumn Prep",
      },
      {
        type: "checklist",
        items: [
          "Non-urgent tile repairs and minor surface work",
          "Elective equipment upgrades",
          "Cover replacement",
          "Filter media changes (unless performance has noticeably dropped)",
        ],
      },
      {
        type: "tip",
        label: "Document Your Findings",
        text: "Take photos of anything you spot during the audit — cracks, staining, equipment wear. A documented record of pool condition at end-of-summer gives you a baseline to compare against at next year's audit and a clear picture of how quickly issues progress.",
      },
      {
        type: "cta",
        headline: "Log your season's water history in one place",
        body: "PoolConnection stores every test result so you can see exactly how your pool performed through summer — and what to improve heading into next season.",
        action: "Set up your pool profile",
      },
    ],
  },
];

// ─── Helper exports ────────────────────────────────────────────────────────────
export const getArticleBySlug = (slug) => ARTICLES.find((a) => a.slug === slug);

export const getArticlesByCategory = (category) =>
  ARTICLES.filter((a) => a.category === category);

export const getArticlesBySeason = (season) =>
  ARTICLES.filter((a) => a.season === season);

export const getRecentArticles = (n = 3) =>
  [...ARTICLES]
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, n);
