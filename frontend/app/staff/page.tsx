"use client";

import { useEffect, useState } from "react";
import RequireRole from "@/components/auth/RequireRole";
import ProductsAdminTable from "@/components/admin/ProductsAdminTable";
import OrdersAdminTable from "@/components/admin/OrdersAdminTable";
import apiRequest from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string;
  message: string;
  created_at: string;
}

function LeadsTable() {
  const { token } = useAuth();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    apiRequest<Lead[]>("/api/leads", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setLeads)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load leads"));
  }, [token]);

  if (error) {
    return <p className="text-sm text-red-400">{error}</p>;
  }

  if (!leads) {
    return <p className="text-sm text-daltar-text-muted">Loading leads...</p>;
  }

  if (leads.length === 0) {
    return (
      <p className="text-sm text-daltar-text-muted">
        No submissions yet — they&apos;ll show up here as soon as someone uses the contact form.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-daltar-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-daltar-bg-card text-xs uppercase tracking-wide text-daltar-text-muted">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Contact</th>
            <th className="px-4 py-3">Interest</th>
            <th className="px-4 py-3">Message</th>
            <th className="px-4 py-3">Received</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t border-daltar-border">
              <td className="px-4 py-3 font-semibold text-daltar-text-bright">{lead.name}</td>
              <td className="px-4 py-3 text-daltar-text-muted">
                {lead.email}
                {lead.phone ? ` · ${lead.phone}` : ""}
              </td>
              <td className="px-4 py-3 text-daltar-text-muted">{lead.interest}</td>
              <td className="max-w-xs truncate px-4 py-3 text-daltar-text-muted">
                {lead.message}
              </td>
              <td className="px-4 py-3 text-daltar-text-muted">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function StaffPage() {
  return (
    <RequireRole allowedRoles={["staff", "admin"]}>
      <main className="mx-auto max-w-daltar px-6 py-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-daltar-accent-blue">
          Staff Area
        </span>
        <h1 className="mt-3 text-3xl font-extrabold text-daltar-text-bright">
          Staff Dashboard
        </h1>

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-bold text-daltar-text-bright">
            Contact form submissions
          </h2>
          <p className="mb-4 text-sm text-daltar-text-muted">
            Pulled live from GET /api/leads.
          </p>
          <LeadsTable />
        </section>

        <section className="mt-12">
          <h2 className="mb-3 text-lg font-bold text-daltar-text-bright">Orders</h2>
          <p className="mb-4 text-sm text-daltar-text-muted">
            Update fulfillment status as orders move through pending → paid → fulfilled.
          </p>
          <OrdersAdminTable />
        </section>

        <section className="mt-12">
          <h2 className="mb-3 text-lg font-bold text-daltar-text-bright">Products</h2>
          <p className="mb-4 text-sm text-daltar-text-muted">
            Adjust price and stock directly, or deactivate a product to hide it from the shop.
          </p>
          <ProductsAdminTable />
        </section>
      </main>
    </RequireRole>
  );
}
