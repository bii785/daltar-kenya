import CtaBand from "@/components/content/CtaBand";
import Button from "@/components/ui/Button";
import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustryTabs from "@/components/industries/IndustryTabs";
import VerticalBlock from "@/components/industries/VerticalBlock";
import CrossFoundationsStrip from "@/components/industries/CrossFoundationsStrip";

const VERTICALS = [
  {
    id: "restaurants",
    segmentLabel: "Segment Vertical 01",
    icon: "\u{1F374}",
    color: "#e8a020",
    title: "Restaurants & Quick Service",
    challenge:
      "Slow order tracking routines, incorrect order tickets reaching back kitchens, unauthorized transaction alterations, and inventory loss caused by unmonitored recipe portions.",
    solution:
      "A unified hospitality point-of-sale configuration linking client counters securely with inventory databases to achieve locked financial auditing controls automatically.",
    checklist: [
      "Touchscreen sales terminal rigs, high-speed receipt modules & laser scanner components.",
      "Full SBA Systems ERP integration loops to track warehouse quantities and ledger accounts.",
      "Instant payment integrations accepting automated M-Pesa push and card transactions.",
      "Digital Kitchen Display Systems (KDS) paired with rugged order execution printers."
    ],
    ctaLabel: "Request Restaurant Architecture Demo",
    media: {
      src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600",
      alt: "Restaurant hardware terminal setup"
    },
    metrics: [
      { label: "POS Deck", value: "Fully Integrated" },
      { label: "M-Pesa API", value: "Direct STK Push" },
      { label: "Assistance", value: "24/7 Priority Field" }
    ],
    reversed: false
  },
  {
    id: "hotels",
    segmentLabel: "Segment Vertical 02",
    icon: "\u{1F3E8}",
    color: "#38bdf8",
    title: "Hotels & Hospitality Lodgings",
    challenge:
      "Isolated registration systems, food and beverage tickets failing to reach checkout guest portfolios correctly, manual housekeeping schedules, and month-end auditing delays.",
    solution:
      "An enterprise Property Management Hub anchoring booking dashboards, room-readiness status, and dining terminal receipts into one unified operating framework.",
    checklist: [
      "Advanced room availability matrices handling check-in, check-out, and active reservations.",
      "Seamless food and beverage balance mapping straight to global room billing summaries.",
      "Integrated transaction workflows communicating instantly with KRA eTIMS API parameters.",
      "Card key connectivity channels configured side-by-side with guest safety monitors."
    ],
    ctaLabel: "Speak with a Hospitality Engineer",
    media: {
      src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600",
      alt: "Hotel PMS console layout"
    },
    metrics: [
      { label: "PMS Core", value: "Live Occupancy" },
      { label: "Folio Invoicing", value: "Unified Posting" },
      { label: "Tax Engine", value: "eTIMS Compliant" }
    ],
    reversed: true
  },
  {
    id: "golfclubs",
    segmentLabel: "Segment Vertical 03",
    icon: "\u26F3",
    color: "#27ae60",
    title: "Golf & Private Members Clubs",
    challenge:
      "Tracking cyclical membership subscription dues across diverse tiers, logging handicap points manually, and product variance inside detached member bar lounges.",
    solution:
      "A smart account interface linking pre-paid membership tokens, course entry rights, and bar transactions directly into central management software databases.",
    checklist: [
      "Dedicated SBA Systems club membership modules storing active account history profiles.",
      "Specialized pro-shop point-of-sale programs supporting multi-item inventory codes.",
      "Lounge card scanning devices providing balance updates to members instantly.",
      "Corporate fiber backbone systems routing connectivity out to perimeter gate access areas."
    ],
    ctaLabel: "Request Club Infrastructure Breakdown",
    media: {
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600",
      alt: "Clubhouse network terminal grid"
    },
    metrics: [
      { label: "Smart Card", value: "Prepaid Tracking" },
      { label: "Pro-Shop POS", value: "Live Asset Auditing" },
      { label: "Core Ledger", value: "Unified Statements" }
    ],
    reversed: false
  },
  {
    id: "bars",
    segmentLabel: "Segment Vertical 04",
    icon: "\u{1F379}",
    color: "#a855f7",
    title: "Bars, Lounges & Nightclubs",
    challenge:
      "Severe transaction speed blockages during high-traffic night shifts, unchecked bottle pour variances, and vulnerability to unlogged system changes or cash drawer opens.",
    solution:
      "Heavy-duty terminal architectures engineered to run fast under extreme conditions, secured by biometric keys and instant automated payment logs.",
    checklist: [
      "Splash-proof touchscreen sales terminals hosting clear high-contrast display panels.",
      "Advanced batch recipe trackers counting inventory changes down to exact measurements.",
      "Supervised access controls recording and auditing every single transaction modification.",
      "Secure terminal payment configurations that eliminate manual entry data mistakes entirely."
    ],
    ctaLabel: "Deploy Lounge Control Systems",
    media: {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600",
      alt: "High-speed lounge bar POS gear"
    },
    metrics: [
      { label: "Speed Form", value: "Multi-Terminal" },
      { label: "Pours", value: "Exact Milliliter Tracking" },
      { label: "Audits", value: "Zero Revenue Leakage" }
    ],
    reversed: true
  },
  {
    id: "smes",
    segmentLabel: "Segment Vertical 05",
    icon: "\u{1F3E2}",
    color: "#0ea5e9",
    title: "SMEs & General Retail Hubs",
    challenge:
      "Manually tracking product shelf expiration timelines, errors across client credit logs, and operating on slow, unstable computer setups.",
    solution:
      "Reliable commercial terminal configurations linking cost-efficient hardware with a single, stable stock-management registry system.",
    checklist: [
      "Desktop workspace setups, storage network servers, and reliable battery backups.",
      "Integrated SBA bookkeeping covering general corporate metrics and accounts.",
      "Automated alerts signaling stock lines dropping below target quantities.",
      "Simplified item-scanning interfaces built to maximize cashier speed."
    ],
    ctaLabel: "Get SME Package Pricing Details",
    media: {
      src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600",
      alt: "Retail SME system station bundle"
    },
    metrics: [
      { label: "Hardware", value: "Durable Bundles" },
      { label: "Core ERP", value: "Accounting Ready" },
      { label: "Scalable", value: "Multi-Location Ready" }
    ],
    reversed: false
  }
];

export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <IndustryTabs />

      {VERTICALS.map((vertical) => (
        <VerticalBlock key={vertical.id} {...vertical} />
      ))}

      <CrossFoundationsStrip />

      <CtaBand
        heading="Ready to Stabilize Your Operation Metrics?"
        description="Book a dedicated live system evaluation with our engineers today."
      >
        <Button href="https://wa.me/254700000000" variant="whatsapp" external>
          WhatsApp Us Now
        </Button>
        <Button href="/services" variant="primary">
          View Core Services
        </Button>
        <Button href="/#sba-erp" variant="secondary">
          Explore Products
        </Button>
      </CtaBand>
    </>
  );
}
