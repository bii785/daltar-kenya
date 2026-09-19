import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";

interface Milestone {
  year: string;
  label: string;
}

const MILESTONES: Milestone[] = [
  { year: "2014", label: "Founded operations" },
  { year: "2018", label: "100+ systems live" },
  { year: "2021", label: "Multi-module expansion" },
  { year: "2026", label: "eTIMS ledger core" }
];

export default function JourneyTimeline() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading eyebrow="Our journey" heading="Growing with local ecosystems" />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-[5%] right-[5%] top-[6px] hidden h-px bg-white/10 sm:block" />
          <div className="grid grid-cols-2 gap-y-8 text-center sm:grid-cols-4">
            {MILESTONES.map((milestone) => (
              <div key={milestone.year} className="relative">
                <div className="mx-auto mb-6 h-3 w-3 rounded-full bg-daltar-accent-blue shadow-[0_0_0_4px_rgba(56,189,248,0.2)]" />
                <div className="text-lg font-bold text-daltar-text-bright">{milestone.year}</div>
                <div className="mt-1 text-[13px] text-daltar-text-muted">{milestone.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
