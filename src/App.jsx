import { useState, useEffect, useRef } from "react";
import coldChainDiagram from "./assets/cold-chain-diagram.jpg";
import tspLogo from "./assets/tsp-logo.png";

const TEAL = "#1A7A8A";
const TEAL_DARK = "#126270";
const TEAL_LIGHT = "#E4F2F4";
const TEAL_WASH = "#F3FAFB";
const GOLD = "#C89933";
const GOLD_DARK = "#A67D24";
const GOLD_LIGHT = "#FBF4E4";
const RED = "#C43535";
const RED_LIGHT = "#FDF0F0";
const DARK = "#1E2D32";
const BODY_COLOR = "#3A4A50";
const MUTED = "#6B7D85";
const BORDER = "#D4DFE3";
const LIGHT = "#F0F5F7";

// ─── Content Data ───────────────────────────────────────────────

const WELCOME_STEPS = [
  {
    title: "Welcome to TSP",
    content: (
      <div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: DARK, marginBottom: 16 }}>
          Founded in 2020, The Sandwich Project is a 501(c)(3) volunteer-powered nonprofit that has rallied over 25,000 volunteers to make and deliver more than 2.3 million sandwiches to neighbors experiencing food insecurity across Metro Atlanta.
        </p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65 }}>
          This walkthrough will give you everything you need to volunteer safely and effectively — whether you're making sandwiches, hosting a collection point, or delivering to organizations.
        </p>
      </div>
    ),
  },
  {
    title: "How It Works",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, marginBottom: 20, lineHeight: 1.65 }}>Every week, volunteers work together to make it happen:</p>
        {[
          { num: "1", role: "Sandwich Makers", desc: "Purchase ingredients, assemble sandwiches at home, and deliver them to a host." },
          { num: "2", role: "Hosts", desc: "Collect and refrigerate sandwiches from makers, then prep coolers for transport." },
          { num: "3", role: "Drivers", desc: "Pick up from hosts and deliver to 501(c)(3) organizations that distribute to people in need." },
        ].map((s) => (
          <div key={s.num} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: TEAL, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{s.num}</div>
            <div>
              <div style={{ fontWeight: 700, color: DARK, fontSize: 15 }}>{s.role}</div>
              <div style={{ color: BODY_COLOR, fontSize: 14, lineHeight: 1.55 }}>{s.desc}</div>
            </div>
          </div>
        ))}
        <p style={{ color: MUTED, fontSize: 14, marginTop: 12, fontStyle: "italic" }}>No commercial kitchen. No warehouse. Just neighbors helping neighbors.</p>
      </div>
    ),
  },
  {
    title: "Why Food Safety Matters",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>
          Our sandwiches are made in home kitchens and pass through multiple hands before reaching the people who eat them. That makes our food safety standards <strong>even more important</strong> — not less.
        </p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 20 }}>
          The people receiving these sandwiches are trusting us to get it right. Every guideline exists for one reason: to ensure every sandwich is safe to eat when it reaches the person who needs it.
        </p>
        <CalloutBox type="gold" title="The Golden Rule">
          <strong>When in doubt, throw it out.</strong> A wasted sandwich is disappointing. A sandwich that makes someone sick is harmful. We always err on the side of safety.
        </CalloutBox>
      </div>
    ),
  },
];

