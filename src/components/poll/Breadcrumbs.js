import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-[#1c72d6]" style={{ fontSize: 'calc(1.1 * var(--fa) + var(--fb))', marginBottom: 'calc(2 * var(--sa))' }}>
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span style={{ margin: '0 calc(0.5 * var(--sa))' }}>{'>'}</span>}
        </span>
      ))}
    </nav>
  );
}
