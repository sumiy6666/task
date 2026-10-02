import React from 'react';
import Link from 'next/link';

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="text-[#0056b3]" style={{ margin: 'max(1.2vw, 12px) 0', fontSize: 'max(0.9vw, 12px)' }}>
      <ol className="list-none p-0 flex m-0" style={{ gap: 'max(0.3vw, 4px)' }}>
        {items.map((item, index) => (
          <li key={index} className="flex items-center" style={{ gap: 'max(0.3vw, 4px)' }}>
            {item.href ? (
              <Link href={item.href} className="text-[#0056b3] no-underline hover:underline">
                {item.label}
              </Link>
            ) : (
              <span className="text-[#0056b3]">{item.label}</span>
            )}
            {index < items.length - 1 && <span>&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