const FOOD_SAFETY_STEPS = [
  {
    title: "The Cold Chain",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>
          The cold chain is the continuous path of refrigeration from the moment ingredients are purchased to the moment sandwiches reach the recipient organization.
        </p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 20 }}>
          If any link breaks, the food may no longer be safe. <strong>Your job — whatever your role — is to keep your link intact.</strong>
        </p>
        <img src={coldChainDiagram} alt="The Sandwich Project Cold Chain: 1. Store purchase, 2. Car with cooler and ice packs, 3. Fridge at event, 4. Quick prep (one package meat/cheese per table), 5. Assembled back to fridge, 6. Refrigerated until driver arrives" style={{ width: "100%", borderRadius: 10, marginBottom: 20 }} />
        <CalloutBox type="critical" title="Critical Temperature Rules">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: RED, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>MAX SAFE</span>
              <span><strong>39°F</strong> — Deli meat and cheese must stay at or below this at all times.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: RED, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>DANGER</span>
              <span><strong>Above 80°F</strong> — Bacteria multiply rapidly. Absolute ceiling for any exposure.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: TEAL, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>TARGET</span>
              <span><strong>34–38°F</strong> — Ideal refrigerator range for sandwich storage.</span>
            </div>
          </div>
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "The Two-Hour Rule",
    content: (
      <div>
        <CalloutBox type="critical" title="Cumulative — Not Per Step">
          Deli meat can spend a <strong>maximum of 2 hours total</strong> above 39°F — cumulative across all handoffs. This isn't 2 hours per step. It's 2 hours total, from purchase to delivery.
        </CalloutBox>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginTop: 16 }}>
          Every minute your sandwiches spend above 39°F counts toward that two-hour limit. Plan your shopping trips, assembly time, and transport accordingly.
        </p>
      </div>
    ),
  },
  {
    title: "Refrigeration Best Practices",
    content: (
      <div>
        <BulletList items={[
          <><strong>Don't overfill.</strong> Airflow keeps temperatures consistent. An overpacked fridge creates warm spots, even if the thermometer reads correctly.</>,
          <><strong>Minimize door openings.</strong> Every time you open the fridge, cold air escapes and the temperature rises. In and out quickly.</>,
          <><strong>Hot weather shortcut:</strong> If ambient temperatures are high, place sealed sandwich bags in the freezer for 15–20 minutes before moving them to the fridge.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Cooler Rules",
    content: (
      <div>
        <CalloutBox type="teal" title="Key Concept">
          <strong>Coolers maintain cold — they don't create it.</strong> Only pack food that's already fridge-cold. Never put warm food in a cooler and expect it to cool down.
        </CalloutBox>
        <BulletList items={[
          <>Keep coolers in the vehicle <strong>cabin, not the trunk.</strong> A/C only reaches the cabin.</>,
          <>Layer ice packs between loaves and on top.</>,
          <>Pack tightly — less air space = colder longer.</>,
          <>Keep lids sealed. Every opening lets cold air escape.</>,
          <>Never pack a warm cooler — bring it inside to cool down first.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Hygiene",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>Follow these steps every time, in order:</p>
        <NumberedSteps steps={[
          <><strong>Restrain hair first</strong> (tie back, hat, or hairnet), then wash hands.</>,
          <><strong>Wash with soap and water</strong> for at least 20 seconds. Hand sanitizer is not a substitute.</>,
          <><strong>Wear food-safe gloves</strong> during all food handling. Change them if you touch your face, phone, or any non-food surface.</>,
          <><strong>Clean all surfaces</strong> that will contact food before you begin.</>,
        ]} />
        <CalloutBox type="gold" title="Remember">
          <strong>Re-cooling does not reverse bacterial growth.</strong> Once food has been in the danger zone too long, chilling it again doesn't make it safe. When in doubt, throw it out.
        </CalloutBox>
      </div>
    ),
  },
];

const MAKER_STEPS = [
  {
    title: "Shopping",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>You're the starting point of the cold chain. What you buy matters.</p>
        <BulletList items={[
          <><strong>Buy prepackaged deli meat and cheese only</strong> — no deli counter slicing. Prepackaged products have controlled processing environments and clear expiration dates.</>,
          <>Check that expiration dates are <strong>at least 7 days past your drop-off date.</strong></>,
          <>Get cold items into your fridge within 30 minutes of purchase.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Storage Guidelines",
    content: (
      <div>
        <InfoGrid rows={[
          ["Opened deli meat", "Use within 3 days"],
          ["Unopened deli meat & cheese", "Use within 2 weeks of purchase"],
          ["Bread", "Room temp; check for mold before use"],
          ["Peanut butter & jelly", "Shelf-stable; check expiration"],
        ]} />
      </div>
    ),
  },
  {
    title: "Timing",
    content: (
      <div>
        <CalloutBox type="teal" title="Assembly Window">
          <strong>Make sandwiches on Wednesday or Tuesday evening only.</strong> Deliver to your host within 24 hours of assembly. This ensures freshness and keeps us within safe time windows.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "PB&J Assembly",
    content: (
      <div>
        <RecipeCard title="PB&J Sandwiches" subtitle="Exact measurements for consistency">
          <NumberedSteps steps={[
            <>Spread <strong>1 tablespoon peanut butter</strong> on one slice of bread.</>,
            <>Spread <strong>2 tablespoons peanut butter</strong> on the other slice.</>,
            <>Add <strong>2 teaspoons jelly</strong> on top of the 2-tablespoon side.</>,
            <>Press slices together. Do <strong>not</strong> cut.</>,
            <>Bag each sandwich individually in a sandwich-size zip-top bag. Press out excess air.</>,
          ]} />
        </RecipeCard>
      </div>
    ),
  },
  {
    title: "Deli Sandwich Assembly",
    content: (
      <div>
        <RecipeCard title="Deli Sandwiches" subtitle="Keep it simple — bread, meat, cheese only">
          <BulletList items={[
            <>Two slices of bread, deli meat, and cheese. <strong>That's it.</strong></>,
            <><strong>No condiments. No vegetables. No exceptions.</strong> Condiments and veggies accelerate spoilage in uncontrolled environments.</>,
            <>Do <strong>not</strong> cut.</>,
            <>Bag each sandwich individually. Press out excess air.</>,
          ]} />
        </RecipeCard>
        <div style={{ marginTop: 16 }}>
          <p style={{ fontWeight: 700, color: DARK, marginBottom: 8 }}>Packaging</p>
          <BulletList items={[
            <>Place bagged sandwiches into bread loaf bags — PB&J in one, deli in another.</>,
            <>Close loaf bags securely with twist ties.</>,
            <>You do <strong>not</strong> need to label individual sandwiches — your host will provide labels.</>,
          ]} />
        </div>
      </div>
    ),
  },
  {
    title: "Transport & Host Selection",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, fontSize: 15 }}>Transport to Your Host</p>
        <BulletList items={[
          <>Sandwiches must be <strong>fridge-cold before going into the cooler.</strong></>,
          <>Layer ice packs between loaves.</>,
          <>Keep the cooler in the vehicle <strong>cabin</strong> — not the trunk.</>,
          <>Drive directly to your host. No detours, no errands.</>,
        ]} />
        <CalloutBox type="gold" title="Choosing a Host">
          Sandwich makers choose any available host using the <strong>Host Finder</strong> at <strong>www.thesandwichproject.org</strong>. You can switch hosts anytime — just check Host Finder for current availability.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Sandwich Maker FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "Can I add mustard, mayo, lettuce, or tomato?", a: "No. Deli sandwiches are bread, meat, and cheese only. Condiments and vegetables accelerate spoilage and aren't safe in our transport chain." },
          { q: "Can I use deli counter meat?", a: "No. Prepackaged only. Deli counter slicing introduces additional contamination risk and lacks clear expiration tracking." },
          { q: "What if I can't deliver by Thursday?", a: "Don't make them. We'd rather have fewer sandwiches than sandwiches that aren't fresh. Reach out to your host if your schedule changes." },
        ]} />
      </div>
    ),
  },
];

const HOST_STEPS = [
  {
    title: "Your Role & Support",
    content: (
      <div>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: DARK, marginBottom: 16 }}>
          You're the hub of the operation — the central link between sandwich makers and drivers. Your quality checks keep our food safe.
        </p>
        <CalloutBox type="gold" title="Your Support System">
          You're assigned to a <strong>team with a lead host</strong> who's your go-to for questions, scheduling, and troubleshooting. TSP provides training before your first collection. You're never expected to figure it out alone.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "What's Provided vs. What You Need",
    content: (
      <div>
        <InfoGrid rows={[
          ["TSP Provides", "You Provide"],
          ["Coolers & ice packs", "Dedicated fridge at 34–38°F"],
          ["TSP yard sign", "Clean collection & staging area"],
          ["Sign-in sheets & labels", ""],
          ["Web app access", ""],
        ]} header />
        <CalloutBox type="gold" title="TSP Web App">
          Your team lead will get you set up before your first collection day. Access at <strong>www.thesandwichproject.org</strong> (click "Core Team Access").
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Preparing Your Space",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>Your refrigerator is the most important piece of equipment you provide. Before each collection:</p>
        <BulletList items={[
          <>Clean the refrigerator and remove personal food items to maximize space.</>,
          <>Verify temperature is between 34–38°F. <strong>Check it — don't just assume.</strong></>,
          <>Leave room for airflow — an overfilled fridge creates warm spots that compromise food safety.</>,
          <>Keep the area clean, uncluttered, and free of strong odors.</>,
          <>Store everything off the floor, away from pets, trash, chemicals, and tools.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Wednesday: Collection Day",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10 }}>Before Drop-Offs Begin</p>
        <BulletList items={[
          <>Place a donation bin in an accessible spot for fruit/snack collections.</>,
          <>Set up your sign-in station: sign-in sheets, deli and PB&J labels (keep them separate), and pens.</>,
          <>Put out the TSP yard sign so volunteers can find you.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 20 }}>As Volunteers Arrive</p>
        <BulletList items={[
          <>Greet volunteers warmly — it keeps sandwich makers engaged and wanting to come back.</>,
          <>Have them sign in and record their sandwich count and contact info.</>,
          <>Have them label their sandwiches using the host-provided labels.</>,
          <><strong>Check sandwiches are sealed, properly labeled, and cold to the touch.</strong> Cold = refrigerator-cold.</>,
          <>Verify label dates are no earlier than Tuesday evening.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 20 }}>Storing Sandwiches</p>
        <BulletList items={[
          <>Refrigerate promptly with room for airflow. Minimize time the fridge door is open.</>,
          <><strong>Keep PB&J and Deli in separate coolers</strong> for transport.</>,
        ]} />
        <CalloutBox type="critical" title="Allergy Warning">
          TSP sandwiches are not safe for anyone with food allergies due to the ingredients and shared preparation environments.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Thursday: Delivery Prep",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>Thursday morning — getting everything packed and ready for your driver. This is a critical cold chain handoff.</p>
        <BulletList items={[
          <>If a cooler's been in the heat, bring it inside to cool down. <strong>Never pack a warm cooler.</strong></>,
          <>Confirm sandwiches are under 39°F before packing.</>,
          <>Layer ice packs between loaves and on top — every loaf should touch an ice pack.</>,
          <>Pack tightly (tight = colder longer).</>,
          <>Work in the shade. Keep fridge door and cooler lids closed between loads.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 20 }}>Quality Check Before Handoff</p>
        <BulletList items={[
          <>All sandwiches properly sealed</>,
          <>TSP labels complete and legible</>,
          <>Sandwiches cold to the touch</>,
          <>Loaf bags closed with twist ties</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Handling Quality Issues",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>Occasionally you'll receive sandwiches that don't meet guidelines. Handle it gracefully:</p>
        <BulletList items={[
          <><strong>Torn bags:</strong> Transfer to a new bag if individual wrappers are intact.</>,
          <><strong>Missing labels:</strong> Ask the volunteer to label them. Confirm made within 24 hours.</>,
          <><strong>Warm, spoiled, or messy:</strong> Can't be accepted. "We can only take sandwiches that are cold to the touch" is enough.</>,
        ]} />
        <CalloutBox type="teal" title="If Sandwiches Seem Unsafe">
          Set them aside. Mark "DO NOT USE" with the reason (e.g., WARM, OPEN BAG) and contact your lead host. This protects recipients and helps us track patterns.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Cleaning & Schedules",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10 }}>Refrigerator</p>
        <BulletList items={[
          <>Regular wipe-downs. Keep personal food separate.</>,
          <>Minimize door-open time. Work in shade when loading coolers.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16 }}>Coolers</p>
        <BulletList items={[
          <>Wash with soap and warm water after each use. Air-dry fully.</>,
          <>TSP coolers for TSP sandwiches only — no raw meat, fish, or other items.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16 }}>Monthly Schedules</p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65 }}>
          Each month, a team member sends a Google Form to record any weeks you're unavailable. Remind your sandwich makers to subscribe to the weekly newsletter.
        </p>
      </div>
    ),
  },
  {
    title: "Host FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "What if a volunteer brings warm sandwiches?", a: "It's awkward, but food safety comes first. Let them know sandwiches need to be cold to the touch. If questionable, set aside, mark 'DO NOT USE,' and check with your lead host." },
          { q: "Can I use TSP coolers for personal use?", a: "No — even small cross-contamination creates a safety issue. TSP coolers stay dedicated to TSP sandwiches." },
          { q: "What about leftover unopened ingredients?", a: "Accept unopened packages — we'll donate them. Discard any open meat." },
        ]} />
      </div>
    ),
  },
];

