import Hero from "@/components/content/Hero";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoSidebar from "@/components/contact/ContactInfoSidebar";

export default function ContactPage() {
  return (
    <>
      <Hero
        eyebrow="Get in touch"
        heading="Connect With Infrastructure Experts"
        description="Have questions about setting up point-of-sale configurations or SBA ERP modules? Drop us a message or visit our corporate center."
      />

      <section className="pb-20">
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />
          <ContactInfoSidebar />
        </Container>
      </section>

      {/* Static placeholder — no real map integration planned yet */}
      <div className="relative h-[320px] w-full border-y border-daltar-border bg-daltar-bg-card">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.6)_0%,#030712_100%)]">
          <span className="text-3xl">&#x1F5FA;&#xFE0F;</span>
          <p className="mt-2 text-sm font-bold text-daltar-text-bright">
            Nairobi Headquarters Map Interface
          </p>
          <p className="mt-1 max-w-xs text-center text-sm text-daltar-text-muted">
            Interactive map placeholder — real embed can be added later if needed.
          </p>
        </div>
      </div>
    </>
  );
}
