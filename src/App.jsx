import { useState, useEffect, useRef } from "react";
import coldChainMaker from "./assets/cold-chain-maker.jpeg";
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
        <KeyTakeaway>This takes about 10 minutes. You'll learn everything you need to volunteer safely.</KeyTakeaway>
        <CalloutBox type="teal" title="Who We Are">
          <strong>The Sandwich Project</strong> is a volunteer-powered 501(c)(3) nonprofit in Metro Atlanta. Since 2020: <strong>25,000+ volunteers</strong> and <strong>2.3 million sandwiches</strong> delivered to neighbors experiencing food insecurity.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "How It Works",
    content: (
      <div>
        <KeyTakeaway>Three roles. One chain. Every week.</KeyTakeaway>
        {[
          { num: "1", role: "Sandwich Makers", desc: "Buy → assemble at home → deliver to a host" },
          { num: "2", role: "Hosts", desc: "Collect from makers → refrigerate → pack coolers for drivers" },
          { num: "3", role: "Drivers", desc: "Pick up from hosts → deliver to nonprofits" },
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
        <KeyTakeaway>The people we serve include children, the elderly, and immunocompromised individuals. They're counting on us to get this right.</KeyTakeaway>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, fontSize: 14, marginBottom: 4 }}>
          Every step matters — from what you buy to how you store and deliver it. <strong>The ingredients you use and the sandwiches you make should be the same quality you would feed yourself and your own family.</strong>
        </p>
        <CalloutBox type="gold" title="The Golden Rule">
          <strong>When in doubt, throw it out.</strong><br/>Perishable food can make people sick even if it looks, smells, and tastes fine. 
        </CalloutBox>
      </div>
    ),
  },
];

