import React from 'react';

export function PopularTagsList({ tags }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: 'calc(1.2 * var(--sa))', padding: 'calc(1.8 * var(--sa))', boxShadow: '0 calc(0.2 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1 * var(--sa))' }}>
        POPULAR TAGS
      </h3>
      <hr className="border-0" style={{ borderTop: 'calc(0.05 * var(--sa)) solid #eaeaea', margin: '0 0 calc(1.5 * var(--sa)) 0' }} />
      <div className="flex flex-col" style={{ gap: 'calc(0.8 * var(--sa))' }}>
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-[#f0f7ff] cursor-pointer hover:bg-[#e0efff] transition-colors"
            style={{ padding: 'calc(0.8 * var(--sa)) calc(1.2 * var(--sa))', borderRadius: 'calc(2 * var(--sa))' }}
          >
            <span className="font-medium text-[#0056b3]" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>
              #{tag.name}
            </span>
            <span className="font-medium text-[#0056b3]" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>
              {tag.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
