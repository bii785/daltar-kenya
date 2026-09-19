import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";

const INDUSTRIES = [
  {
    title: "Restaurants",
    description: "Fast orders, cleaner stock, controlled payments.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop",
    anchor: "/industries#restaurants"
  },
  {
    title: "Hotels",
    description: "Guest billing, outlet posting, management visibility.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop",
    anchor: "/industries#hotels"
  },
  {
    title: "Golf Clubs",
    description: "Member accounts, pro-shop sales, lounge controls.",
    image:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=500&auto=format&fit=crop",
    anchor: "/industries#golfclubs"
  },
  {
    title: "Bars & Lounges",
    description: "High-speed billing, tighter stock accountability.",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=500&auto=format&fit=crop",
    anchor: "/industries#bars"
  },
  {
    title: "SMEs & Retail",
    description: "Affordable systems that grow with your business.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=500&auto=format&fit=crop",
    anchor: "/industries#smes"
  }
];

export default function IndustriesPreview() {
  return (
    <section className="border-y border-daltar-border bg-daltar-bg-card py-20">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          heading="Configured for the way your sector works."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.title}
              className="flex min-h-[250px] flex-col overflow-hidden rounded-lg border border-daltar-border bg-daltar-bg-deep pb-4"
            >
              <div className="h-[100px] w-full overflow-hidden border-b border-daltar-border">
                {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="px-4 pt-3">
                <h4 className="text-sm font-semibold text-daltar-text-bright">
                  {industry.title}
                </h4>
                <p className="mt-1 text-[11.5px] leading-snug text-daltar-text-muted">
                  {industry.description}
                </p>
              </div>
              <Link
                href={industry.anchor}
                className="mt-auto inline-block px-4 pt-3 text-[11px] font-semibold text-daltar-accent-blue"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
