import ShopCatalog from "@/components/shop/ShopCatalog";
import { fetchCategories, fetchProducts } from "@/lib/products";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([fetchProducts(), fetchCategories()]);

  return <ShopCatalog initialProducts={products} categories={categories} />;
}
