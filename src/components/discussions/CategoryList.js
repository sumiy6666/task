import React from 'react';

export function CategoryList({ categories }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', padding: '1.8vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1.5vw' }}>
        CATEGORIES
      </h3>

      <div className="flex flex-col" style={{ gap: '0.5vw' }}>
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`flex items-center justify-between cursor-pointer transition-colors ${cat.isActive ? 'bg-[#003ECF] text-white' : 'hover:bg-gray-50 text-gray-900'} border-b border-gray-200 last:border-b-0`}
            style={{ padding: '0.8vw 1.2vw', borderRadius: cat.isActive ? '2vw' : '0' }}
          >
            <div className="flex items-center" style={{ gap: '0.8vw' }}>
              <div className="rounded-full" style={{ width: '1.5vw', height: '1.5vw', backgroundColor: cat.isActive ? '#9cb5df' : '#e5e7eb' }} />
              <span className={cat.isActive ? 'font-medium' : 'font-medium'} style={{ fontSize: '0.9vw' }}>{cat.name}</span>
            </div>
            <span className={cat.isActive ? 'font-medium' : 'font-medium'} style={{ fontSize: '0.9vw' }}>{cat.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
