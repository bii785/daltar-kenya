import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import { fetchProductBySlug } from "@/lib/products";
import ProductDetailActions from "@/components/shop/ProductDetailActions";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await fetchProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="py-16">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div className="h-[360px] overflow-hidden rounded-xl border border-daltar-border">
          {/* eslint-disable-next-line @next/next/no-img-element -- swapped for next/image in Phase 16 */}
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-daltar-accent-blue">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-extrabold text-daltar-text-bright sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-3 text-daltar-text-muted">{product.shortDescription}</p>
          <p className="mt-4 text-2xl font-bold text-daltar-text-bright">
            KES {product.price.toLocaleString()}
          </p>

          <div className="mt-6 rounded-lg border border-daltar-border bg-daltar-bg-card p-5">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-daltar-text-muted">
              Specifications
            </h3>
            <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-white/5 pb-1.5">
                  <dt className="text-daltar-text-muted">{key}</dt>
                  <dd className="text-daltar-text-bright">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6">
            <ProductDetailActions product={product} />
          </div>
        </div>
      </Container>
    </main>
  );
}
