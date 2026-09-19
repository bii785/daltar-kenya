"use client";

import { useMemo, useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/content/SectionHeading";
import ProductCard from "@/components/shop/ProductCard";
import CategoryFilter from "@/components/shop/CategoryFilter";
import type { Category, Product } from "@/lib/types";

interface ShopCatalogProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopCatalog({ initialProducts, categories }: ShopCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () =>
      activeCategory
        ? initialProducts.filter((product) => product.category === activeCategory)
        : initialProducts,
    [activeCategory, initialProducts]
  );

  return (
    <main className="py-16">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          heading="IT Hardware & POS Equipment"
          description="Terminals, computers, servers, and accessories — sourced, configured, and delivered across Kenya."
        />

        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-16 text-center text-sm text-daltar-text-muted">
            No products in this category yet.
          </p>
        )}
      </Container>
    </main>
  );
}
