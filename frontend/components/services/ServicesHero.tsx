import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function ServicesHero() {
  return (
    <section className="border-b border-daltar-border bg-[radial-gradient(circle_at_50%_0%,#0f172a_0%,#030712_70%)] px-4 pb-16 pt-16 text-center sm:pt-20">
      <Container className="max-w-3xl">
        <span className="inline-block rounded-full bg-daltar-accent-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-daltar-accent-blue">
          Services
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-daltar-text-bright sm:text-5xl">
          Done-for-you implementation, training, and support
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-daltar-text-muted sm:text-lg">
          From go-live to growth, we partner with your team end-to-end with infrastructure
          operations optimized for scaling African enterprise ecosystems.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/contact" variant="primary">
            Get a Quote
          </Button>
          <Button href="https://wa.me/254700000000" variant="whatsapp" external>
            Talk to Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
