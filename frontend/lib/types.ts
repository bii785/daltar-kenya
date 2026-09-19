export type UserRole = "customer" | "staff" | "admin";

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  company_name: string | null;
  role: UserRole;
  created_at: string;
}

export interface AuthTokenResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  shortDescription: string;
  specs: Record<string, string>;
  inStock: boolean;
}

export interface Category {
  slug: string;
  label: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

// Raw backend response shapes (app/schemas/product.py) — these are what the
// API actually returns. `Product`/`Category` above are the simplified shapes
// the existing shop components (ProductCard, CategoryFilter, etc.) already
// work with; lib/products.ts adapts between the two so those components
// didn't need to change when the mock data was swapped for a real fetch.
export interface ApiCategory {
  id: string;
  slug: string;
  label: string;
}

export interface ApiProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: ApiCategory;
  price: number;
  description: string;
  specs: Record<string, string>;
  image_url: string;
  stock_quantity: number;
  is_active: boolean;
  created_at: string;
}

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export interface OrderItemResponse {
  id: string;
  product_id: string;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface OrderResponse {
  id: string;
  status: OrderStatus;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_county: string;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_reference: string;
  items: OrderItemResponse[];
  created_at: string;
}
