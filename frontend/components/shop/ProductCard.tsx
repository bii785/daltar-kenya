"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-daltar-border bg-daltar-bg-card transition hover:border-daltar-accent-blue/40">
      <Link href={`/shop/${product.slug}`} className="block h-44 overflow-hidden bg-daltar-bg-deep">
        {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/shop/${product.slug}`}
          className="text-sm font-semibold text-daltar-text-bright transition hover:text-daltar-accent-blue"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-xs text-daltar-text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-sm font-bold text-daltar-text-bright">
            KES {product.price.toLocaleString()}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={!product.inStock}
            className="rounded-md bg-daltar-accent-blue px-3 py-1.5 text-xs font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
