"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useCart } from "@/lib/CartContext";
import AuthModal from "@/components/auth/AuthModal";
import CartDrawer from "@/components/shop/CartDrawer";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" }
];

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM9 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // NOTE: the original site's mobile nav breakpoint rules only existed in
  // global.css, which we dropped as dead code. This mobile menu is a fresh
  // implementation using Tailwind's responsive classes, not a port.
  const linkClasses = (href: string) =>
    pathname === href
      ? "text-sm font-semibold text-daltar-text-bright"
      : "text-sm font-medium text-daltar-text-muted transition hover:text-daltar-text-bright";

  return (
    <header className="sticky top-0 z-50 border-b border-daltar-border bg-daltar-bg-deep/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-daltar items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-daltar-border bg-daltar-bg-card text-sm font-extrabold text-daltar-accent-blue">
            D
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold tracking-wide text-daltar-text-bright">
              Daltar<span className="italic text-daltar-accent-blue"> Kenya</span>
            </span>
            <span className="block text-[9px] font-bold tracking-widest text-daltar-text-muted">
              ENTERPRISE HUB
            </span>
          </span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-daltar-text-bright">
                {user.full_name.split(" ")[0]}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-md border border-daltar-border px-4 py-2 text-xs font-semibold text-daltar-text-bright transition hover:bg-white/5"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="rounded-md border border-daltar-border px-4 py-2 text-xs font-semibold text-daltar-text-bright transition hover:bg-white/5"
              onClick={() => setAuthModalOpen(true)}
            >
              Login
            </button>
          )}
          <a
            href="https://wa.me/254700000000"
            target="_blank"
            rel="noopener"
            className="rounded-md bg-daltar-whatsapp px-4 py-2 text-xs font-semibold text-white transition hover:bg-daltar-whatsapp-hover"
          >
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label="Open cart"
            className="relative rounded-md border border-daltar-border p-2 text-daltar-text-bright transition hover:bg-white/5"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-daltar-accent-blue text-[10px] font-bold text-daltar-bg-deep">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <button
          type="button"
          className="text-daltar-text-bright md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-daltar-border bg-daltar-bg-card px-6 py-5 md:hidden">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={linkClasses(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            {user ? (
              <>
                <span className="text-center text-xs font-semibold text-daltar-text-bright">
                  Signed in as {user.full_name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="w-full rounded-md border border-daltar-border px-4 py-2.5 text-xs font-semibold text-daltar-text-bright"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                type="button"
                className="w-full rounded-md border border-daltar-border px-4 py-2.5 text-xs font-semibold text-daltar-text-bright"
                onClick={() => {
                  setMobileOpen(false);
                  setAuthModalOpen(true);
                }}
              >
                Login
              </button>
            )}
            <a
              href="https://wa.me/254700000000"
              target="_blank"
              rel="noopener"
              className="w-full rounded-md bg-daltar-whatsapp px-4 py-2.5 text-center text-xs font-semibold text-white"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setCartOpen(true);
              }}
              className="w-full rounded-md border border-daltar-border px-4 py-2.5 text-xs font-semibold text-daltar-text-bright"
            >
              Cart{totalItems > 0 ? ` (${totalItems})` : ""}
            </button>
          </div>
        </div>
      )}

      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </header>
  );
}
