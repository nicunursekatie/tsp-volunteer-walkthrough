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
        <CalloutBox type="teal" title="Who We Are">
          <strong>The Sandwich Project</strong> is a 501(c)(3) volunteer-powered nonprofit in Metro Atlanta. Since 2020: <strong>25,000+ volunteers</strong> and <strong>2.3 million sandwiches</strong> delivered to neighbors experiencing food insecurity.
        </CalloutBox>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, fontSize: 15, marginTop: 12 }}>
          This walkthrough covers <strong>everything you need</strong> — takes about 10 minutes.
        </p>
      </div>
    ),
  },
  {
    title: "How It Works",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, marginBottom: 16, fontWeight: 600, fontSize: 15 }}>Three roles. One chain. Every week.</p>
        {[
          { num: "1", role: "Sandwich Makers", desc: "Buy ingredients → assemble at home → deliver to a host" },
          { num: "2", role: "Hosts", desc: "Collect from makers → refrigerate → pack coolers for drivers" },
          { num: "3", role: "Drivers", desc: "Pick up from hosts → deliver to 501(c)(3) organizations" },
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
        <CalloutBox type="critical" title="The Bottom Line">
          Home kitchens → multiple handoffs → people who are trusting us. Our standards have to be <strong>higher</strong>, not lower.
        </CalloutBox>
        <CalloutBox type="gold" title="The Golden Rule">
          <strong>When in doubt, throw it out.</strong><br/>A wasted sandwich is disappointing. A sandwich that makes someone sick is harmful.
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
        <CalloutBox type="teal" title="One Sentence">
          <strong>Your job is to keep your link in the cold chain intact.</strong> If any link breaks, the food may not be safe.
        </CalloutBox>
        <img src={coldChainDiagram} alt="The Sandwich Project Cold Chain: 1. Store purchase, 2. Car with cooler and ice packs, 3. Fridge at event, 4. Quick prep (one package meat/cheese per table), 5. Assembled back to fridge, 6. Refrigerated until driver arrives" style={{ width: "100%", borderRadius: 10, marginBottom: 20 }} />
        <CalloutBox type="critical" title="Know These Numbers">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: TEAL, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>TARGET</span>
              <span><strong>34–38°F</strong> — Keep your fridge here</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: RED, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>MAX SAFE</span>
              <span><strong>39°F</strong> — Absolute max for meat & cheese</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ background: RED, color: "white", padding: "3px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>TOSS IT</span>
              <span><strong>80°F+</strong> — If meat ever reaches this temp, throw it out immediately</span>
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
        <CalloutBox type="critical" title="This Is Cumulative">
          Deli meat gets <strong>2 hours total</strong> above 39°F — across <em>all</em> handoffs combined. Not 2 hours per step. <strong>2 hours total.</strong>
        </CalloutBox>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginTop: 16, fontSize: 14 }}>
          Every minute above 39°F counts. Plan your shopping, assembly, and transport to minimize warm time.
        </p>
      </div>
    ),
  },
  {
    title: "Refrigeration Tips",
    content: (
      <div>
        <BulletList items={[
          <><strong>Don't overfill.</strong> Overpacked fridge = warm spots, even if the thermometer looks fine.</>,
          <><strong>Minimize door openings.</strong> Cold air escapes every time. In and out quickly.</>,
          <><strong>Hot weather trick:</strong> Put sealed sandwich bags in the freezer for 15–20 min before moving to the fridge.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Cooler Rules",
    content: (
      <div>
        <CalloutBox type="teal" title="Key Concept">
          <strong>Coolers maintain cold — they don't create it.</strong> Only pack food that's already fridge-cold.
        </CalloutBox>
        <BulletList items={[
          <><strong>Cabin, not trunk.</strong> A/C doesn't reach the trunk.</>,
          <><strong>Layer ice packs</strong> between loaves and on top.</>,
          <><strong>Pack tightly</strong> — less air = stays colder longer.</>,
          <><strong>Keep lids sealed.</strong> Every opening lets cold air out.</>,
          <><strong>Hot cooler?</strong> Bring it inside to cool down before packing.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Hygiene",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>Every time. In this order.</p>
        <NumberedSteps steps={[
          <><strong>Hair first</strong> — tie back, hat, or hairnet.</>,
          <><strong>Wash hands</strong> with soap & water, 20+ seconds. Sanitizer is <em>not</em> a substitute — alcohol residue can transfer to gloves and food.</>,
          <><strong>Glove up</strong> — food-safe gloves for all handling. Change if you touch your face, phone, or anything non-food.</>,
          <><strong>Clean surfaces</strong> — wipe down everything food will touch. Cover your work surface with a disposable tablecloth.</>,
        ]} />
        <CalloutBox type="gold" title="Remember">
          <strong>Re-cooling doesn't undo bacterial growth.</strong> If food sat out too long, putting it back in the fridge won't fix it. When in doubt, throw it out.
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
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>You're the start of the cold chain.</p>
        <BulletList items={[
          <><strong>Prepackaged deli meat & cheese only</strong> — no deli counter slicing.</>,
          <><strong>Expiration dates:</strong> at least 7 days past your drop-off date.</>,
          <><strong>Bring a cooler with ice packs</strong> to the store for the drive home.</>,
          <><strong>Into the fridge within 30 minutes</strong> of purchase.</>,
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
          ["Bread", "Room temp — check for mold before use"],
          ["Peanut butter & jelly", "Shelf-stable — check expiration"],
        ]} />
      </div>
    ),
  },
  {
    title: "Timing",
    content: (
      <div>
        <CalloutBox type="teal" title="Assembly Window">
          <strong>Make on Wednesday or Tuesday evening.</strong><br/>Deliver to your host within 24 hours.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "PB&J Assembly",
    content: (
      <div>
        <RecipeCard title="PB&J Sandwiches" subtitle="Use jelly — not jam">
          <NumberedSteps steps={[
            <><strong>1 tbsp peanut butter</strong> on one slice.</>,
            <><strong>2 tbsp peanut butter</strong> on the other slice.</>,
            <><strong>2 tsp jelly</strong> on top of the 2-tbsp side.</>,
            <>Press together. <strong>Don't cut.</strong></>,
            <>Bag individually in a zip-top bag. Press out air.</>,
          ]} />
        </RecipeCard>
      </div>
    ),
  },
  {
    title: "Deli Sandwich Assembly",
    content: (
      <div>
        <RecipeCard title="Deli Sandwiches" subtitle="Bread + meat + cheese. That's it.">
          <NumberedSteps steps={[
            <>Two slices of bread.</>,
            <><strong>Minimum 2 oz deli meat.</strong></>,
            <><strong>2 slices of cheese</strong> — one on each side of the bread.</>,
            <><strong>Don't cut.</strong> Bag individually, press out air.</>,
          ]} />
          <CalloutBox type="critical" title="No Extras">
            <strong>No condiments. No vegetables. No exceptions.</strong> They accelerate spoilage in our transport chain.
          </CalloutBox>
        </RecipeCard>
      </div>
    ),
  },
  {
    title: "Packaging",
    content: (
      <div>
        <BulletList items={[
          <><strong>Work in batches</strong> — keep only one package of meat/cheese out at a time. Refrigerate the rest.</>,
          <>Bag each sandwich individually in a zip-top bag.</>,
          <>Group bagged sandwiches into bread loaf bags — <strong>PB&J and deli separate.</strong></>,
          <>Close loaf bags with twist ties.</>,
          <>You do <strong>not</strong> need to label — your host provides labels.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Transport & Host Selection",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, fontSize: 15 }}>Getting Sandwiches to Your Host</p>
        <BulletList items={[
          <><strong>Fridge-cold before the cooler.</strong> Coolers maintain — they don't chill.</>,
          <><strong>Ice packs</strong> layered between loaves.</>,
          <><strong>Cabin, not trunk.</strong></>,
          <><strong>Drive direct.</strong> No detours, no errands.</>,
        ]} />
        <CalloutBox type="gold" title="Choosing a Host">
          Use the <strong>Host Finder</strong> at <strong>thesandwichproject.org</strong>. You can switch hosts anytime.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Sandwich Maker FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "Can I add mustard, mayo, lettuce, or tomato?", a: "No. Bread, meat, and cheese only. Extras accelerate spoilage." },
          { q: "Can I use deli counter meat?", a: "No. Prepackaged only — it has clearer expiration tracking and controlled processing." },
          { q: "What if I can't deliver by Thursday?", a: "Don't make them. Fewer sandwiches is better than unsafe ones." },
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
        <CalloutBox type="teal" title="You're the Hub">
          You connect <strong>sandwich makers → drivers</strong>. Your quality checks are the last line of defense before delivery.
        </CalloutBox>
        <CalloutBox type="gold" title="You're Not Alone">
          You'll be on a <strong>team with a lead host</strong> — your go-to for questions, scheduling, and troubleshooting. TSP trains you before your first collection.
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
        <CalloutBox type="gold" title="Web App Access">
          Your lead will set you up before your first day. Go to <strong>thesandwichproject.org</strong> → "Core Team Access."
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Preparing Your Space",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>Your fridge is your most important tool. Before each collection:</p>
        <BulletList items={[
          <><strong>Clean it out.</strong> Remove personal food to maximize space.</>,
          <><strong>Check temp: 34–38°F.</strong> Don't assume — verify.</>,
          <><strong>Leave room for airflow.</strong> Overpacked = warm spots.</>,
          <><strong>Keep area clean</strong> — no strong odors, no clutter.</>,
          <><strong>Off the floor.</strong> Away from pets, trash, chemicals.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Wednesday: Collection Day",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, fontSize: 14 }}>Before Drop-Offs</p>
        <BulletList items={[
          <>Set out donation bin for fruit/snack collections.</>,
          <>Set up sign-in station: sheets, labels (deli & PB&J separate), pens.</>,
          <>Put out TSP yard sign.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 18, fontSize: 14 }}>As Volunteers Arrive</p>
        <BulletList items={[
          <><strong>Greet warmly</strong> — it keeps makers coming back.</>,
          <>Sign in + record sandwich count & contact info.</>,
          <>Have them label sandwiches with host-provided labels.</>,
          <><strong>Check: sealed? labeled? cold to the touch?</strong></>,
          <>Dates no earlier than Tuesday evening.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 18, fontSize: 14 }}>Storing</p>
        <BulletList items={[
          <>Refrigerate right away. Minimize fridge door time.</>,
          <><strong>PB&J and deli stay in separate coolers</strong> for transport.</>,
        ]} />
        <CalloutBox type="critical" title="Allergy Warning">
          TSP sandwiches are <strong>not safe for anyone with food allergies</strong> — ingredients and shared prep environments.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Thursday: Delivery Prep",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>Pack coolers for your driver. This is a critical handoff.</p>
        <BulletList items={[
          <><strong>Hot cooler?</strong> Bring it inside to cool first. Never pack a warm cooler.</>,
          <><strong>Confirm sandwiches are under 39°F</strong> before packing.</>,
          <><strong>Ice packs:</strong> layer between loaves and on top. Every loaf touches ice.</>,
          <><strong>Pack tight</strong> — less air = stays colder.</>,
          <>Work in shade. Keep doors/lids closed between loads.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 18, fontSize: 14 }}>Quick Checklist Before Handoff</p>
        <BulletList items={[
          <>Sealed? Labeled? Cold to the touch?</>,
          <>Loaf bags closed with twist ties?</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Handling Quality Issues",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>It happens. Handle it gracefully.</p>
        <BulletList items={[
          <><strong>Torn bags →</strong> transfer to a new bag if individual wrappers are intact.</>,
          <><strong>Missing labels →</strong> ask them to label. Confirm made within 24 hours.</>,
          <><strong>Warm / spoiled / messy →</strong> can't accept. Say: "We can only take sandwiches that are cold to the touch."</>,
        ]} />
        <CalloutBox type="teal" title="If Sandwiches Seem Unsafe">
          Set aside. Mark <strong>"DO NOT USE"</strong> + reason (WARM, OPEN BAG, etc.). Contact your lead host.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Cleaning & Schedules",
    content: (
      <div>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, fontSize: 14 }}>Fridge</p>
        <BulletList items={[
          <>Wipe down regularly. Personal food separate.</>,
          <>Minimize door-open time.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16, fontSize: 14 }}>Coolers</p>
        <BulletList items={[
          <>Soap + warm water after each use. Air-dry fully.</>,
          <><strong>TSP coolers = TSP sandwiches only.</strong> No raw meat, fish, etc.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16, fontSize: 14 }}>Monthly Schedules</p>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, fontSize: 14 }}>
          A team member sends a Google Form monthly for unavailable weeks. Remind your makers to subscribe to the weekly newsletter.
        </p>
      </div>
    ),
  },
  {
    title: "Host FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "What if a volunteer brings warm sandwiches?", a: "Awkward, but food safety wins. Sandwiches must be cold to the touch. Set aside questionable ones, mark 'DO NOT USE,' and check with your lead." },
          { q: "Can I use TSP coolers for personal use?", a: "No. Any cross-contamination is a safety issue. TSP coolers = TSP only." },
          { q: "What about leftover unopened ingredients?", a: "Accept unopened packages to donate. Discard any open meat." },
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
        <CalloutBox type="teal" title="You're the Final Link">
          You put sandwiches into the hands of the organizations that distribute them. If you keep the chain intact, <strong>nothing before you was wasted.</strong>
        </CalloutBox>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16, fontSize: 14 }}>Before Your First Delivery</p>
        <BulletList items={[
          <><strong>Sign the Vehicle Release Form.</strong></>,
          <>Haven't received one? Contact Jordan (Driver Coordinator) at <strong>770-789-7329</strong>.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Transport Protocol",
    content: (
      <div>
        <p style={{ color: BODY_COLOR, fontWeight: 600, marginBottom: 14, fontSize: 15 }}>Pre-cool your vehicle with A/C before loading. Then:</p>
        <NumberedSteps steps={[
          <><strong>Confirm cold</strong> — sandwiches under 39°F. If warm, don't transport. Call the host.</>,
          <><strong>Ice packs</strong> layered between loaves and on top.</>,
          <><strong>Pack tight</strong> — less air space = colder longer.</>,
          <><strong>Cabin, not trunk.</strong> A/C doesn't reach the trunk.</>,
          <><strong>Drive direct.</strong> No stops.</>,
          <><strong>Refrigerate immediately</strong> on arrival.</>,
          <><strong>Delays?</strong> Call the recipient org right away.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Critical Transport Rules",
    content: (
      <div>
        <CalloutBox type="critical" title="Don't Forget">
          <BulletList items={[
            <><strong>Never leave packed coolers in a parked car.</strong> Temps spike fast.</>,
            <><strong>Hot cooler?</strong> Cool it inside first.</>,
            <><strong>Warm sandwiches?</strong> They need the fridge first. Coolers maintain — they don't chill.</>,
            <><strong>Lids stay sealed.</strong> Every opening = cold air lost.</>,
            <><strong>TSP coolers = TSP sandwiches only.</strong></>,
          ]} />
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Delivery & Reporting",
    content: (
      <div>
        <CalloutBox type="teal" title="501(c)(3) Only">
          <strong>We only deliver to nonprofit organizations.</strong> This is a legal requirement. We can't give sandwiches directly to individuals.
        </CalloutBox>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16, fontSize: 14 }}>Report These to Marcy</p>
        <BulletList items={[
          <><strong>Unsafe conditions</strong> at the recipient location.</>,
          <><strong>No immediate refrigeration</strong> on arrival.</>,
          <><strong>Inadequate cooling capacity.</strong></>,
        ]} />
      </div>
    ),
  },
  {
    title: "Driver FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "Who do we deliver to?", a: "501(c)(3) nonprofits only. Legal requirement — no direct distribution to individuals." },
          { q: "What if a recipient location looks unsanitary?", a: "Call Marcy. Also flag if they're not refrigerating on arrival or lack cooling capacity." },
        ]} />
      </div>
    ),
  },
];

const CONTACTS = {
  title: "You're All Set!",
  content: (
    <div>
      <p style={{ fontWeight: 600, fontSize: 15, color: DARK, marginBottom: 16 }}>
        Questions? Here's who to call.
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
        <p style={{ fontSize: 14, color: BODY_COLOR }}><strong>Web App:</strong> thesandwichproject.org → "Core Team Access"</p>
      </div>
      <CalloutBox type="gold" title="Why We Do This">
        Dignity. Nourishment. <strong>Meeting people where they are.</strong>
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
