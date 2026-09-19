import Hero from "@/components/content/Hero";
import MetricsBar from "@/components/content/MetricsBar";
import SectionHeading from "@/components/content/SectionHeading";
import Card from "@/components/content/Card";
import CtaBand from "@/components/content/CtaBand";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import JourneyTimeline from "@/components/about/JourneyTimeline";
import TeamGrid from "@/components/about/TeamGrid";

const MODULES = [
  {
    title: "Inventory & Warehousing",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=400&auto=format&fit=crop",
    points: ["Multi-branch stock tracking", "Batch & expiry logs", "Reorder automation", "Stock takes"]
  },
  {
    title: "Sales & POS",
    image:
      "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=400&auto=format&fit=crop",
    points: ["Touch POS", "Quotations & orders", "M-Pesa, card, cash validation", "Loyalty & gift cards"]
  },
  {
    title: "Finance & Accounting",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop",
    points: ["GL, AP, AR", "Bank reconciliation", "Multi-currency", "eTIMS-ready VAT"]
  },
  {
    title: "HR & Payroll",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=400&auto=format&fit=crop",
    points: ["PAYE, NSSF, NHIF, SHIF", "Loans & advances", "Performance", "Self-service portal"]
  },
  {
    title: "CRM & Service",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
    points: ["Pipeline", "Contracts", "Tickets", "Field service"]
  },
  {
    title: "Manufacturing",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400&auto=format&fit=crop",
    points: ["BOM", "Work orders", "MRP", "Job costing"]
  }
];

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About us"
        heading="A Kenyan ERP company, built for Kenyan business"
        description="We started Daltar in 2014 to give local businesses world-class operations software — without the world-class price tag."
        actions={
          <>
            <Button href="https://wa.me/254700000000" variant="whatsapp" external>
              Talk to Sales
            </Button>
            <Button href="#modules" variant="secondary">
              View Products
            </Button>
          </>
        }
        image={{
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
          alt: "Daltar Operations Hub, Nairobi, Kenya"
        }}
      />

      <MetricsBar
        metrics={[
          { value: "2014", label: "Established" },
          { value: "300+", label: "Businesses Powered" },
          { value: "47", label: "Counties Covered" },
          { value: "100%", label: "eTIMS Ready" }
        ]}
      />

      <section className="py-20">
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-daltar-accent-blue">
              Our story
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-daltar-text-bright">
              From a single till to 300+ businesses
            </h2>
            <p className="mt-4 text-[14.5px] text-daltar-text-muted">
              What began as a setup for a single supermarket has grown into a complete ERP suite
              trusted across retail, hospitality, distribution, and services.
            </p>
            <p className="mt-4 text-[14.5px] text-daltar-text-muted">
              We&apos;re an in-country team — every implementation, training session, and support
              call is handled by people who understand local compliance, M-Pesa metrics, KRA
              structures, and how Kenyan workflows really operate.
            </p>
            <p className="mt-4 text-[14.5px] text-daltar-text-muted">
              Our promise is simple: practical software, honest pricing, and people who pick up
              the phone.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl border border-daltar-border shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop"
              alt="Daltar system configuration in a retail setting"
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <JourneyTimeline />

      <section id="modules" className="py-20">
        <Container>
          <SectionHeading eyebrow="Feature map" heading="Every module, in one place" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((module) => (
              <Card
                key={module.title}
                image={module.image}
                imageAlt={module.title}
                title={module.title}
                description={
                  <ul className="space-y-1">
                    {module.points.map((point) => (
                      <li key={point}>&bull; {point}</li>
                    ))}
                  </ul>
                }
              />
            ))}
          </div>
        </Container>
      </section>

      <TeamGrid />

      <CtaBand
        heading="Ready to transform your business?"
        description="Talk to a Daltar specialist and get a tailored quote within 24 hours."
      >
        <Button href="https://wa.me/254700000000" variant="whatsapp" external>
          Talk to Sales
        </Button>
        <Button href="#modules" variant="secondary">
          View Products
        </Button>
      </CtaBand>
    </>
  );
}
