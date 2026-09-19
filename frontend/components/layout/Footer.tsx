import Link from "next/link";

const PAGE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" }
];

const SOLUTION_LINKS = [
  { href: "/services", label: "SBA ERP" },
  { href: "/services", label: "POS setup" },
  { href: "/services", label: "Managed IT" },
  { href: "/services", label: "Network setup" }
];

export default function Footer() {
  return (
    <footer className="bg-daltar-footer-bg text-daltar-footer-text">
      <div className="mx-auto max-w-daltar px-6 py-14">
        <div className="grid grid-cols-1 gap-10 pb-11 sm:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-[250px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-daltar-footer-blue text-sm font-extrabold text-white">
                D
              </span>
              <span className="text-lg font-bold tracking-tight text-daltar-footer-text">
                Daltar Kenya
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-daltar-footer-text-muted">
              ERP, POS, infrastructure, and support for Kenyan businesses.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-daltar-footer-text">Pages</h4>
            <ul className="space-y-2.5">
              {PAGE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-daltar-footer-text-muted transition hover:text-daltar-footer-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-daltar-footer-text">Solutions</h4>
            <ul className="space-y-2.5">
              {SOLUTION_LINKS.map((link, i) => (
                <li key={`${link.label}-${i}`}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-daltar-footer-text-muted transition hover:text-daltar-footer-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold text-daltar-footer-text">Contact</h4>
            <ul className="space-y-2.5 text-[13.5px] text-daltar-footer-text-muted">
              <li>Nairobi, Kenya</li>
              <li>
                <a href="tel:+254700000000" className="transition hover:text-daltar-footer-blue">
                  +254 700 000000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@daltar.co.ke"
                  className="transition hover:text-daltar-footer-blue"
                >
                  hello@daltar.co.ke
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-black/5 pt-6 text-xs text-daltar-footer-text-muted sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Daltar Kenya. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="transition hover:text-daltar-footer-text">
              Privacy
            </a>
            <a href="#" className="transition hover:text-daltar-footer-text">
              Terms
            </a>
            <a href="#" className="transition hover:text-daltar-footer-text">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
