import Container from "@/components/ui/Container";

const CHANNELS = [
  {
    label: "Call Sales Desk",
    value: "+254 700 000000",
    href: "tel:+254700000000"
  },
  {
    label: "WhatsApp Chat",
    value: "Message us directly",
    href: "https://wa.me/254700000000"
  },
  {
    label: "Email Support",
    value: "hello@daltar.co.ke",
    href: "mailto:hello@daltar.co.ke"
  }
];

// Matches .communication-gateway-bar / .gateway-grid from modules.css
export default function GatewayBar() {
  return (
    <Container className="pb-4">
      <div className="rounded-lg border border-daltar-border bg-daltar-bg-card p-4">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-daltar-text-muted">
          Reach Daltar Kenya instantly
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CHANNELS.map((channel) => {
            const isExternal = channel.href.startsWith("http");
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener" : undefined}
                className="rounded-md border border-daltar-border px-4 py-3 transition hover:bg-white/5"
              >
                <span className="block text-xs font-semibold text-daltar-text-bright">
                  {channel.label}
                </span>
                <span className="mt-1 block text-[13px] text-daltar-text-muted">
                  {channel.value}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