const DRIVER_STEPS = [
  {
    title: "Your Role",
    content: (
      <div>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: DARK, marginBottom: 16 }}>
          You're the final link in the cold chain — the person who puts sandwiches into the hands of the organizations that distribute them. Safe transport on your end means everything before it wasn't wasted.
        </p>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 20 }}>Before Your First Delivery</p>
        <BulletList items={[
          <><strong>Sign the Vehicle Release Form</strong> before your first delivery.</>,
          <>Contact Jordan (Driver Coordinator) at <strong>770-789-7329</strong> if you haven't received one.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Transport Protocol",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 16 }}>Pre-cool your vehicle with the A/C before loading. Then:</p>
        <NumberedSteps steps={[
          <>Confirm sandwiches are pre-chilled (under 39°F). If warm, <strong>don't transport</strong> — contact the host.</>,
          <>Check ice packs are layered between loaves and on top.</>,
          <>Pack the cooler tightly — minimize air space.</>,
          <>Keep cooler in the <strong>cabin, not the trunk</strong> — A/C only circulates in the cabin.</>,
          <>Drive directly to the destination. <strong>No stops.</strong></>,
          <>Ensure sandwiches are refrigerated immediately on arrival.</>,
          <>Communicate any delays to the recipient organization right away.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Critical Transport Rules",
    content: (
      <div>
        <CalloutBox type="critical" title="Critical Transport Rules">
          <BulletList items={[
            <><strong>Don't leave packed coolers sitting in your vehicle.</strong> Parked cars reach dangerous temperatures fast.</>,
            <><strong>Hot cooler?</strong> Bring it inside to cool down before packing.</>,
            <><strong>Warm sandwiches?</strong> They need to be fridge-cold first. Coolers maintain temp — they don't lower it.</>,
            <>Keep lids sealed — every opening lets cold air escape.</>,
            <>TSP coolers are for TSP sandwiches only.</>,
          ]} />
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Delivery & Reporting",
    content: (
      <div>
        <CalloutBox type="teal" title="Delivery Standard">
          <strong>We deliver exclusively to 501(c)(3) organizations</strong> — this is a legal requirement. We can't give sandwiches directly to individuals, even if they ask.
        </CalloutBox>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 20 }}>Report Issues to Marcy</p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginBottom: 12 }}>You're our eyes and ears. If you notice any of these, call Marcy:</p>
        <BulletList items={[
          <><strong>Unsafe conditions:</strong> Unclean or unsanitary recipient location.</>,
          <><strong>Improper storage:</strong> Recipient doesn't refrigerate food right away.</>,
          <><strong>Inadequate refrigeration:</strong> Recipient lacks cooling capacity.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Driver FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "Who do we deliver to?", a: "501(c)(3) nonprofit organizations only. This is a legal requirement — we can't distribute directly to individuals, even with good intentions." },
          { q: "What if a recipient location looks unsanitary?", a: "Let Marcy know. Also flag if they're not refrigerating food on arrival or lack adequate cooling." },
        ]} />
      </div>
    ),
  },
];

