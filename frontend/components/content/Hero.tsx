import Container from "@/components/ui/Container";

interface HeroProps {
  eyebrow?: string;
  pills?: string[];
  heading: string;
  description: string;
  actions?: React.ReactNode;
  image?: { src: string; alt: string };
  className?: string;
}

// Covers both hero patterns from the original site:
// - Home hero: pill-cluster badges + image (pass `pills` + `image`)
// - Inner page-hero: eyebrow only, no image (pass `eyebrow`, omit `image`)
export default function Hero({
  eyebrow,
  pills,
  heading,
  description,
  actions,
  image,
  className = ""
}: HeroProps) {
  return (
    <section className={`py-16 ${className}`}>
      <Container className={image ? "grid items-center gap-12 lg:grid-cols-2" : ""}>
        <div>
          {pills && pills.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-daltar-border bg-daltar-bg-card px-3.5 py-1.5 text-[11px] font-semibold text-daltar-accent-blue"
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {eyebrow && (
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-daltar-accent-blue">
              {eyebrow}
            </span>
          )}

          <h1 className="text-[32px] font-extrabold leading-tight text-daltar-text-bright sm:text-[38px] lg:text-[44px]">
            {heading}
          </h1>
          <p className="mt-4 max-w-xl text-base text-daltar-text-muted">{description}</p>

          {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
        </div>

        {image && (
          <div className="h-[280px] overflow-hidden rounded-xl border border-daltar-border sm:h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
            <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
          </div>
        )}
      </Container>
    </section>
  );
}
