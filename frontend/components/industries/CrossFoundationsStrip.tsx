import Link from "next/link";
import Container from "@/components/ui/Container";

const FOUNDATIONS = [
  { icon: "\u{1F578}\u{FE0F}", label: "Structured Network Cabling" },
  { icon: "\u{1F4BB}", label: "Custom Software Development" },
  { icon: "\u{1F4DC}", label: "SLA Support Contracts" },
  { icon: "\u{1F441}\u{FE0F}", label: "CCTV & Access Control" },
  { icon: "\u{1F6E1}\u{FE0F}", label: "Hardware Warranty Care" }
];

export default function CrossFoundationsStrip() {
  return (
    <section className="border-b border-daltar-border bg-daltar-bg-card py-20">
      <Container>
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-[28px] font-extrabold text-daltar-text-bright">
            Shared Infrastructure &amp; Engineering Foundations
          </h2>
          <p className="mt-2 text-[15px] text-daltar-text-muted">
            Every industry setup we deploy is backed by the same verified network cabling,
            support, and hardware standards.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {FOUNDATIONS.map((item) => (
            <Link
              key={item.label}
              href="/services"
              className="block rounded-xl border border-daltar-border bg-daltar-bg-deep px-5 py-7 text-center transition hover:-translate-y-1 hover:border-daltar-accent-blue"
            >
              <span className="mb-3.5 block text-2xl">{item.icon}</span>
              <h4 className="text-[13.5px] font-bold leading-tight text-daltar-text-bright">
                {item.label}
              </h4>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
