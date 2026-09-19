import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";

interface WhyRow {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const ROWS: WhyRow[] = [
  {
    title: "One-stop IT hub",
    description:
      "ERP, POS, servers, network hardware, endpoint devices, and ongoing support from one accountable provider — no juggling multiple vendors.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Server room network hardware"
  },
  {
    title: "Tailored setup",
    description:
      "Configurations are mapped around your branches, payment habits, inventory movement, and reporting needs rather than a one-size-fits-all install.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Point of sale checkout counter"
  },
  {
    title: "Local support",
    description:
      "Direct WhatsApp, phone, remote help, and on-site support routes mean issues get resolved fast, not routed through an overseas queue.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Support technician assisting a client"
  },
  {
    title: "Kenya-ready",
    description:
      "M-Pesa, eTIMS-aware invoicing flows, payroll requirements, and multi-county deployment planning built in from day one.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop",
    imageAlt: "Business team reviewing reports"
  }
];

export default function WhyDaltarRows() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow="Why Daltar Kenya"
          heading="Built for practical operations, not just software demos."
          description="We combine business software, hardware deployment, field support, and local compliance knowledge into one accountable team."
        />
        <div className="flex flex-col gap-16">
          {ROWS.map((row, index) => {
            const imageBlock = (
              <div
                key="image"
                className="h-[240px] overflow-hidden rounded-xl border border-daltar-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
                <img src={row.image} alt={row.imageAlt} className="h-full w-full object-cover" />
              </div>
            );
            const textBlock = (
              <div key="text">
                <h3 className="text-xl font-bold text-daltar-text-bright">{row.title}</h3>
                <p className="mt-3 text-[14.5px] text-daltar-text-muted">{row.description}</p>
              </div>
            );
            const reversed = index % 2 === 1;

            return (
              <div key={row.title} className="grid items-center gap-10 lg:grid-cols-2">
                {reversed ? (
                  <>
                    {textBlock}
                    {imageBlock}
                  </>
                ) : (
                  <>
                    {imageBlock}
                    {textBlock}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
