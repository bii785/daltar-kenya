interface CapabilityCardProps {
  icon: string;
  title: string;
  description: string;
  checklist: string[];
  image: string;
  imageAlt: string;
}

export default function CapabilityCard({
  icon,
  title,
  description,
  checklist,
  image,
  imageAlt
}: CapabilityCardProps) {
  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-daltar-border bg-daltar-bg-card/30 transition hover:border-daltar-accent-blue/40">
      <div>
        <div className="relative h-40 overflow-hidden bg-daltar-bg-deep">
          {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-daltar-bg-deep via-transparent to-transparent" />
        </div>
        <div className="p-6 pt-4">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-daltar-accent-blue/10 text-base text-daltar-accent-blue">
              {icon}
            </span>
            <h4 className="text-base font-bold text-daltar-text-bright">{title}</h4>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-daltar-text-muted">{description}</p>
          <ul className="mb-2 space-y-2 text-xs text-daltar-text-bright/90">
            {checklist.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="text-daltar-whatsapp">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-6 pt-0">
        <a
          href="https://wa.me/254700000000"
          target="_blank"
          rel="noopener"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-daltar-bg-input py-2.5 text-center text-xs font-medium text-daltar-text-bright transition hover:bg-white/10"
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
}
