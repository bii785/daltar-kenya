import Container from "@/components/ui/Container";

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We map your operational workflows, pain points, and cross-branch growth plans."
  },
  {
    number: "02",
    title: "Setup",
    description:
      "Configure robust enterprise modules, migrate system records, and map payment systems."
  },
  {
    number: "03",
    title: "Training",
    description:
      "Hands-on practice loops tailored for cashiers, managers, and back-office accounting teams."
  },
  {
    number: "04",
    title: "Go-Live",
    description:
      "Parallel production testing environments giving way to fully secured systems operations."
  },
  {
    number: "05",
    title: "Support",
    description:
      "Continuous hardware optimization care, SLA tracking patches, and bespoke upgrade features."
  }
];

export default function ImplementationRoadmap() {
  return (
    <section className="py-20 text-center">
      <Container>
        <span className="text-xs font-bold uppercase tracking-widest text-daltar-accent-blue">
          Our Process
        </span>
        <h2 className="mt-2 text-3xl font-bold text-daltar-text-bright">
          A proven path to a successful go-live
        </h2>
        <div className="mt-12 grid gap-5 text-left sm:grid-cols-5">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-daltar-border bg-daltar-bg-card/20 p-5"
            >
              <div className="mb-2 text-2xl font-extrabold text-daltar-accent-blue/60">
                {step.number}
              </div>
              <h4 className="mb-1 text-sm font-bold text-daltar-text-bright">{step.title}</h4>
              <p className="text-xs leading-relaxed text-daltar-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
