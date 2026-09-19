interface CardProps {
  image?: string;
  imageAlt?: string;
  title: string;
  description: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export default function Card({
  image,
  imageAlt = "",
  title,
  description,
  footer,
  className = ""
}: CardProps) {
  return (
    <article
      className={`overflow-hidden rounded-lg border border-daltar-border bg-daltar-bg-card ${className}`}
    >
      {image && (
        <div className="h-[160px] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-base font-bold text-daltar-text-bright">{title}</h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-daltar-text-muted">
          {description}
        </p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </article>
  );
}
