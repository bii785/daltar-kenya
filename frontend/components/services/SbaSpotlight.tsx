import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const FEATURES = [
  "Accounting & Finance",
  "Inventory & Warehousing",
  "Payroll & Human Capital",
  "Automated Procurement",
  "Distributed POS Networks",
  "Business Intelligence Reporting",
  "Direct M-Pesa B2C/C2B Modules",
  "Multi-tenant Branch Control"
];

export default function SbaSpotlight() {
  return (
    <section
      id="sba-spotlight"
      className="border-y border-daltar-border bg-daltar-bg-card/20 px-4 py-16"
    >
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            &#9733; Featured Service — SBA Systems ERP
          </span>
          <h2 className="mt-4 text-2xl font-bold text-daltar-text-bright sm:text-3xl">
            Complete Operational Architecture
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-daltar-text-muted">
            Our unified software environment optimizes workflows for growing mid-market
            enterprises across East Africa, giving management full transparency over daily
            balances and remote branch movements.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-xs text-daltar-text-bright/90">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <span className="text-daltar-accent-blue">&#10003;</span>
                {feature}
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Book a Free Demo
            </Button>
            <Button href="https://wa.me/254700000000" variant="secondary" external>
              Consult an Architect
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl border border-daltar-border bg-daltar-bg-deep p-4 shadow-2xl">
            <div className="mb-3 flex items-center gap-2 border-b border-daltar-border pb-3">
              <span className="h-3 w-3 rounded-full bg-red-500/60" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <span className="h-3 w-3 rounded-full bg-green-500/60" />
              <span className="ml-2 font-mono text-[10px] text-daltar-text-muted">
                sba-dashboard-v2.dat
              </span>
            </div>
            <div className="space-y-2 py-2">
              <div className="h-3 w-1/3 rounded bg-daltar-bg-input" />
              <div className="h-2 w-full rounded bg-daltar-bg-input/50" />
              <div className="h-2 w-5/6 rounded bg-daltar-bg-input/50" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-12 rounded border border-daltar-accent-blue/20 bg-daltar-accent-blue/10" />
                <div className="h-12 rounded bg-daltar-bg-input" />
                <div className="h-12 rounded bg-daltar-bg-input" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
