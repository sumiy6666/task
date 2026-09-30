import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-[1.1vw] text-[#1c72d6] mb-[2vw]">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-[0.5vw]">{'>'}</span>}
        </span>
      ))}
    </nav>
  );
}
