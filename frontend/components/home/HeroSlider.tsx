"use client";

import { useEffect, useRef, useState } from "react";

interface Slide {
  title: string;
  subtitle: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    title: "Custom POS Integrations",
    subtitle:
      "Sales, inventory, M-Pesa, and reporting connected in one branch-ready workflow.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1400&auto=format&fit=crop"
  },
  {
    title: "Managed Network Architecture",
    subtitle:
      "Structured cabling, secure Wi-Fi, failover links, and support for high-uptime teams.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1400&auto=format&fit=crop"
  },
  {
    title: "SBA Systems ERP",
    subtitle:
      "Accounting, stock, payroll, POS, and multi-branch oversight in one operating platform.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1400&auto=format&fit=crop"
  }
];

const AUTOPLAY_MS = 5000;

// Recreates slider.js: autoplay every 5s, dot nav, manual prev/next resets the timer
export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoplay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (index: number) => {
    setActiveIndex(index);
    startAutoplay();
  };

  const shift = (offset: number) => {
    setActiveIndex((prev) => (prev + offset + SLIDES.length) % SLIDES.length);
    startAutoplay();
  };

  return (
    <section
      aria-label="Featured solutions"
      className="relative h-[280px] overflow-hidden border-t border-daltar-border"
    >
      {SLIDES.map((slide, index) => (
        <div
          key={slide.title}
          className={`absolute inset-0 flex flex-col items-center justify-center px-16 text-center transition-opacity duration-700 ${
            index === activeIndex ? "z-10 opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(3,7,18,.78),rgba(3,7,18,.78)), url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <h3 className="text-2xl font-bold text-daltar-text-bright [text-shadow:0_4px_12px_rgba(0,0,0,0.6)]">
            {slide.title}
          </h3>
          <p className="mt-1 text-sm text-daltar-text-muted [text-shadow:0_2px_8px_rgba(0,0,0,0.6)]">
            {slide.subtitle}
          </p>
        </div>
      ))}

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => shift(-1)}
        className="absolute left-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-daltar-border bg-daltar-bg-deep/60 text-daltar-text-bright transition hover:bg-daltar-accent-blue hover:text-daltar-bg-deep"
      >
        &lt;
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => shift(1)}
        className="absolute right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-daltar-border bg-daltar-bg-deep/60 text-daltar-text-bright transition hover:bg-daltar-accent-blue hover:text-daltar-bg-deep"
      >
        &gt;
      </button>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.title}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === activeIndex ? "w-6 bg-daltar-accent-blue" : "w-2.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
