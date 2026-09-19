"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import type { Product } from "@/lib/types";

export default function ProductDetailActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-3 rounded-md border border-daltar-border px-3 py-2">
        <button
          type="button"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="text-daltar-text-bright"
          aria-label="Decrease quantity"
        >
          &minus;
        </button>
        <span className="w-6 text-center text-sm text-daltar-text-bright">{quantity}</span>
        <button
          type="button"
          onClick={() => setQuantity((q) => q + 1)}
          className="text-daltar-text-bright"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        disabled={!product.inStock}
        className="rounded-md bg-daltar-accent-blue px-6 py-2.5 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {added ? "Added \u2713" : product.inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
