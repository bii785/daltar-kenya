interface CheckListProps {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}

// columns=2 matches the .sba-checklist 2-column grid variant from modules.css
export default function CheckList({ items, columns = 1, className = "" }: CheckListProps) {
  return (
    <ul
      className={`grid gap-3 ${columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} ${className}`}
    >
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-[13.5px] text-daltar-text-muted">
          <span className="mt-0.5 font-extrabold text-daltar-accent-blue">✓</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
