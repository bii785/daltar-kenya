import Container from "@/components/ui/Container";

interface CtaBandProps {
  heading: string;
  description?: string;
  children?: React.ReactNode; // action buttons, e.g. <Button variant="primary" href="/contact">
  className?: string;
}

export default function CtaBand({ heading, description, children, className = "" }: CtaBandProps) {
  return (
    <section
      className={`border-y border-daltar-border bg-gradient-to-br from-[#090d16] to-daltar-bg-card py-16 text-center ${className}`}
    >
      <Container>
        <h3 className="text-[26px] font-extrabold text-daltar-text-bright">{heading}</h3>
        {description && <p className="mt-2 text-sm text-daltar-text-muted">{description}</p>}
        {children && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3.5">{children}</div>
        )}
      </Container>
    </section>
  );
}
