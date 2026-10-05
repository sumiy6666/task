import React from 'react';

export function PollWidget({ question, options, responsesText, title = "RELATED POLLS" }) {
  return (
    <div className="bg-white" style={{ borderRadius: 'calc(0.8 * var(--sa))', padding: 'calc(1.5 * var(--sa))', boxShadow: '0 calc(0.3 * var(--sa)) calc(1 * var(--sa)) rgba(0,0,0,0.05)', marginBottom: 'calc(0.5 * var(--sa))' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: 'calc(1.5 * var(--sa))' }}>
        {title}
      </h3>
      <p className="font-medium text-gray-900" style={{ marginBottom: 'calc(1 * var(--sa))', fontSize: 'calc(0.9 * var(--fa) + var(--fb))' }}>{question}</p>

      <div className="flex flex-col" style={{ gap: 'calc(0.5 * var(--sa))' }}>
        {options.map((option, index) => (
          <div key={index} className="relative bg-gray-100 overflow-hidden flex items-center" style={{ height: 'calc(2.4 * var(--da) + var(--db))', borderRadius: 'calc(1.2 * var(--sa))' }}>
            {/* Progress Bar */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${option.percentage}%`,
                background: '#11A0DB',
                borderRadius: 'calc(1.2 * var(--sa))',
                zIndex: 1
              }}
            />

            {/* Content overlay */}
            <div className="relative flex justify-between w-full" style={{ zIndex: 2, padding: '0 calc(0.8 * var(--sa))' }}>
              <span className="font-semibold text-white" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>{option.percentage}%</span>
              <span className="text-[#555]" style={{ fontSize: 'calc(0.7 * var(--fa) + var(--fb))' }}>{option.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-gray-400" style={{ marginTop: 'calc(0.8 * var(--sa))', fontSize: 'calc(0.65 * var(--fa) + var(--fb))' }}>
        {responsesText}
      </div>
    </div>
  );
}
