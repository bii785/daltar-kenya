import Hero from "@/components/content/Hero";
import MetricsBar from "@/components/content/MetricsBar";
import CtaBand from "@/components/content/CtaBand";
import Button from "@/components/ui/Button";
import GatewayBar from "@/components/home/GatewayBar";
import HeroSlider from "@/components/home/HeroSlider";
import WhyDaltarRows from "@/components/home/WhyDaltarRows";
import IndustriesPreview from "@/components/home/IndustriesPreview";
import SbaBlock from "@/components/home/SbaBlock";
import TestimonialsMarquee from "@/components/home/TestimonialsMarquee";
import FaqAccordion from "@/components/home/FaqAccordion";

export default function Home() {
  return (
    <>
      <Hero
        pills={[
          "11+ years active",
          "Nairobi, Kenya",
          "M-Pesa ready",
          "47 counties served"
        ]}
        heading="Reliable enterprise IT infrastructure for Kenyan businesses."
        description="Daltar Kenya delivers ERP, POS, managed networks, hardware support, and custom business systems for growing teams that need clean data, faster service, and dependable operations."
        actions={
          <>
            <Button href="/services" variant="primary">
              Explore Services
            </Button>
            <Button href="/contact" variant="secondary">
              Book a Demo
            </Button>
            <Button href="https://wa.me/254700000000" variant="whatsapp" external>
              Talk on WhatsApp
            </Button>
          </>
        }
        image={{
          src: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1100&auto=format&fit=crop",
          alt: "Modern enterprise infrastructure dashboard"
        }}
      />

      <GatewayBar />

      <HeroSlider />

      <MetricsBar
        metrics={[
          { value: "300+", label: "Businesses powered" },
          { value: "47", label: "Counties covered" },
          { value: "99.9%", label: "Uptime target" },
          { value: "24/7", label: "Support response" }
        ]}
      />

      <WhyDaltarRows />

      <IndustriesPreview />

      <SbaBlock />

      <TestimonialsMarquee />

      <FaqAccordion />

      <CtaBand
        heading="Ready to upgrade your business systems?"
        description="Talk to Daltar Kenya and get a practical plan for your software, devices, and support."
      >
        <Button href="https://wa.me/254700000000" variant="whatsapp" external>
          WhatsApp Us
        </Button>
        <Button href="/contact" variant="primary">
          Contact Sales
        </Button>
      </CtaBand>
    </>
  );
}
