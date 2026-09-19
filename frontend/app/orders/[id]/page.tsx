"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/AuthContext";
import apiRequest from "@/lib/api";
import type { OrderResponse } from "@/lib/types";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending Payment",
  paid: "Paid",
  fulfilled: "Fulfilled",
  cancelled: "Cancelled"
};

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
  paid: "text-daltar-accent-blue border-daltar-accent-blue/40 bg-daltar-accent-blue/10",
  fulfilled: "text-daltar-whatsapp border-daltar-whatsapp/40 bg-daltar-whatsapp/10",
  cancelled: "text-red-400 border-red-500/40 bg-red-500/10"
};

// Paystack confirms payment asynchronously via a server-to-server webhook —
// the browser redirect back to this page can arrive before that webhook
// does. Polling for a short window covers that gap with visible feedback
// rather than leaving the person staring at "Pending Payment" wondering if
// their payment actually went through.
const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 10;

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { token } = useAuth();
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let pollCount = 0;
    let timer: ReturnType<typeof setTimeout>;

    const fetchOrder = () => {
      apiRequest<OrderResponse>(`/api/orders/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((data) => {
          setOrder(data);
          if (data.status === "pending" && pollCount < MAX_POLLS) {
            pollCount += 1;
            timer = setTimeout(fetchOrder, POLL_INTERVAL_MS);
          }
        })
        .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load this order"));
    };

    fetchOrder();
    return () => clearTimeout(timer);
  }, [token, params.id]);

  const handlePayNow = async () => {
    if (!token) return;
    setIsPaying(true);
    setPayError(null);
    try {
      const result = await apiRequest<{ authorization_url: string }>(
        `/api/orders/${params.id}/initialize-payment`,
        { method: "POST", headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.href = result.authorization_url;
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Couldn't start payment");
      setIsPaying(false);
    }
  };

  if (!token) {
    return (
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <p className="text-daltar-text-muted">Please log in to view this order.</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <p className="text-red-400">{error}</p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="mx-auto max-w-daltar px-6 py-24 text-center">
        <p className="text-daltar-text-muted">Loading order...</p>
      </main>
    );
  }

  return (
    <main className="py-16">
      <Container className="max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs text-daltar-text-muted">Order</p>
            <h1 className="font-mono text-lg font-bold text-daltar-text-bright">{order.id}</h1>
          </div>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${STATUS_COLORS[order.status]}`}
          >
            {STATUS_LABELS[order.status]}
          </span>
        </div>

        {order.status === "pending" && (
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/5 px-4 py-4">
            <p className="mb-3 text-[13.5px] text-yellow-400">
              This order is awaiting payment.
            </p>
            {payError && <p className="mb-3 text-xs text-red-400">{payError}</p>}
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isPaying}
              className="rounded-md bg-daltar-accent-blue px-5 py-2.5 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPaying ? "Redirecting to Paystack..." : "Pay Now"}
            </button>
          </div>
        )}

        <div className="rounded-xl border border-daltar-border bg-daltar-bg-card p-6">
          <h2 className="mb-4 text-sm font-bold text-daltar-text-bright">Items</h2>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-daltar-text-muted">
                  {item.product_name} &times; {item.quantity}
                </span>
                <span className="text-daltar-text-bright">
                  KES {item.line_total.toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-daltar-border pt-4 text-sm">
            <div className="flex justify-between text-daltar-text-muted">
              <span>Subtotal</span>
              <span>KES {order.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-daltar-text-muted">
              <span>Shipping</span>
              <span>KES {order.shipping_fee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-daltar-text-bright">
              <span>Total</span>
              <span>KES {order.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-daltar-border bg-daltar-bg-card p-6">
          <h2 className="mb-3 text-sm font-bold text-daltar-text-bright">Shipping To</h2>
          <p className="text-sm text-daltar-text-bright">{order.shipping_name}</p>
          <p className="text-sm text-daltar-text-muted">{order.shipping_phone}</p>
          <p className="text-sm text-daltar-text-muted">
            {order.shipping_address}, {order.shipping_county}
          </p>
        </div>
      </Container>
    </main>
  );
}
