"use client";

import { useEffect, useState } from "react";
import apiRequest from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import type { OrderResponse, OrderStatus } from "@/lib/types";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "paid", "fulfilled", "cancelled"];

export default function OrdersAdminTable() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadOrders = () => {
    if (!token) return;
    apiRequest<OrderResponse[]>("/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setOrders)
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load orders"));
  };

  useEffect(loadOrders, [token]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    if (!token) return;
    setSavingId(orderId);
    try {
      await apiRequest(`/api/admin/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus })
      });
      loadOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't update order");
    } finally {
      setSavingId(null);
    }
  };

  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (!orders) return <p className="text-sm text-daltar-text-muted">Loading orders...</p>;
  if (orders.length === 0) {
    return <p className="text-sm text-daltar-text-muted">No orders yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-daltar-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-daltar-bg-card text-xs uppercase tracking-wide text-daltar-text-muted">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Shipping To</th>
            <th className="px-4 py-3">Total (KES)</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-daltar-border">
              <td className="px-4 py-3 font-mono text-xs text-daltar-text-muted">
                {order.id.slice(0, 8)}
              </td>
              <td className="px-4 py-3 text-daltar-text-bright">
                {order.shipping_name}
                <span className="block text-xs text-daltar-text-muted">
                  {order.shipping_county}
                </span>
              </td>
              <td className="px-4 py-3 text-daltar-text-bright">
                {order.total.toLocaleString()}
              </td>
              <td className="px-4 py-3">
                <select
                  value={order.status}
                  disabled={savingId === order.id}
                  onChange={(event) =>
                    handleStatusChange(order.id, event.target.value as OrderStatus)
                  }
                  className="rounded border border-daltar-border bg-daltar-bg-input px-2 py-1 text-xs text-daltar-text-bright"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
