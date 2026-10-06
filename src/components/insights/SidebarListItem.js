import React from 'react';

// One row of an insights sidebar list: a blue icon circle, a title and a
// short meta line. Used by Related Discussions and Recommended Articles.
export function SidebarListItem({ Icon, title, meta }) {
  return (
    <div className="flex items-center border-b border-[#e5e7eb] last:border-b-0" style={{ gap: 'calc(2.5 * var(--sa))', padding: 'calc(1.5 * var(--sa)) 0' }}>
      <div className="rounded-full bg-[#00A4E4] text-white flex items-center justify-center flex-shrink-0" style={{ width: 'calc(3.45 * var(--da) + var(--db))', height: 'calc(3.45 * var(--da) + var(--db))' }}>
        <Icon strokeWidth={1.5} style={{ width: 'calc(1.75 * var(--da) + var(--db))', height: 'calc(1.75 * var(--da) + var(--db))' }} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <h4 className="text-[#111] max-lg:max-w-none!" style={{ fontSize: 'calc(1.15 * var(--fa) + var(--fb))', fontWeight: 500, lineHeight: 1.36, marginBottom: 'calc(0.3 * var(--sa))', maxWidth: 'calc(15.5 * var(--da) + var(--db))' }}>
          {title}
        </h4>
        <div className="text-[#4b5563]" style={{ fontSize: 'calc(1 * var(--fa) + var(--fb))' }}>
          {meta}
        </div>
      </div>
    </div>
  );
}

export const Separator = () => <span style={{ margin: '0 calc(1.2 * var(--sa))' }}>|</span>;
