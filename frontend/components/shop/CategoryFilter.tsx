"use client";

import type { Category } from "@/lib/types";

interface CategoryFilterProps {
  categories: Category[];
  active: string | null;
  onChange: (slug: string | null) => void;
}

export default function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
          active === null
            ? "bg-daltar-accent-blue text-white"
            : "bg-daltar-bg-card text-daltar-text-muted hover:bg-white/10"
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category.slug}
          type="button"
          onClick={() => onChange(category.slug)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            active === category.slug
              ? "bg-daltar-accent-blue text-white"
              : "bg-daltar-bg-card text-daltar-text-muted hover:bg-white/10"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