const CONTACTS = {
  title: "You're All Set!",
  content: (
    <div>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: DARK, marginBottom: 24 }}>
        You've completed the volunteer walkthrough. Here's who to contact when you need help:
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, marginBottom: 20 }}>
        {[
          ["Executive Director", "Christine Cooper Nowicki", "(404) 786-8116"],
          ["Safety & Co-Founder", "Marcy", "(678) 596-9697"],
          ["Driver Coordinator", "Jordan", "770-789-7329"],
          ["Web App & Tech Support", "Katie", "770-789-1013"],
        ].map(([role, name, phone], i) => (
          <div key={i} style={{ display: "flex", borderBottom: i < 3 ? `1px solid ${BORDER}` : "none" }}>
            <div style={{ flex: "0 0 42%", padding: "12px 16px", background: TEAL_WASH, fontWeight: 600, color: TEAL_DARK, fontSize: 13 }}>{role}</div>
            <div style={{ flex: 1, padding: "12px 16px", fontSize: 14, color: BODY_COLOR }}>{name} · {phone}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        <p style={{ fontSize: 14, color: BODY_COLOR }}><strong>Website:</strong> thesandwichproject.org</p>
        <p style={{ fontSize: 14, color: BODY_COLOR }}><strong>Email:</strong> info@thesandwichproject.org</p>
        <p style={{ fontSize: 14, color: BODY_COLOR }}><strong>Web App:</strong> www.thesandwichproject.org → "Core Team Access"</p>
      </div>
      <CalloutBox type="gold" title="The Most Important Thing">
        The Sandwich Project serves our neighbors experiencing food insecurity, with a focus on <strong>dignity, nourishment, and meeting people where they are.</strong>
      </CalloutBox>
    </div>
  ),
};

// ─── Reusable Components ────────────────────────────────────────

function CalloutBox({ type = "teal", title, children }) {
  const styles = {
    teal: { bg: TEAL_WASH, border: TEAL, titleColor: TEAL_DARK },
    gold: { bg: GOLD_LIGHT, border: GOLD, titleColor: GOLD_DARK },
    critical: { bg: RED_LIGHT, border: RED, titleColor: RED },
  };
  const s = styles[type] || styles.teal;
  return (
    <div style={{ background: s.bg, borderLeft: `5px solid ${s.border}`, borderRadius: 8, padding: "16px 20px", margin: "16px 0" }}>
      {title && <div style={{ fontWeight: 700, color: s.titleColor, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>{title}</div>}
      <div style={{ color: BODY_COLOR, fontSize: 14, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, marginTop: 8, flexShrink: 0 }} />
          <div style={{ color: BODY_COLOR, fontSize: 14, lineHeight: 1.6 }}>{item}</div>
        </div>
      ))}
    </div>
  );
}

