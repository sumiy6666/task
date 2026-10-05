import React from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function CategoryList({ categories }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <Reveal as="h3" className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1.5 * var(--sa))' }}>
        CATEGORIES
      </Reveal>

      <Reveal stagger={120} className="flex flex-col" style={{ gap: 'calc(0.5 * var(--sa))' }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between cursor-pointer transition-colors ${cat.isActive ? 'bg-[#003ECF] text-white' : 'hover:bg-gray-50 text-gray-900'} border-b border-gray-200 last:border-b-0`}
            style={{ padding: 'calc(0.8 * var(--sa)) calc(1.2 * var(--sa))', borderRadius: cat.isActive ? 'calc(2 * var(--sa))' : '0' }}
          >
            <div className="flex items-center" style={{ gap: 'calc(0.8 * var(--sa))' }}>
              <div className="rounded-full" style={{ width: 'calc(1.5 * var(--da) + var(--db))', height: 'calc(1.5 * var(--da) + var(--db))', backgroundColor: cat.isActive ? '#9cb5df' : '#e5e7eb' }} />
              <span className={cat.isActive ? 'font-medium' : 'font-medium'} style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))' }}>{cat.name}</span>
            </div>
            <span className={cat.isActive ? 'font-medium' : 'font-medium'} style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))' }}>{cat.count}</span>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
