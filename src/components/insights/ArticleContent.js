import React from 'react';

export function ArticleContent({ content }) {
  return (
    <div style={{ padding: 'calc(1.5 * var(--sa)) 0' }}>
      {/* Section 1 Title */}
      <h2 className="font-semibold text-gray-900" style={{ fontSize: 'calc(1.5 * var(--fa) + var(--fb))', marginBottom: 'calc(1 * var(--sa))', lineHeight: 1.3 }}>
        {content.section1Title}
      </h2>

      {/* Section 1 Paragraph */}
      <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>
        {content.paragraph1}
      </p>

      {/* Source Link */}
      {content.source1 && (
        <a href="#" className="text-[#00A4E4] hover:underline" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', display: 'inline-block', marginBottom: 'calc(2 * var(--sa))' }}>
          {content.source1}
        </a>
      )}

      {/* Divider */}
      <hr className="border-0" style={{ borderTop: 'calc(0.05 * var(--sa)) solid #eaeaea', margin: 'calc(2 * var(--sa)) 0' }} />

      {/* Section 2 Title */}
      <h3 className="font-semibold text-gray-900" style={{ fontSize: 'calc(1.5 * var(--fa) + var(--fb))', marginBottom: 'calc(1.2 * var(--sa))' }}>
        {content.section2Title}
      </h3>

      {/* Two Column Text */}
      <div className="flex max-sm:flex-col" style={{ gap: 'calc(3 * var(--sa))', marginBottom: 'calc(0.8 * var(--sa))' }}>
        <div className="flex-1">
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>
            {content.splitTextLeft}
          </p>
          {content.source2 && (
            <a href="#" className="text-[#00A4E4] hover:underline" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>
              {content.source2}
            </a>
          )}
        </div>
        <div className="flex-1">
          <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>
            {content.splitTextRight}
          </p>
          {content.source3 && (
            <a href="#" className="text-[#00A4E4] hover:underline" style={{ fontSize: 'calc(0.8 * var(--fa) + var(--fb))' }}>
              {content.source3}
            </a>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-0" style={{ borderTop: 'calc(0.05 * var(--sa)) solid #eaeaea', margin: 'calc(2 * var(--sa)) 0' }} />

      {/* Section 3 - if exists */}
      {content.section3Title && (
        <>
          <h3 className="font-semibold text-gray-900" style={{ fontSize: 'calc(1.5 * var(--fa) + var(--fb))', marginBottom: 'calc(1.2 * var(--sa))' }}>
            {content.section3Title}
          </h3>

          <div className="flex max-sm:flex-col" style={{ gap: 'calc(3 * var(--sa))' }}>
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))', marginBottom: 'calc(0.8 * var(--sa))' }}>
                {content.section3Left}
              </p>
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))' }}>
                {content.section3Left2}
              </p>
            </div>
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))' }}>
                {content.section3Right}
              </p>
            </div>
          </div>

          <hr className="border-0" style={{ borderTop: 'calc(0.05 * var(--sa)) solid #eaeaea', margin: 'calc(2 * var(--sa)) 0' }} />
        </>
      )}
    </div>
  );
}
