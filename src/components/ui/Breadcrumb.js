import React from 'react';
import Link from 'next/link';

// Spacing follows the designs: the trail sits at y=192 and the first card
// starts at y=242 on the 1440px frames.
export function Breadcrumb({ items, className = '' }) {
  return (
    <nav aria-label="breadcrumb" className={`text-[#0056b3] ${className}`} style={{ margin: 'clamp(12px, 4.2vw, 61px) 0 clamp(12px, 2.9vw, 42px)', fontSize: 'max(0.9vw, 12px)' }}>
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
