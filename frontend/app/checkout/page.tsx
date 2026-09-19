"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CartContext";
import apiRequest from "@/lib/api";
import { KENYA_COUNTIES } from "@/lib/counties";
import type { OrderResponse } from "@/lib/types";

const SHIPPING_FEE = 1500;

export default function CheckoutPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const { items, totalPrice, clearCart } = useCart();

  const [shippingName, setShippingName] = useState(user?.full_name ?? "");
  const [shippingPhone, setShippingPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCounty, setShippingCounty] = useState("Nairobi");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-daltar-text-bright">Your cart is empty</h1>
        <p className="mt-3 text-daltar-text-muted">Add something from the shop first.</p>
        <div className="mt-6">
          <Button href="/shop" variant="primary">
            Browse the Shop
          </Button>
        </div>
      </main>
    );
  }

  if (!user || !token) {
    return (
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-daltar-text-bright">Please log in to check out</h1>
        <p className="mt-3 text-daltar-text-muted">
          Your cart is saved — log in from the header, then come back to this page.
        </p>
      </main>
    );
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const order = await apiRequest<OrderResponse>("/api/orders", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          items: items.map((item) => ({
            product_id: item.productId,
            quantity: item.quantity
          })),
          shipping_name: shippingName,
          shipping_phone: shippingPhone,
          shipping_address: shippingAddress,
          shipping_county: shippingCounty
        })
      });
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="py-16">
      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-daltar-text-bright">Shipping Details</h1>

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3.5 text-[13.5px] text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              Full name
            </label>
            <input
              type="text"
              required
              value={shippingName}
              onChange={(event) => setShippingName(event.target.value)}
              className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              Phone number
            </label>
            <input
              type="tel"
              required
              placeholder="+254 700 000000"
              value={shippingPhone}
              onChange={(event) => setShippingPhone(event.target.value)}
              className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              Delivery address
            </label>
            <textarea
              required
              value={shippingAddress}
              onChange={(event) => setShippingAddress(event.target.value)}
              className="min-h-[90px] w-full resize-y rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-daltar-text-muted">
              County
            </label>
            <select
              value={shippingCounty}
              onChange={(event) => setShippingCounty(event.target.value)}
              className="w-full rounded-md border border-daltar-border bg-daltar-bg-input px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-daltar-accent-blue/30"
            >
              {KENYA_COUNTIES.map((county) => (
                <option key={county} value={county}>
                  {county}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md bg-daltar-accent-blue px-5 py-3 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Placing order..." : "Place Order"}
          </button>
        </form>

        <div className="h-fit rounded-xl border border-daltar-border bg-daltar-bg-card p-6">
          <h2 className="mb-4 text-lg font-bold text-daltar-text-bright">Order Summary</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-daltar-text-muted">
                  {item.name} &times; {item.quantity}
                </span>
                <span className="text-daltar-text-bright">
                  KES {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-2 border-t border-daltar-border pt-4 text-sm">
            <div className="flex justify-between text-daltar-text-muted">
              <span>Subtotal</span>
              <span>KES {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-daltar-text-muted">
              <span>Shipping</span>
              <span>KES {SHIPPING_FEE.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-daltar-text-bright">
              <span>Total</span>
              <span>KES {(totalPrice + SHIPPING_FEE).toLocaleString()}</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-daltar-text-muted">
            Final total (including shipping) is confirmed server-side — this is an estimate.{" "}
            <Link href="/shop" className="text-daltar-accent-blue hover:underline">
              Continue shopping
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
