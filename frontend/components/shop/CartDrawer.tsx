"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end bg-black/70" onClick={onClose}>
      <div
        className="flex h-full w-full max-w-sm flex-col bg-daltar-bg-card p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-daltar-text-bright">Your Cart</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="text-xl leading-none text-daltar-text-muted transition hover:text-daltar-text-bright"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-daltar-text-muted">Your cart is empty.</p>
        ) : (
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-daltar-text-bright">{item.name}</p>
                  <p className="mt-1 text-xs text-daltar-text-muted">
                    KES {item.price.toLocaleString()}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="h-6 w-6 rounded border border-daltar-border text-xs text-daltar-text-bright"
                    >
                      &minus;
                    </button>
                    <span className="text-xs text-daltar-text-bright">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="h-6 w-6 rounded border border-daltar-border text-xs text-daltar-text-bright"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="ml-auto text-xs text-red-400 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-6 border-t border-daltar-border pt-4">
            <div className="mb-4 flex items-center justify-between text-sm font-semibold text-daltar-text-bright">
              <span>Subtotal</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full rounded-md bg-daltar-accent-blue px-5 py-2.5 text-center text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
