import apiRequest from "@/lib/api";
import type { ApiCategory, ApiProduct, Category, Product } from "@/lib/types";

// Adapts the backend's real response shape to the simpler Product/Category
// shape ProductCard, CategoryFilter, ProductDetailActions etc. were built
// against — keeps those components unchanged now that this file fetches
// real data instead of returning a hardcoded array.
function mapProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    slug: apiProduct.slug,
    name: apiProduct.name,
    category: apiProduct.category.slug,
    price: apiProduct.price,
    image: apiProduct.image_url,
    shortDescription: apiProduct.description,
    specs: apiProduct.specs,
    inStock: apiProduct.stock_quantity > 0
  };
}

function mapCategory(apiCategory: ApiCategory): Category {
  return { slug: apiCategory.slug, label: apiCategory.label };
}

export async function fetchProducts(): Promise<Product[]> {
  const apiProducts = await apiRequest<ApiProduct[]>("/api/products");
  return apiProducts.map(mapProduct);
}

export async function fetchCategories(): Promise<Category[]> {
  const apiCategories = await apiRequest<ApiCategory[]>("/api/categories");
  return apiCategories.map(mapCategory);
}

// Any failure (network down, 404, etc.) returns null rather than throwing —
// the page calling this treats null as "show the not-found page," which is
// a reasonable simplification even though a network outage isn't literally
// the same as a missing product.
export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const apiProduct = await apiRequest<ApiProduct>(`/api/products/${slug}`);
    return mapProduct(apiProduct);
  } catch {
    return null;
  }
}
