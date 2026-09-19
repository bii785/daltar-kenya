"use client";

import { useEffect, useRef, useState } from "react";

const TABS = [
  { id: "restaurants", label: "Restaurants" },
  { id: "hotels", label: "Hotels" },
  { id: "golfclubs", label: "Golf Clubs" },
  { id: "bars", label: "Bars" },
  { id: "smes", label: "SMEs" }
];

// Recreates the original's IntersectionObserver-driven active tab tracking:
// scrolling through a vertical section highlights the matching tab and
// keeps it scrolled into view within the horizontal tab strip.
export default function IndustryTabs() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sections = TABS.map((tab) => document.getElementById(tab.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    tabRefs.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    });
  }, [activeId]);

  return (
    <div className="sticky top-[72px] z-[90] border-b border-daltar-border bg-daltar-bg-deep/90 py-3.5 backdrop-blur-md">
      <div className="mx-auto max-w-daltar overflow-x-auto px-6">
        <div className="flex gap-3">
          {TABS.map((tab) => (
            <a
              key={tab.id}
              ref={(el) => {
                tabRefs.current[tab.id] = el;
              }}
              href={`#${tab.id}`}
              onClick={() => setActiveId(tab.id)}
              className={`whitespace-nowrap rounded-full border px-5 py-2 text-[13px] font-semibold transition ${
                activeId === tab.id
                  ? "border-daltar-accent-blue bg-daltar-accent-blue/5 text-daltar-text-bright"
                  : "border-daltar-border text-daltar-text-muted hover:border-daltar-accent-blue hover:text-daltar-text-bright"
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
