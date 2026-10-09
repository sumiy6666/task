import React from 'react';

// Bars alternate light and dark blue, as in the design.
const BAR_COLORS = ['#11A0DB', '#385E87'];

// `title` heads the card; pass null for a card with just the question.
export function PollWidget({ question, options, responsesText, title = "RELATED POLLS", className = "" }) {
  // "120 responses • 2h ago" is shown with a spaced divider instead of the dot.
  const meta = (responsesText || '').split('•').map((part) => part.trim()).filter(Boolean);

  return (
    <div className={`bg-white ${className}`} style={{ borderRadius: 'calc(1.6 * var(--sa))', padding: 'calc(2.6 * var(--sa)) calc(2 * var(--sa)) calc(1.8 * var(--sa))', boxShadow: '0 calc(0.3 * var(--sa)) calc(1.5 * var(--sa)) rgba(0, 62, 207, 0.06)' }}>
      {title && <h3 className="uppercase" style={{ fontWeight: 400, fontSize: 'calc(1 * var(--fa) + var(--fb))', lineHeight: 1.2, color: '#000', marginBottom: 'calc(2 * var(--sa))' }}>
        {title}
      </h3>}
      <p className="text-[#111]" style={{ fontWeight: 500, fontSize: 'calc(1.2 * var(--fa) + var(--fb))', lineHeight: 1.35, marginBottom: 'calc(1 * var(--sa))' }}>{question}</p>

      <div className="flex flex-col" style={{ gap: 'calc(0.7 * var(--sa))' }}>
        {options.map((option, index) => (
          <div key={index} className="flex items-center overflow-hidden rounded-full bg-[#e9eef2]" style={{ height: 'calc(2.1 * var(--da) + var(--db))' }}>
            {/* Filled share; wide enough to hold its own percentage. */}
            <div
              className="h-full rounded-full flex items-center justify-end text-white flex-shrink-0"
              style={{
                width: `max(${option.percentage}%, calc(4.6 * var(--da) + var(--db)))`,
                background: BAR_COLORS[index % BAR_COLORS.length],
                paddingRight: 'calc(0.9 * var(--sa))',
                fontSize: 'calc(1.05 * var(--fa) + var(--fb))'
              }}
            >
              {option.percentage}%
            </div>
            {/* Takes the space left beside the fill, so it never runs under it. */}
            <span className="flex-1 min-w-0 text-right text-[#385E87] whitespace-nowrap overflow-hidden text-ellipsis" title={option.label} style={{ padding: '0 calc(0.8 * var(--sa))', fontSize: 'calc(0.95 * var(--fa) + var(--fb))' }}>
              {option.label}
            </span>
          </div>
        ))}
      </div>

      {meta.length > 0 && (
        <div className="text-[#bdbdbd]" style={{ marginTop: 'calc(1.6 * var(--sa))', fontSize: 'calc(0.95 * var(--fa) + var(--fb))' }}>
          {meta.map((part, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span style={{ margin: '0 calc(1.2 * var(--sa))' }}>|</span>}
              {part}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