const FOOD_SAFETY_STEPS = [
  {
    title: "The Cold Chain: Steps 1–3",
    content: (
      <div>
        <KeyTakeaway>The cold chain is how we keep sandwiches safe from store to delivery — 9 steps, one goal.</KeyTakeaway>
        <img src={coldChainMaker} alt="The Sandwich Project Cold Chain: 9 steps from store to recipient" style={{ width: "80%", display: "block", margin: "0 auto 20px", borderRadius: 10, opacity: 0.92 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Steps 1–3: Shopping &amp; Storage</div>
        <NumberedSteps steps={[
          <><strong>Store purchase.</strong> Grab meat and cheese last, right before checkout — don't let them sit in your cart while you shop for other items.</>,
          <><strong>Car with cooler + ice packs.</strong> Bring a cooler with ice packs to the store. Put the meat and cheese straight in on your way home.</>,
          <><strong>Volunteer's home fridge.</strong> When you get home, move meat and cheese from the cooler into your fridge immediately.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "The Cold Chain: Steps 4–6",
    content: (
      <div>
        <KeyTakeaway>Assembly is where most warm time happens — keep it quick.</KeyTakeaway>
        <img src={coldChainMaker} alt="The Sandwich Project Cold Chain: 9 steps from store to recipient" style={{ width: "80%", display: "block", margin: "0 auto 20px", borderRadius: 10, opacity: 0.92 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Steps 4–6: Assembly &amp; Delivery Prep</div>
        <NumberedSteps start={4} steps={[
          <><strong>Quick prep.</strong> Only take out as much meat and cheese as you need for one loaf of sandwiches at a time. Take it out right before you assemble.</>,
          <><strong>Assembled back to fridge.</strong> After bagging sandwiches and putting them back in the loaf bag with a twist tie, place the loaf back in the fridge. Let them cool at least 30 minutes before going into a cooler for delivery.</>,
          <><strong>Refrigerated to cool cooler in car.</strong> When it's time to deliver, move loaves from the fridge straight into a cooler with ice packs in your car. Make sure the cooler isn't hot from sitting outside or in a warm garage.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "The Cold Chain: Steps 7–9",
    content: (
      <div>
        <KeyTakeaway>The final handoffs — your part ends at the host's fridge.</KeyTakeaway>
        <img src={coldChainMaker} alt="The Sandwich Project Cold Chain: 9 steps from store to recipient" style={{ width: "80%", display: "block", margin: "0 auto 20px", borderRadius: 10, opacity: 0.92 }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Steps 7–9: Handoff &amp; Delivery</div>
        <NumberedSteps start={7} steps={[
          <><strong>Host home fridge.</strong> Drive straight to your host. Sign in, apply TSP-provided labels to your loaves, and get them into the host's fridge quickly.</>,
          <><strong>Cool cooler to driver's car.</strong> After that, it's out of your hands! The host keeps the fridge door shut as much as possible until the driver arrives, then packs the loaves into another cooler with ice packs.</>,
          <><strong>Recipient's refrigerator.</strong> The driver heads straight to the recipient organization, who transfers sandwiches into their own refrigerator immediately.</>,
        ]} />
        <p style={{ color: MUTED, fontSize: 13, fontStyle: "italic", marginTop: 12 }}>Your care at steps 1–7 is what makes steps 8–9 possible.</p>
      </div>
    ),
  },
  {
    title: "Three Numbers to Know",
    content: (
      <div>
        <KeyTakeaway>Three key temperature thresholds to keep in mind.</KeyTakeaway>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: TEAL_WASH, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${TEAL}33` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: TEAL, fontFamily: "Georgia, serif", minWidth: 90 }}>34–38°F</div>
            <div>
              <div style={{ fontWeight: 700, color: TEAL_DARK, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Target</div>
              <div style={{ color: BODY_COLOR, fontSize: 14 }}>Keep your fridge here</div>
            </div>
          </div>
          <div style={{ background: GOLD_LIGHT, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${GOLD}33` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: GOLD_DARK, fontFamily: "Georgia, serif", minWidth: 90 }}>39°F</div>
            <div>
              <div style={{ fontWeight: 700, color: GOLD_DARK, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Caution</div>
              <div style={{ color: BODY_COLOR, fontSize: 14 }}>Above this, the 2-hour clock starts</div>
            </div>
          </div>
          <div style={{ background: RED_LIGHT, borderRadius: 10, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${RED}33` }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: RED, fontFamily: "Georgia, serif", minWidth: 90 }}>80°F+</div>
            <div>
              <div style={{ fontWeight: 700, color: RED, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Toss It</div>
              <div style={{ color: BODY_COLOR, fontSize: 14 }}>Throw it out immediately — no exceptions</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "The Two-Hour Rule",
    content: (
      <div>
        <KeyTakeaway>Deli meat gets 2 hours total above 39°F — across ALL steps combined. Not per step.</KeyTakeaway>
        <CalloutBox type="critical" title="This Is Cumulative">
          <strong>2 hours total.</strong> Shopping + assembly + transport + handoffs. Every minute above 39°F counts toward that limit.
        </CalloutBox>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, marginTop: 12, fontSize: 14 }}>
          Plan your shopping, assembly, and transport to minimize warm time.
        </p>
      </div>
    ),
  },
  {
    title: "Fridge Tips",
    content: (
      <div>
        <KeyTakeaway>A few easy habits keep your fridge working effectively and your ingredients and sandwiches safe.</KeyTakeaway>
        <BulletList items={[
          <><strong>Don't overfill.</strong> Overpacked fridge blocks air flow creating warm spots, even if the thermometer reads fine.</>,
          <><strong>Minimize door openings.</strong> Cold air escapes fast. In and out quickly.</>,
          <><strong>Last minute trick:</strong> If you need to deliver your sandwiches soon, place twist tied loaf bags in the freezer for 10-15 minutes to get them cold before moving them to the cooler.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Cooler Rules",
    content: (
      <div>
        <KeyTakeaway>Coolers maintain cold — they don't create it. Only pack food that's already fridge-cold.</KeyTakeaway>
        <BulletList items={[
          <><strong>Put coolers in your vehicle cabin where the A/C can circulate, not the trunk.</strong> A/C doesn't reach the trunk.</>,
          <><strong>Layer ice packs</strong> between loaves and at the sides of the cooler so all loaves are in contact with them.</>,
          <><strong>Pack tight.</strong> Less air in a cooler makes it more effective at insulation.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "More Cooler Tips",
    content: (
      <div>
        <KeyTakeaway>Two more things that trip will ensure your sandwiches are safe and chilly.</KeyTakeaway>
        <BulletList items={[
          <><strong>Keep lids sealed.</strong> Every opening lets cold air out and warm air in.</>,
          <><strong>Hot cooler?</strong> Bring it inside to cool down before packing. Never pack a warm cooler.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Hygiene: Steps 1 & 2",
    content: (
      <div>
        <KeyTakeaway>These two steps come first, every time.</KeyTakeaway>
        <NumberedSteps steps={[
          <><strong>Hair first</strong> — tie back, hat, or hairnet.</>,
          <><strong>Wash hands</strong> — soap & water, 20+ seconds. Sanitizer is <em>not</em> a substitute.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Hygiene: Steps 3 & 4",
    content: (
      <div>
        <NumberedSteps steps={[
          <><strong>Glove up</strong> — change if you touch your face, phone, or anything non-food.</>,
          <><strong>Clean surfaces</strong> — wipe everything food will touch. Use a disposable tablecloth.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "A Common Mistake",
    content: (
      <div>
        <KeyTakeaway>Re-cooling doesn't undo bacterial growth. Once damage is done, it's done.</KeyTakeaway>
        <CalloutBox type="critical" title="This Catches People Off Guard">
          If food sat out too long, putting it back in the fridge <strong>won't fix it</strong>. Bacteria already grew. The cold just slows <em>new</em> growth.
        </CalloutBox>
        <CalloutBox type="gold" title="The Rule">
          <strong>When in doubt, throw it out.</strong> Always.
        </CalloutBox>
      </div>
    ),
  },
];

const MAKER_STEPS = [
  {
    title: "Shopping: What to Buy",
    content: (
      <div>
        <KeyTakeaway>The cold chain starts at the store. Here's what to grab.</KeyTakeaway>
        <BulletList items={[
          <><strong>Prepackaged deli meat & cheese only</strong> — no deli counter slicing.</>,
          <><strong>Check dates:</strong> at least 7 days past your drop-off.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Shopping: Getting It Home",
    content: (
      <div>
        <KeyTakeaway>Cold items need to stay cold from the moment you buy them.</KeyTakeaway>
        <BulletList items={[
          <><strong>Bring a cooler with ice packs</strong> to the store for the drive home.</>,
          <><strong>Into the fridge within 30 minutes</strong> of purchase.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Storage at a Glance",
    content: (
      <div>
        <KeyTakeaway>Quick reference for how long things last.</KeyTakeaway>
        <InfoGrid rows={[
          ["Opened deli meat", "Use within 3 days"],
          ["Unopened deli meat & cheese", "Within 2 weeks of purchase"],
          ["Bread", "Room temp — check for mold"],
          ["Peanut butter & jelly", "Shelf-stable — check expiration"],
        ]} />
      </div>
    ),
  },
  {
    title: "Timing",
    content: (
      <div>
        <KeyTakeaway>Make on Wednesday (or Tuesday evening). Deliver to your host within 24 hours.</KeyTakeaway>
        <CalloutBox type="teal" title="The Window">
          Sandwiches must go from your kitchen to your host's fridge <strong>within 24 hours</strong> of assembly.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "PB&J: The Spread",
    content: (
      <div>
        <KeyTakeaway>Use jelly, not jam. Here are the exact amounts.</KeyTakeaway>
        <RecipeCard title="PB&J Sandwiches" subtitle="Per sandwich">
          <NumberedSteps steps={[
            <><strong>1 tbsp peanut butter</strong> on one slice.</>,
            <><strong>2 tbsp peanut butter</strong> on the other slice.</>,
            <><strong>2 tsp jelly</strong> on top of the 2-tbsp side.</>,
          ]} />
        </RecipeCard>
      </div>
    ),
  },
  {
    title: "PB&J: Finishing Up",
    content: (
      <div>
        <KeyTakeaway>Press, don't cut. Bag individually.</KeyTakeaway>
        <BulletList items={[
          <>Press slices together. <strong>Don't cut.</strong></>,
          <>Bag individually in a zip-top bag. Press out air.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Deli: Building the Sandwich",
    content: (
      <div>
        <KeyTakeaway>Three ingredients: bread, meat, and cheese.</KeyTakeaway>
        <RecipeCard title="Deli Sandwiches" subtitle="Per sandwich">
          <NumberedSteps steps={[
            <>Two slices of bread.</>,
            <><strong>Minimum 2 oz deli meat.</strong></>,
            <><strong>2 slices of cheese</strong> — one on each side.</>,
          ]} />
        </RecipeCard>
      </div>
    ),
  },
  {
    title: "Deli: No Extras",
    content: (
      <div>
        <KeyTakeaway>Don't cut. Bag individually. And absolutely nothing extra.</KeyTakeaway>
        <CalloutBox type="critical" title="No Extras">
          <strong>No condiments or vegetables</strong> — they speed up spoilage during transport.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Packaging: Batches",
    content: (
      <div>
        <KeyTakeaway>Work in batches. Only one package of meat/cheese out at a time.</KeyTakeaway>
        <BulletList items={[
          <>Bag each sandwich individually in a zip-top bag.</>,
          <>Refrigerate the rest while you work.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Packaging: Loaf Bags",
    content: (
      <div>
        <KeyTakeaway>Group sandwiches into loaf bags. Keep PB&J and deli separate.</KeyTakeaway>
        <BulletList items={[
          <>Group bagged sandwiches into bread loaf bags — <strong>PB&J and deli separate.</strong></>,
          <>Close loaf bags with twist ties.</>,
          <>You do <strong>not</strong> need to label — your host provides labels.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Transport",
    content: (
      <div>
        <KeyTakeaway>Start with fridge-cold sandwiches and head straight to your host.</KeyTakeaway>
        <BulletList items={[
          <><strong>Fridge-cold first.</strong> Coolers maintain cold — they don't create it.</>,
          <><strong>Ice packs</strong> layered between loaves.</>,
          <><strong>Cabin, not trunk.</strong></>,
          <><strong>Drive direct.</strong> No stops, no errands.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Finding a Host",
    content: (
      <div>
        <KeyTakeaway>Use the Host Finder to get matched with a nearby host.</KeyTakeaway>
        <CalloutBox type="teal" title="Host Finder">
          Go to <strong>thesandwichproject.org</strong> to find a host near you. You can switch hosts anytime — no commitment.
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
          { q: "Can I use deli counter meat?", a: "No. Prepackaged only — clearer expiration tracking and controlled processing." },
          { q: "What if I can't deliver by Thursday?", a: "No worries — just skip that week. It's better to wait than to deliver sandwiches that sat too long." },
        ]} />
      </div>
    ),
  },
];

const HOST_STEPS = [
  {
    title: "Your Role",
    content: (
      <div>
        <KeyTakeaway>You're the hub between makers and drivers — connecting the whole chain together.</KeyTakeaway>
        <CalloutBox type="gold" title="You're Not Alone">
          You'll be on a <strong>team with a lead host</strong> — your go-to for questions, scheduling, and troubleshooting. TSP trains you before your first collection.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "What You'll Need",
    content: (
      <div>
        <KeyTakeaway>TSP provides the gear. You provide the fridge and space.</KeyTakeaway>
        <InfoGrid rows={[
          ["TSP Provides", "You Provide"],
          ["Coolers & ice packs", "Dedicated fridge at 34\u201338\u00B0F"],
          ["TSP yard sign", "Clean collection area"],
          ["Sign-in sheets & labels", ""],
          ["Web app access", ""],
        ]} header />
        <CalloutBox type="gold" title="Web App">
          Your lead will set you up before your first day. <strong>thesandwichproject.org</strong> &rarr; "Core Team Access."
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Prep Your Fridge",
    content: (
      <div>
        <KeyTakeaway>Your fridge is your most important tool. Prep it before each collection.</KeyTakeaway>
        <BulletList items={[
          <><strong>Clean it out.</strong> Remove personal food to maximize space.</>,
          <><strong>Check temp: 34–38°F.</strong> Worth a quick check before collection day.</>,
          <><strong>Leave room for airflow.</strong> Overpacked = warm spots.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Prep Your Space",
    content: (
      <div>
        <KeyTakeaway>Keep the area around your fridge clean and safe.</KeyTakeaway>
        <BulletList items={[
          <><strong>Keep the area clean.</strong> No strong odors, no clutter.</>,
          <><strong>Off the floor.</strong> Away from pets, trash, chemicals.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Collection Day: Setup",
    content: (
      <div>
        <KeyTakeaway>Get your station ready before makers start arriving.</KeyTakeaway>
        <NumberedSteps steps={[
          <>Set out donation bin for fruit/snack collections.</>,
          <>Set up sign-in station: sheets, labels (deli & PB&J separate), pens.</>,
          <>Put out TSP yard sign.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Receiving: Sign-In",
    content: (
      <div>
        <KeyTakeaway>Greet warmly — it keeps makers coming back.</KeyTakeaway>
        <BulletList items={[
          <>Sign in + record sandwich count & contact info.</>,
          <>Have them label sandwiches with host-provided labels.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Receiving: Quality Check",
    content: (
      <div>
        <KeyTakeaway>Every sandwich gets a quick check before it goes in the fridge.</KeyTakeaway>
        <BulletList items={[
          <><strong>Sealed?</strong> Bags closed, no tears.</>,
          <><strong>Labeled?</strong> Correct label applied.</>,
          <><strong>Cold to the touch?</strong> Must feel fridge-cold.</>,
          <>Made no earlier than <strong>Tuesday evening.</strong></>,
        ]} />
      </div>
    ),
  },
  {
    title: "Collection Day: Storing",
    content: (
      <div>
        <KeyTakeaway>Refrigerate immediately. PB&J and deli stay separate.</KeyTakeaway>
        <BulletList items={[
          <><strong>Refrigerate right away.</strong> Minimize fridge door time.</>,
          <><strong>PB&J and deli separate</strong> — they'll go in different coolers for transport.</>,
        ]} />
        <CalloutBox type="critical" title="Allergy Warning">
          TSP sandwiches are <strong>not safe for anyone with food allergies</strong> — due to ingredients and shared prep environments.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Thursday: Packing Coolers",
    content: (
      <div>
        <KeyTakeaway>Pack coolers for your driver. Almost there!</KeyTakeaway>
        <BulletList items={[
          <><strong>Hot cooler?</strong> Cool it inside first. Never pack a warm cooler.</>,
          <><strong>Confirm under 39°F</strong> before packing.</>,
          <><strong>Ice packs:</strong> layer between loaves and on top.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Thursday: Final Check",
    content: (
      <div>
        <KeyTakeaway>Quick checklist before the driver arrives.</KeyTakeaway>
        <BulletList items={[
          <><strong>Pack tight</strong> — less air = stays colder.</>,
          <>Work in shade. Keep lids closed between loads.</>,
        ]} />
        <CalloutBox type="teal" title="Before Handoff">
          Sealed? Labeled? Cold to the touch? Loaf bags closed with twist ties?
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Quality Issues: Fixable",
    content: (
      <div>
        <KeyTakeaway>Some issues are easy fixes. Handle it gracefully.</KeyTakeaway>
        <BulletList items={[
          <><strong>Torn bags &rarr;</strong> transfer to a new bag if wrappers are intact.</>,
          <><strong>Missing labels &rarr;</strong> ask them to label. Confirm made within 24 hours.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Quality Issues: Not Fixable",
    content: (
      <div>
        <KeyTakeaway>Some sandwiches can't be accepted — and that's okay.</KeyTakeaway>
        <BulletList items={[
          <><strong>Warm / spoiled / messy &rarr;</strong> can't accept. "We can only take sandwiches that are cold to the touch."</>,
        ]} />
        <CalloutBox type="teal" title="If You're Unsure About a Sandwich">
          Just set it aside and mark <strong>"DO NOT USE"</strong> with a note (WARM, OPEN BAG, etc.). Then check with your lead host.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Cleaning: Fridge & Coolers",
    content: (
      <div>
        <KeyTakeaway>A quick cleanup keeps everything ready for next time.</KeyTakeaway>
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, fontSize: 14 }}>Fridge</p>
        <BulletList items={[
          <>Wipe down regularly. Keep personal food separate.</>,
        ]} />
        <p style={{ fontWeight: 700, color: DARK, marginBottom: 10, marginTop: 16, fontSize: 14 }}>Coolers</p>
        <BulletList items={[
          <>Soap + warm water after each use. Air-dry fully.</>,
          <><strong>TSP coolers = TSP sandwiches only.</strong></>,
        ]} />
      </div>
    ),
  },
  {
    title: "Monthly Schedules",
    content: (
      <div>
        <KeyTakeaway>Let your team know when you're unavailable.</KeyTakeaway>
        <p style={{ color: BODY_COLOR, lineHeight: 1.65, fontSize: 14 }}>
          A team member sends a Google Form monthly. Fill it out so your team can plan around absences. Remind your makers to subscribe to the weekly newsletter.
        </p>
      </div>
    ),
  },
  {
    title: "Host FAQs",
    content: (
      <div>
        <FAQList items={[
          { q: "What if a volunteer brings warm sandwiches?", a: "It happens! Sandwiches need to be cold to the touch. Set aside questionable ones, mark 'DO NOT USE,' and check with your lead." },
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
        <KeyTakeaway>You're the final step — getting sandwiches safely to the people who need them.</KeyTakeaway>
        <CalloutBox type="teal" title="Before Your First Delivery">
          <strong>Sign the Vehicle Release Form.</strong> Haven't received one? Contact Jordan (Driver Coordinator) at <strong>770-789-7329</strong>.
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Before Loading",
    content: (
      <div>
        <KeyTakeaway>Pre-cool your car. Confirm everything is cold before it goes in.</KeyTakeaway>
        <BulletList items={[
          <><strong>Run the A/C</strong> before loading anything.</>,
          <><strong>Quick temp check</strong> — sandwiches should be under 39°F. If they feel warm, just give the host a call.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Packing the Cooler",
    content: (
      <div>
        <KeyTakeaway>Ice packs everywhere. Pack it tight.</KeyTakeaway>
        <BulletList items={[
          <><strong>Layer ice packs</strong> between loaves and on top.</>,
          <><strong>Pack tight</strong> — less air space = colder longer.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "On the Road",
    content: (
      <div>
        <KeyTakeaway>Keep coolers in the cabin and head straight to your destination.</KeyTakeaway>
        <BulletList items={[
          <><strong>Cabin, not trunk.</strong> A/C doesn't reach the trunk.</>,
          <><strong>Drive direct.</strong> No stops, no errands.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "On Arrival",
    content: (
      <div>
        <KeyTakeaway>Get sandwiches into a fridge immediately.</KeyTakeaway>
        <BulletList items={[
          <><strong>Refrigerate immediately</strong> when you arrive.</>,
          <><strong>Running late?</strong> Call the recipient org right away.</>,
        ]} />
      </div>
    ),
  },
  {
    title: "Mistakes to Avoid",
    content: (
      <div>
        <KeyTakeaway>A few things to watch out for.</KeyTakeaway>
        <CalloutBox type="critical" title="Don't Forget">
          <BulletList items={[
            <><strong>Never leave coolers in a parked car.</strong> Temps spike fast.</>,
            <><strong>Warm sandwiches?</strong> Fridge first — coolers maintain, don't chill.</>,
            <><strong>Lids stay sealed.</strong> Every opening = cold air lost.</>,
          ]} />
        </CalloutBox>
      </div>
    ),
  },
  {
    title: "Delivery & Reporting",
    content: (
      <div>
        <KeyTakeaway>We deliver to 501(c)(3) nonprofits — this is a legal requirement for the organization.</KeyTakeaway>
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
          { q: "What if a location looks unsanitary?", a: "Call Marcy. Also flag if they're not refrigerating on arrival or lack cooling capacity." },
        ]} />
      </div>
    ),
  },
];

const CONTACTS = {
  title: "You're All Set!",
  content: (
    <div>
      <KeyTakeaway>Questions? Here's who to call.</KeyTakeaway>
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
        <p style={{ fontSize: 14, color: BODY_COLOR }}><strong>Web App:</strong> thesandwichproject.org &rarr; "Core Team Access"</p>
      </div>
      <CalloutBox type="gold" title="Why We Do This">
        Dignity. Nourishment. <strong>Meeting people where they are.</strong>
      </CalloutBox>
    </div>
  ),
};

// ─── Reusable Components ────────────────────────────────────────

function KeyTakeaway({ children }) {
  return (
    <div style={{ background: `linear-gradient(135deg, ${TEAL}0A, ${TEAL}05)`, borderRadius: 10, padding: "14px 18px", marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start", border: `1.5px solid ${TEAL}22` }}>
      <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.4 }}>&#x1F4A1;</span>
      <div style={{ color: TEAL_DARK, fontSize: 15, fontWeight: 600, lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

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

function NumberedSteps({ steps, start = 1 }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", background: "white", borderRadius: 10, padding: "16px 18px", border: `1.5px solid ${TEAL}33`, boxShadow: `0 1px 4px ${TEAL}0A` }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: TEAL, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{start + i}</div>
          <div style={{ color: BODY_COLOR, fontSize: 15, lineHeight: 1.65 }}>{step}</div>
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
  maker: { label: "Sandwich Maker", emoji: "\u{1F96A}", color: TEAL, steps: MAKER_STEPS, desc: "Shopping, storage, assembly, and transport" },
  host: { label: "Host", emoji: "\u{1F3E0}", color: GOLD_DARK, steps: HOST_STEPS, desc: "Collection, quality checks, delivery prep" },
  driver: { label: "Driver", emoji: "\u{1F697}", color: TEAL_DARK, steps: DRIVER_STEPS, desc: "Picking up, transporting, and delivering" },
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
                <div style={{ marginLeft: "auto", color: BORDER, fontSize: 20 }}>&rarr;</div>
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
          <span style={{ fontSize: 20 }}>{"\u{1F96A}"}</span>
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
      <div ref={contentRef} style={{ flex: 1, overflow: "auto", padding: "24px 20px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
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
                  {isPast && "\u2713 "}{labels[i]}
                </div>
              );
            })}
          </div>

          {/* Card */}
          <div style={{ background: "white", borderRadius: 14, padding: "44px 40px", boxShadow: `0 2px 12px ${TEAL}0A`, border: `1px solid ${BORDER}` }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 700, color: TEAL_DARK, marginBottom: 24, letterSpacing: -0.3 }}>
              {currentStep.title}
            </h2>
            {currentStep.content}
          </div>

          {/* Navigation */}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={prev}
              disabled={!canGoPrev}
              style={{ background: "none", border: `1px solid ${canGoPrev ? BORDER : "transparent"}`, borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, color: canGoPrev ? BODY_COLOR : "transparent", cursor: canGoPrev ? "pointer" : "default" }}
            >
              &larr; Back
            </button>
            {isContacts ? (
              <button
                onClick={() => setPhase(PHASES.complete)}
                style={{ background: GOLD, color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}
              >
                Complete &#10003;
              </button>
            ) : (
              <button
                onClick={next}
                style={{ background: TEAL, color: "white", border: "none", borderRadius: 8, padding: "10px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: `0 2px 8px ${TEAL}33` }}
                onMouseEnter={e => e.target.style.background = TEAL_DARK}
                onMouseLeave={e => e.target.style.background = TEAL}
              >
                Continue &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Complete overlay */}
      {phase === PHASES.complete && (
        <div style={{ position: "fixed", inset: 0, background: `linear-gradient(170deg, ${TEAL_WASH} 0%, white 50%, ${GOLD_LIGHT} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, zIndex: 20, textAlign: "center" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>{"\u{1F389}"}</div>
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
