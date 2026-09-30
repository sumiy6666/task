import React from 'react';

export function PopularTagsList({ tags }) {
  return (
    <div className="bg-white flex flex-col h-full" style={{ borderRadius: '1.2vw', padding: '1.8vw', boxShadow: '0 0.2vw 1vw rgba(0,0,0,0.03)' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1vw' }}>
        POPULAR TAGS
      </h3>
      <hr className="border-0" style={{ borderTop: '0.05vw solid #eaeaea', margin: '0 0 1.5vw 0' }} />
      <div className="flex flex-col" style={{ gap: '0.8vw' }}>
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-[#f0f7ff] cursor-pointer hover:bg-[#e0efff] transition-colors"
            style={{ padding: '0.8vw 1.2vw', borderRadius: '2vw' }}
          >
            <span className="font-medium text-[#0056b3]" style={{ fontSize: '0.8vw' }}>
              #{tag.name}
            </span>
            <span className="font-medium text-[#0056b3]" style={{ fontSize: '0.8vw' }}>
              {tag.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