function NumberedSteps({ steps }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: LIGHT, borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${TEAL_LIGHT}` }}>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: TEAL, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
          <div style={{ color: BODY_COLOR, fontSize: 14, lineHeight: 1.6 }}>{step}</div>
        </div>
      ))}
    </div>
  );
}

function InfoGrid({ rows, header }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${BORDER}`, margin: "12px 0" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ display: "flex", borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none" }}>
          <div style={{ flex: 1, padding: "11px 16px", background: i === 0 && header ? TEAL : i === 0 ? TEAL_WASH : "white", color: i === 0 && header ? "white" : i === 0 ? TEAL_DARK : BODY_COLOR, fontWeight: i === 0 ? 700 : 600, fontSize: 13 }}>{row[0]}</div>
          <div style={{ flex: 1, padding: "11px 16px", background: i === 0 && header ? TEAL : "white", color: i === 0 && header ? "white" : BODY_COLOR, fontSize: 13 }}>{row[1]}</div>
        </div>
      ))}
    </div>
  );
}

function RecipeCard({ title, subtitle, children }) {
  return (
    <div style={{ background: LIGHT, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 22px", margin: "12px 0" }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: TEAL_DARK, marginBottom: 2, fontFamily: "Georgia, serif" }}>{title}</div>
      {subtitle && <div style={{ fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 14 }}>{subtitle}</div>}
      {children}
    </div>
  );
}

function FAQList({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: LIGHT, borderRadius: 10, padding: "14px 18px", borderLeft: `4px solid ${GOLD}` }}>
          <div style={{ fontWeight: 700, color: DARK, fontSize: 14, marginBottom: 6 }}>{item.q}</div>
          <div style={{ color: BODY_COLOR, fontSize: 14, lineHeight: 1.6 }}>{item.a}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Progress Bar ───────────────────────────────────────────────

function ProgressBar({ current, total, label }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: MUTED, textTransform: "uppercase", letterSpacing: 1 }}>{label}</span>
        <span style={{ fontSize: 12, color: MUTED }}>{current + 1} of {total}</span>
      </div>
      <div style={{ height: 5, background: BORDER, borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${TEAL} 0%, ${GOLD} 100%)`, borderRadius: 3, transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────────────────

const PHASES = {
  landing: "landing",
  roleSelect: "roleSelect",
  welcome: "welcome",
  foodSafety: "foodSafety",
  roleContent: "roleContent",
  contacts: "contacts",
  complete: "complete",
};

const ROLE_INFO = {
  maker: { label: "Sandwich Maker", emoji: "🥪", color: TEAL, steps: MAKER_STEPS, desc: "Shopping, storage, assembly, and transport" },
  host: { label: "Host", emoji: "🏠", color: GOLD_DARK, steps: HOST_STEPS, desc: "Collection, quality checks, delivery prep" },
  driver: { label: "Driver", emoji: "🚗", color: TEAL_DARK, steps: DRIVER_STEPS, desc: "Transport protocol and delivery standards" },
};

export default function App() {
  const [phase, setPhase] = useState(PHASES.landing);
  const [role, setRole] = useState(null);
  const [stepIdx, setStepIdx] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [phase, stepIdx]);

  function getSteps() {
    if (phase === PHASES.welcome) return WELCOME_STEPS;
    if (phase === PHASES.foodSafety) return FOOD_SAFETY_STEPS;
    if (phase === PHASES.roleContent && role) return ROLE_INFO[role].steps;
    return [];
  }

  function getPhaseLabel() {
    if (phase === PHASES.welcome) return "Welcome";
    if (phase === PHASES.foodSafety) return "Food Safety";
    if (phase === PHASES.roleContent && role) return ROLE_INFO[role].label;
    return "";
  }

  function getTotalProgress() {
    if (!role) return { current: 0, total: 1 };
    const wLen = WELCOME_STEPS.length;
    const fLen = FOOD_SAFETY_STEPS.length;
    const rLen = ROLE_INFO[role].steps.length;
    const total = wLen + fLen + rLen + 1;
    let current = 0;
    if (phase === PHASES.welcome) current = stepIdx;
    else if (phase === PHASES.foodSafety) current = wLen + stepIdx;
    else if (phase === PHASES.roleContent) current = wLen + fLen + stepIdx;
    else if (phase === PHASES.contacts || phase === PHASES.complete) current = total - 1;
    return { current, total };
  }

  function next() {
    const steps = getSteps();
    if (stepIdx < steps.length - 1) {
      setStepIdx(stepIdx + 1);
    } else {
      if (phase === PHASES.welcome) { setPhase(PHASES.foodSafety); setStepIdx(0); }
      else if (phase === PHASES.foodSafety) { setPhase(PHASES.roleContent); setStepIdx(0); }
      else if (phase === PHASES.roleContent) { setPhase(PHASES.contacts); setStepIdx(0); }
    }
  }

  function prev() {
    if (stepIdx > 0) {
      setStepIdx(stepIdx - 1);
    } else {
      if (phase === PHASES.foodSafety) { setPhase(PHASES.welcome); setStepIdx(WELCOME_STEPS.length - 1); }
      else if (phase === PHASES.roleContent) { setPhase(PHASES.foodSafety); setStepIdx(FOOD_SAFETY_STEPS.length - 1); }
      else if (phase === PHASES.contacts) { setPhase(PHASES.roleContent); setStepIdx(role ? ROLE_INFO[role].steps.length - 1 : 0); }
    }
  }

  function selectRole(r) {
    setRole(r);
    setPhase(PHASES.welcome);
    setStepIdx(0);
  }

  function restart() {
    setPhase(PHASES.landing);
    setRole(null);
    setStepIdx(0);
  }

  // ── Landing ──
  if (phase === PHASES.landing) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(170deg, ${TEAL_WASH} 0%, white 40%, ${GOLD_LIGHT} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <img src={tspLogo} alt="The Sandwich Project" style={{ width: "100%", maxWidth: 360, marginBottom: 16 }} />
          <div style={{ fontSize: 11, color: GOLD_DARK, textTransform: "uppercase", letterSpacing: 3, fontWeight: 600, marginBottom: 24 }}>Volunteer Walkthrough</div>
          <div style={{ width: 60, height: 3, background: GOLD, margin: "0 auto 28px", borderRadius: 2 }} />
          <p style={{ color: BODY_COLOR, fontSize: 16, lineHeight: 1.7, marginBottom: 36 }}>
            Everything you need to know to make a safe, meaningful impact — in about 10 minutes.
          </p>
          <button
            onClick={() => setPhase(PHASES.roleSelect)}
            style={{ background: TEAL, color: "white", border: "none", padding: "16px 48px", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer", transition: "all 0.2s", boxShadow: `0 4px 16px ${TEAL}33` }}
            onMouseEnter={e => { e.target.style.background = TEAL_DARK; e.target.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.target.style.background = TEAL; e.target.style.transform = "translateY(0)"; }}
          >
            Get Started
          </button>
          <p style={{ color: MUTED, fontSize: 13, marginTop: 24 }}>thesandwichproject.org</p>
        </div>
      </div>
    );
  }

  // ── Role Select ──
  if (phase === PHASES.roleSelect) {
    return (
      <div style={{ minHeight: "100vh", background: `linear-gradient(170deg, white 0%, ${TEAL_WASH} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}>
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: TEAL_DARK, marginBottom: 8 }}>What's your role?</h2>
          <p style={{ color: MUTED, marginBottom: 32, fontSize: 15 }}>We'll tailor the walkthrough to what you need to know.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {Object.entries(ROLE_INFO).map(([key, info]) => (
              <button
                key={key}
                onClick={() => selectRole(key)}
                style={{ display: "flex", alignItems: "center", gap: 16, background: "white", border: `2px solid ${BORDER}`, borderRadius: 12, padding: "20px 24px", cursor: "pointer", transition: "all 0.2s", textAlign: "left" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = TEAL; e.currentTarget.style.boxShadow = `0 4px 20px ${TEAL}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ fontSize: 32, flexShrink: 0 }}>{info.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: DARK }}>{info.label}</div>
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{info.desc}</div>
                </div>
                <div style={{ marginLeft: "auto", color: BORDER, fontSize: 20 }}>→</div>
              </button>
            ))}
          </div>
          <p style={{ color: MUTED, fontSize: 12, marginTop: 24, lineHeight: 1.5 }}>Everyone starts with the same Welcome & Food Safety sections, then gets role-specific content.</p>
        </div>
      </div>
    );
  }

  // ── Content Phases ──
  const steps = getSteps();
  const currentStep = phase === PHASES.contacts ? CONTACTS : steps[stepIdx];
  const progress = getTotalProgress();
  const isContacts = phase === PHASES.contacts;
  const canGoPrev = !(phase === PHASES.welcome && stepIdx === 0);

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "white", borderBottom: `1px solid ${BORDER}`, padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🥪</span>
          <span style={{ fontWeight: 700, color: TEAL_DARK, fontSize: 14 }}>TSP</span>
          {role && (
            <span style={{ background: TEAL_LIGHT, color: TEAL_DARK, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
              {ROLE_INFO[role].emoji} {ROLE_INFO[role].label}
            </span>
          )}
        </div>
        <button
          onClick={restart}
          style={{ background: "none", border: `1px solid ${BORDER}`, borderRadius: 6, padding: "6px 12px", fontSize: 12, color: MUTED, cursor: "pointer" }}
        >
          Start Over
        </button>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", padding: "24px 20px 120px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          {/* Overall Progress */}
          <ProgressBar current={progress.current} total={progress.total} label={getPhaseLabel()} />

          {/* Phase indicator pills */}
          <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
            {["welcome", "foodSafety", "roleContent", "contacts"].map((p, i) => {
              const labels = ["Welcome", "Food Safety", role ? ROLE_INFO[role].label : "Role", "Contacts"];
              const isActive = phase === p || (p === "contacts" && phase === "complete");
              const isPast = ["welcome", "foodSafety", "roleContent", "contacts"].indexOf(phase) > i;
              return (
                <div key={p} style={{ padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: isActive ? TEAL : isPast ? `${TEAL}22` : "white", color: isActive ? "white" : isPast ? TEAL : MUTED, border: `1px solid ${isActive ? TEAL : isPast ? `${TEAL}44` : BORDER}` }}>
                  {isPast && "✓ "}{labels[i]}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div style={{ background: "white", borderRadius: 14, padding: "28px 24px", boxShadow: `0 2px 12px ${TEAL}0A`, border: `1px solid ${BORDER}` }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: TEAL_DARK, marginBottom: 20, letterSpacing: -0.3 }}>
              {currentStep.title}
            </h2>
            {currentStep.content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "white", borderTop: `1px solid ${BORDER}`, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
        <button
          onClick={prev}
          disabled={!canGoPrev}
          style={{ background: "none", border: `1px solid ${canGoPrev ? BORDER : "transparent"}`, borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, color: canGoPrev ? BODY_COLOR : "transparent", cursor: canGoPrev ? "pointer" : "default" }}
        >
          ← Back
        </button>
        {isContacts ? (
          <button
            onClick={() => setPhase(PHASES.complete)}
            style={{ background: GOLD, color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
          >
            Complete ✓
          </button>
        ) : (
          <button
            onClick={next}
            style={{ background: TEAL, color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: `0 2px 8px ${TEAL}33` }}
            onMouseEnter={e => e.target.style.background = TEAL_DARK}
            onMouseLeave={e => e.target.style.background = TEAL}
          >
            Continue →
          </button>
        )}
      </div>

      {/* Complete overlay */}
      {phase === PHASES.complete && (
        <div style={{ position: "fixed", inset: 0, background: `linear-gradient(170deg, ${TEAL_WASH} 0%, white 50%, ${GOLD_LIGHT} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, zIndex: 20, textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🎉</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: TEAL_DARK, marginBottom: 10 }}>You're Ready!</h2>
          <p style={{ color: BODY_COLOR, fontSize: 16, lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}>
            You've completed the {role ? ROLE_INFO[role].label : ""} walkthrough. Welcome to The Sandwich Project — we're glad you're here.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button
              onClick={restart}
              style={{ background: "white", border: `2px solid ${TEAL}`, color: TEAL, padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              Start Over
            </button>
            <button
              onClick={() => { setPhase(PHASES.contacts); }}
              style={{ background: TEAL, color: "white", border: "none", padding: "12px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              View Contacts
            </button>
          </div>
          <p style={{ color: MUTED, fontSize: 13, marginTop: 32 }}>thesandwichproject.org</p>
        </div>
      )}
    </div>
  );
}
