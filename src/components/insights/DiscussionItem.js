import React from 'react';

export function DiscussionItem({ discussion }) {
  return (
    <div className="flex border-b border-gray-100 last:border-b-0" style={{ gap: '0.8vw', padding: '1vw 0' }}>
      <div className="rounded-full bg-[#00a4e4] flex items-center justify-center flex-shrink-0" style={{ width: '2.8vw', height: '2.8vw' }}>
        <img src="/images/chaticon.svg" alt="Discussion" style={{ width: '1.3vw', height: '1.3vw', filter: 'brightness(0) invert(1)' }} />
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 leading-snug" style={{ fontSize: '0.9vw', marginBottom: '0.3vw' }}>
          {discussion.title}
        </h4>
        <div className="text-gray-400" style={{ fontSize: '0.65vw' }}>
          {discussion.replies} replies &nbsp;|&nbsp; {discussion.timeAgo}
        </div>
      </div>
    </div>
  );
}
