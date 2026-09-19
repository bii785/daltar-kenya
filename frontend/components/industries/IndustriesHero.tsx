import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const MOSAIC = [
  {
    label: "Restaurants",
    anchor: "#restaurants",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=400",
    tall: true
  },
  {
    label: "Hotels",
    anchor: "#hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400",
    tall: false
  },
  {
    label: "Bars",
    anchor: "#bars",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400",
    tall: false
  },
  {
    label: "Golf Clubs",
    anchor: "#golfclubs",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=400",
    tall: true
  },
  {
    label: "SMEs",
    anchor: "#smes",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=400",
    tall: false
  }
];

export default function IndustriesHero() {
  return (
    <section className="border-b border-daltar-border bg-daltar-bg-card py-16 sm:py-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-daltar-accent-blue">
            Target Frameworks
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-daltar-text-bright sm:text-[40px] lg:text-[44px]">
            Engineered architecture tailored for specialized industry segments
          </h1>
          <p className="mt-4 text-base text-daltar-text-muted">
            We unite localized frontline terminal configurations with enterprise back-office
            management ledgers to ensure transparent reporting, data safety, and absolute
            operational clarity across East Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#restaurants" variant="primary">
              Explore Verticals
            </Button>
            <Button href="https://wa.me/254700000000" variant="whatsapp" external>
              Connect via WhatsApp
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 auto-rows-[100px] gap-3">
          {MOSAIC.map((item) => (
            <a
              key={item.label}
              href={item.anchor}
              className={`group relative flex flex-col justify-end overflow-hidden rounded-xl border border-daltar-border p-4 transition hover:border-daltar-accent-blue ${
                item.tall ? "row-span-2" : ""
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
              <img
                src={item.image}
                alt={item.label}
                className="absolute inset-0 h-full w-full object-cover opacity-30 transition group-hover:scale-105 group-hover:opacity-50"
              />
              <span className="relative z-10 text-[13px] font-bold text-daltar-text-bright">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
