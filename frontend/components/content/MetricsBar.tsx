import Container from "@/components/ui/Container";

interface Metric {
  value: string;
  label: string;
}

interface MetricsBarProps {
  metrics: Metric[];
  className?: string;
}

// Static lookup (not computed) so Tailwind's build-time class scanner picks
// these up — dynamically built class strings like `sm:grid-cols-${n}` don't work.
const COLUMN_CLASSES: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
  5: "sm:grid-cols-5",
  6: "sm:grid-cols-6"
};

export default function MetricsBar({ metrics, className = "" }: MetricsBarProps) {
  const columnClass = COLUMN_CLASSES[metrics.length] ?? "sm:grid-cols-4";

  return (
    <div className={`border-y border-daltar-border bg-daltar-bg-card py-6 ${className}`}>
      <Container className={`grid grid-cols-2 gap-4 text-center ${columnClass}`}>
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="text-[22px] font-extrabold text-daltar-accent-blue">
              {metric.value}
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-daltar-text-muted">
              {metric.label}
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
