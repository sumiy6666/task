import React from 'react';

// Article body as a list of blocks: { type: 'p' | 'h', text }.
export function ArticleContent({ blocks }) {
  return (
    <>
      {blocks.map((block, i) =>
        block.type === 'h' ? <h3 key={i}>{block.text}</h3> : <p key={i}>{block.text}</p>
      )}
    </>
  );
}
