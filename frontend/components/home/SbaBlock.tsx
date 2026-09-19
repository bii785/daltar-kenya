import Container from "@/components/ui/Container";
import CheckList from "@/components/content/CheckList";
import Button from "@/components/ui/Button";

export default function SbaBlock() {
  return (
    <section id="sba-erp" className="py-20">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-daltar-accent-blue bg-daltar-accent-blue/10 px-3 py-1 text-[10px] font-bold text-daltar-accent-blue">
            Featured product
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-daltar-text-bright">
            SBA Systems ERP connects your business data.
          </h2>
          <p className="mt-2 text-sm text-daltar-text-muted">
            A complete management platform for sales, stock, accounting, payroll,
            procurement, reporting, and branch visibility.
          </p>
          <div className="mt-6">
            <CheckList
              columns={2}
              items={[
                "Accounting and finance workflows",
                "Inventory and warehouse controls",
                "POS with M-Pesa payment options",
                "Multi-branch reporting and permissions"
              ]}
            />
          </div>
          <div className="mt-6">
            <Button href="/contact" variant="primary">
              Book a Free Demo
            </Button>
          </div>
        </div>
        <div className="h-[320px] overflow-hidden rounded-xl border border-daltar-border">
          {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
            alt="SBA Systems ERP dashboard preview"
            className="h-full w-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
