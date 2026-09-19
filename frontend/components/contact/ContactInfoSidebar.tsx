interface InfoBlock {
  icon: string;
  title: string;
  lines: { text: string; href?: string }[];
}

const INFO_BLOCKS: InfoBlock[] = [
  {
    icon: "\u{1F4CD}",
    title: "Corporate Headquarters",
    lines: [{ text: "Nairobi Workspace Hub, Core Business District" }, { text: "P.O. Box 00100, Nairobi, Kenya" }]
  },
  {
    icon: "\u{1F4DE}",
    title: "Direct Phone Assistance",
    lines: [
      { text: "Main Office: +254 700 000000", href: "tel:+254700000000" },
      { text: "Priority SLA Line: +254 711 111111", href: "tel:+254711111111" }
    ]
  },
  {
    icon: "\u{1F4E7}",
    title: "Electronic Inbound Mail",
    lines: [
      { text: "General Solutions: hello@daltar.co.ke", href: "mailto:hello@daltar.co.ke" },
      { text: "Technical Assistance: support@daltar.co.ke", href: "mailto:support@daltar.co.ke" }
    ]
  }
];

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 5:00 PM", highlight: false },
  { day: "Saturdays", time: "9:00 AM – 1:00 PM", highlight: false },
  { day: "Sundays & Public Holidays", time: "Emergency SLA Assistance Only", highlight: false },
  { day: "WhatsApp Support Line", time: "24/7 Monitored", highlight: true }
];

export default function ContactInfoSidebar() {
  return (
    <div className="flex flex-col gap-8">
      {INFO_BLOCKS.map((block) => (
        <div key={block.title} className="flex items-start gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-daltar-accent-blue/20 bg-daltar-accent-blue/10 text-xl">
            {block.icon}
          </div>
          <div>
            <h3 className="text-base font-bold text-daltar-text-bright">{block.title}</h3>
            {block.lines.map((line) =>
              line.href ? (
                <a
                  key={line.text}
                  href={line.href}
                  className="block text-[14.5px] text-daltar-accent-blue hover:underline"
                >
                  {line.text}
                </a>
              ) : (
                <p key={line.text} className="text-[14.5px] leading-relaxed text-daltar-text-muted">
                  {line.text}
                </p>
              )
            )}
          </div>
        </div>
      ))}

      <div className="rounded-xl border border-daltar-border bg-daltar-bg-card/30 p-6">
        <h4 className="mb-3.5 text-[13px] font-bold uppercase tracking-wide text-daltar-accent-blue">
          Engineering Availability Windows
        </h4>
        {HOURS.map((row, i) => (
          <div
            key={row.day}
            className={`flex items-center justify-between py-2 text-[13.5px] ${
              i < HOURS.length - 1 ? "border-b border-white/[0.04]" : ""
            }`}
          >
            <span
              className={row.highlight ? "font-semibold text-daltar-whatsapp" : "text-daltar-text-bright"}
            >
              {row.day}
            </span>
            <span className={row.highlight ? "font-semibold text-daltar-whatsapp" : "text-daltar-text-muted"}>
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
