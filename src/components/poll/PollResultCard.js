export default function PollResultCard({ question, options }) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="font-medium text-[#132742]" style={{ fontSize: 'calc(0.9 * var(--fa) + var(--fb))', lineHeight: '1.5', marginBottom: 'calc(1.8 * var(--sa))', minHeight: 'calc(3 * var(--da) + var(--db))' }}>
        {question}
      </h3>
      <div className="flex flex-col" style={{ gap: 'calc(0.7 * var(--sa))' }}>
        {options.map((option, index) => {
          const pctNum = parseInt(option.percentage) || 0;
          return (
            <div
              key={index}
              className="relative flex items-center justify-between overflow-hidden bg-white"
              style={{ borderRadius: 'calc(2 * var(--sa))', height: 'calc(2.2 * var(--da) + var(--db))', border: '1px solid #e5e7eb' }}
            >
              {option.highlighted && (
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: `${pctNum}%`, backgroundColor: '#00A4E4', borderRadius: 'calc(2 * var(--sa))' }}
                />
              )}
              <span
                className="relative z-10 font-medium"
                style={{ paddingLeft: 'calc(1.2 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))', color: option.highlighted && pctNum > 20 ? '#fff' : '#132742' }}
              >
                {option.label}
              </span>
              <span
                className="relative z-10 font-medium"
                style={{ paddingRight: 'calc(1.2 * var(--sa))', fontSize: 'calc(0.75 * var(--fa) + var(--fb))', color: '#6b7280' }}
              >
                {option.percentage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
