import Container from "@/components/ui/Container";

interface Metric {
  label: string;
  value: string;
}

interface VerticalBlockProps {
  id: string;
  segmentLabel: string;
  icon: string;
  color: string;
  title: string;
  challenge: string;
  solution: string;
  checklist: string[];
  ctaLabel: string;
  media: { src: string; alt: string };
  metrics: Metric[];
  reversed?: boolean;
}

export default function VerticalBlock({
  id,
  segmentLabel,
  icon,
  color,
  title,
  challenge,
  solution,
  checklist,
  ctaLabel,
  media,
  metrics,
  reversed = false
}: VerticalBlockProps) {
  const textSide = (
    <div key="text" className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-daltar-border bg-daltar-bg-card/25 p-5">
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-daltar-accent-blue">
            The Challenge
          </h3>
          <p className="text-[14.5px] leading-relaxed text-daltar-text-muted">{challenge}</p>
        </div>
        <div className="rounded-xl border border-daltar-border bg-daltar-bg-card/25 p-5">
          <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-daltar-accent-blue">
            Our Solution
          </h3>
          <p className="text-[14.5px] leading-relaxed text-daltar-text-muted">{solution}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-2.5 text-xs font-bold uppercase tracking-wide text-daltar-accent-blue">
          What We Provide
        </h3>
        <div className="flex flex-col gap-3">
          {checklist.map((item) => (
            <div key={item} className="flex items-start gap-3 text-sm text-daltar-text-bright">
              <span className="font-extrabold text-daltar-whatsapp">&#10003;</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <a
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noopener"
          className="inline-flex items-center gap-2 rounded-md bg-daltar-whatsapp px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-daltar-whatsapp-hover"
        >
          {ctaLabel}
        </a>
      </div>
    </div>
  );

  const mediaSide = (
    <div key="media" className="flex flex-col gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
      <img
        src={media.src}
        alt={media.alt}
        className="h-[240px] w-full rounded-2xl border border-daltar-border object-cover"
      />
      <div className="flex gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="flex-1 rounded-xl border border-daltar-border bg-daltar-bg-card p-3.5 text-center"
          >
            <h5 className="text-base font-bold text-daltar-text-bright">{metric.label}</h5>
            <p className="mt-1 text-[10px] uppercase tracking-wide text-daltar-text-muted">
              {metric.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id={id}
      className={`border-b border-daltar-border py-20 ${reversed ? "bg-daltar-bg-card/10" : ""}`}
    >
      <Container>
        <div className="mb-9 flex items-center gap-4">
          <div
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl text-2xl"
            style={{
              backgroundColor: `${color}14`,
              border: `1px solid ${color}`,
              color
            }}
          >
            {icon}
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wide text-daltar-text-muted">
              {segmentLabel}
            </h4>
            <h2 className="mt-0.5 text-2xl font-extrabold text-daltar-text-bright sm:text-[32px]">
              {title}
            </h2>
          </div>
        </div>

        <div
          className={`grid items-start gap-12 lg:grid-cols-1 ${
            reversed ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_0.85fr]"
          }`}
        >
          {reversed ? (
            <>
              {mediaSide}
              {textSide}
            </>
          ) : (
            <>
              {textSide}
              {mediaSide}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
