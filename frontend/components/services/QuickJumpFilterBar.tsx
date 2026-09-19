"use client";

import { useState } from "react";

const FILTERS = [
  "All Services",
  "Hardware Repair",
  "IT Support",
  "Managed IT",
  "Network Setup",
  "POS Installation",
  "Warranty"
];

// Matches the original's quick-jump pill bar exactly: a static row where
// clicking sets the active pill visually. The original never wired real
// filtering logic to these either — kept it as a visual/UX element rather
// than inventing filtering behavior that wasn't specified. The SBA Systems
// pill is a real anchor link since that section exists further down.
export default function QuickJumpFilterBar() {
  const [active, setActive] = useState(FILTERS[0]);

  return (
    <div className="sticky top-[72px] z-40 border-y border-daltar-border bg-daltar-bg-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-daltar gap-3 overflow-x-auto px-6 py-3">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition ${
              active === filter
                ? "bg-daltar-accent-blue text-white"
                : "bg-daltar-bg-card text-daltar-text-muted hover:bg-white/10"
            }`}
          >
            {filter}
          </button>
        ))}
        <a
          href="#sba-spotlight"
          className="shrink-0 whitespace-nowrap rounded-full border border-amber-500/40 bg-amber-500/5 px-4 py-1.5 text-xs font-medium text-amber-400"
        >
          &#9733; SBA Systems
        </a>
      </div>
    </div>
  );
}
