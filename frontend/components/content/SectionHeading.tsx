interface SectionHeadingProps {
  eyebrow: string;
  heading: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  description,
  className = ""
}: SectionHeadingProps) {
  return (
    <div className={`mx-auto mb-14 max-w-2xl text-center ${className}`}>
      <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-daltar-accent-blue">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-[32px] font-extrabold text-daltar-text-bright">{heading}</h2>
      {description && <p className="mt-3 text-daltar-text-muted">{description}</p>}
    </div>
  );
}
