"use client";

import { useEffect, useState } from "react";
import apiRequest from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

interface AdminProduct {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  is_active: boolean;
  category: { label: string };
}

type ProductUpdates = Partial<Pick<AdminProduct, "price" | "stock_quantity" | "is_active">>;

function ProductRow({
  product,
  saving,
  onSave
}: {
  product: AdminProduct;
  saving: boolean;
  onSave: (updates: ProductUpdates) => void;
}) {
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(product.stock_quantity);
  const [active, setActive] = useState(product.is_active);

  return (
    <tr className="border-t border-daltar-border">
      <td className="px-4 py-3 font-semibold text-daltar-text-bright">{product.name}</td>
      <td className="px-4 py-3 text-daltar-text-muted">{product.category.label}</td>
      <td className="px-4 py-3">
        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
          className="w-24 rounded border border-daltar-border bg-daltar-bg-input px-2 py-1 text-daltar-text-bright"
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="number"
          value={stock}
          onChange={(event) => setStock(Number(event.target.value))}
          className="w-20 rounded border border-daltar-border bg-daltar-bg-input px-2 py-1 text-daltar-text-bright"
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
        />
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          disabled={saving}
          onClick={() => onSave({ price, stock_quantity: stock, is_active: active })}
          className="rounded bg-daltar-accent-blue px-3 py-1 text-xs font-semibold text-daltar-bg-deep transition disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </td>
    </tr>
  );
}

export default function ProductsAdminTable() {
  const { token } = useAuth();
  const [products, setProducts] = useState<AdminProduct[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadProducts = () => {
    if (!token) return;
    apiRequest<AdminProduct[]>("/api/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(setProducts)
      .catch((err) => setError(err instanceof Error ? err.message : "Couldn't load products"));
  };

  useEffect(loadProducts, [token]);

  const handleUpdate = async (id: string, updates: ProductUpdates) => {
    if (!token) return;
    setSavingId(id);
    try {
      await apiRequest(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates)
      });
      loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't update product");
    } finally {
      setSavingId(null);
    }
  };

  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (!products) return <p className="text-sm text-daltar-text-muted">Loading products...</p>;

  return (
    <div className="overflow-x-auto rounded-lg border border-daltar-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-daltar-bg-card text-xs uppercase tracking-wide text-daltar-text-muted">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price (KES)</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Active</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              saving={savingId === product.id}
              onSave={(updates) => handleUpdate(product.id, updates)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
