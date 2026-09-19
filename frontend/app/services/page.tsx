import Container from "@/components/ui/Container";
import Card from "@/components/content/Card";
import SectionHeading from "@/components/content/SectionHeading";
import MetricsBar from "@/components/content/MetricsBar";
import CtaBand from "@/components/content/CtaBand";
import Button from "@/components/ui/Button";
import ServicesHero from "@/components/services/ServicesHero";
import QuickJumpFilterBar from "@/components/services/QuickJumpFilterBar";
import CapabilityCard from "@/components/services/CapabilityCard";
import SbaSpotlight from "@/components/services/SbaSpotlight";
import ImplementationRoadmap from "@/components/services/ImplementationRoadmap";

const PRIMARY_SERVICES = [
  {
    title: "POS Setup & Installation",
    description:
      "Tills, scanners, printers, and integrated merchant hardware configurations wired securely across one or many branches.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Cataloging & Data Migration",
    description:
      "Clean product master listings, barcodes, complex pricing matrices, and initial opening stock setups — completely ready for go-live operations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
  },
  {
    title: "Ongoing Support",
    description:
      "Dedicated WhatsApp groups, direct phone lines, and on-site engineer deployment protocols backed by firm SLA response timelines.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
  }
];

const CAPABILITIES = [
  {
    icon: "\u{1F527}",
    title: "Hardware Lifecycle Management",
    description:
      "Staging, installation, preventative maintenance sweeps, and proactive hot-swaps under strict tier-1 corporate SLA provisions.",
    checklist: [
      "All industry brands accepted",
      "Transparent, upfront quotes first",
      "Flexible on-site or workshop repair"
    ],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Hardware repair workshop"
  },
  {
    icon: "\u{1F5A5}\u{FE0F}",
    title: "ERP Systems Integration",
    description:
      "Synchronizing decentralized field terminal hardware directly with local back-office data engines and KRA tax validation points.",
    checklist: [
      "KRA eTIMS API integrations",
      "Live inventory control pipelines",
      "Multi-terminal synchronization"
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
    imageAlt: "ERP systems dashboard"
  },
  {
    icon: "\u{1F4F6}",
    title: "Structural Network Engineering",
    description:
      "Deploying dedicated, failure-resistant communication links to ensure remote corporate nodes maintain continuous database access.",
    checklist: [
      "Secure CAT6 & Managed Wi-Fi",
      "Failover backup links",
      "Coverage deployment across 47 counties"
    ],
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Network infrastructure hardware"
  }
];

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <QuickJumpFilterBar />

      <section className="py-16">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            {PRIMARY_SERVICES.map((service) => (
              <Card
                key={service.title}
                image={service.image}
                imageAlt={service.title}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <SectionHeading eyebrow="Our Capabilities" heading="Managed Infrastructure Systems" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </div>
        </Container>
      </section>

      <SbaSpotlight />

      <ImplementationRoadmap />

      <div className="pb-20">
        <Container>
          <MetricsBar
            metrics={[
              { value: "24/7", label: "Support Response" },
              { value: "47", label: "Counties Covered" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "7+", label: "Services Offered" },
              { value: "All", label: "Brands Serviced" }
            ]}
            className="rounded-xl border-y-0 border border-daltar-border"
          />
        </Container>
      </div>

      <CtaBand
        heading="Ready to transform your business?"
        description="Talk to a Daltar Kenya specialist and get a tailored infrastructure operational quote within 24 hours."
      >
        <Button href="https://wa.me/254700000000" variant="whatsapp" external>
          Talk to Sales
        </Button>
        <Button href="/#sba-erp" variant="secondary">
          View Products
        </Button>
      </CtaBand>
    </>
  );
}
