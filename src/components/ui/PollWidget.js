import React from 'react';

export function PollWidget({ question, options, responsesText, title = "RELATED POLLS" }) {
  return (
    <div className="bg-white" style={{ borderRadius: '0.8vw', padding: '1.5vw', boxShadow: '0 0.3vw 1vw rgba(0,0,0,0.05)', marginBottom: '0.5vw' }}>
      <h3 className="uppercase" style={{ fontFamily: 'Avenir, sans-serif', fontWeight: 500, fontSize: '1vw', lineHeight: '100%', letterSpacing: '0em', color: '#000', marginBottom: '1.5vw' }}>
        {title}
      </h3>
      <p className="font-medium text-gray-900" style={{ marginBottom: '1vw', fontSize: '0.9vw' }}>{question}</p>

      <div className="flex flex-col" style={{ gap: '0.5vw' }}>
        {options.map((option, index) => (
          <div key={index} className="relative bg-gray-100 overflow-hidden flex items-center" style={{ height: '2.4vw', borderRadius: '1.2vw' }}>
            {/* Progress Bar */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${option.percentage}%`,
                background: '#11A0DB',
                borderRadius: '1.2vw',
                zIndex: 1
              }}
            />

            {/* Content overlay */}
            <div className="relative flex justify-between w-full" style={{ zIndex: 2, padding: '0 0.8vw' }}>
              <span className="font-semibold text-white" style={{ fontSize: '0.7vw' }}>{option.percentage}%</span>
              <span className="text-[#555]" style={{ fontSize: '0.7vw' }}>{option.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-gray-400" style={{ marginTop: '0.8vw', fontSize: '0.65vw' }}>
        {responsesText}
      </div>
    </div>
  );
}
