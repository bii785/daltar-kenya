"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RequireRole from "@/components/auth/RequireRole";
import Container from "@/components/ui/Container";
import { useAuth } from "@/lib/AuthContext";
import apiRequest from "@/lib/api";
import type { OrderResponse } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400",
  paid: "text-daltar-accent-blue",
  fulfilled: "text-daltar-whatsapp",
  cancelled: "text-red-400"
};

function OrderHistoryList() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    apiRequest<OrderResponse[]>("/api/orders/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load orders"));
  }, [token]);

  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (!orders) return <p className="text-sm text-daltar-text-muted">Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <p className="text-sm text-daltar-text-muted">
        No orders yet —{" "}
        <Link href="/shop" className="text-daltar-accent-blue hover:underline">
          browse the shop
        </Link>{" "}
        to place your first one.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          className="flex items-center justify-between rounded-lg border border-daltar-border bg-daltar-bg-card p-4 transition hover:border-daltar-accent-blue/40"
        >
          <div>
            <p className="font-mono text-xs text-daltar-text-muted">{order.id}</p>
            <p className="mt-1 text-sm text-daltar-text-bright">
              {order.items.length} item{order.items.length === 1 ? "" : "s"} · KES{" "}
              {order.total.toLocaleString()}
            </p>
          </div>
          <span className={`text-xs font-semibold uppercase ${STATUS_COLORS[order.status]}`}>
            {order.status}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <RequireRole allowedRoles={["customer", "staff", "admin"]}>
      <main className="py-16">
        <Container className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-daltar-accent-blue">
            My Account
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-daltar-text-bright">
            {user ? `Welcome back, ${user.full_name.split(" ")[0]}` : "My Account"}
          </h1>
          <p className="mt-2 mb-8 text-daltar-text-muted">Your order history</p>
          <OrderHistoryList />
        </Container>
      </main>
    </RequireRole>
  );
}
