"use client";

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="mx-auto max-w-daltar px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-daltar-text-bright">Couldn&apos;t load the shop</h1>
      <p className="mt-3 text-daltar-text-muted">
        The product catalog isn&apos;t reachable right now. Please try again shortly.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-md bg-daltar-accent-blue px-5 py-2.5 text-sm font-semibold text-daltar-bg-deep transition hover:bg-daltar-accent-blue-hover"
      >
        Try again
      </button>
    </main>
  );
}
