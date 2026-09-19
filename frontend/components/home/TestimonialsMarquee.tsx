import Container from "@/components/ui/Container";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

// PLACEHOLDER CONTENT — these are illustrative, not real client quotes.
// Swap in actual client testimonials before this goes live.
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Grace M.",
    role: "Operations Manager",
    company: "Nyota Grill",
    quote:
      "Our billing used to take forever during rush hour. Now the whole floor runs on one screen and stock finally makes sense.",
    rating: 5
  },
  {
    name: "Daniel K.",
    role: "General Manager",
    company: "Baraka Retail Ltd",
    quote:
      "Daltar mapped our branches properly before touching anything. Go-live was smooth and support has been fast whenever we call.",
    rating: 5
  },
  {
    name: "Faith W.",
    role: "Front Office Manager",
    company: "Amani Boutique Hotel",
    quote:
      "Guest billing and outlet posting finally talk to each other. Reconciliation that used to take a day now takes an hour.",
    rating: 5
  },
  {
    name: "Peter N.",
    role: "Owner",
    company: "Highline Bar & Lounge",
    quote:
      "Stock variance dropped almost immediately once the recipe-level tracking went live. Worth the switch.",
    rating: 5
  }
];

export default function TestimonialsMarquee() {
  // Duplicated once so the CSS animation can loop seamlessly (translateX(-50%))
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-20">
      <Container className="mb-14 max-w-2xl text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-daltar-accent-blue">
          What clients say
        </span>
        <h2 className="mt-2 text-[32px] font-extrabold text-daltar-text-bright">
          Trusted by growing Kenyan businesses
        </h2>
      </Container>

      <div className="overflow-hidden py-3">
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {loop.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-${index}`}
              className="flex w-[360px] flex-col justify-between rounded-lg border border-daltar-border bg-daltar-bg-card p-6"
            >
              <div>
                <div className="mb-3 text-sm text-daltar-star">
                  {"\u2605".repeat(testimonial.rating)}
                </div>
                <p className="text-sm italic text-daltar-text-bright">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-daltar-bg-input text-xs font-bold text-daltar-accent-blue">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div>
                  <h5 className="text-[13px] font-semibold text-daltar-text-bright">
                    {testimonial.name}
                  </h5>
                  <p className="text-[11px] text-daltar-text-muted">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
