export default function PollResultCard({ question, options }) {
  return (
    <div className="flex flex-col w-full">
      <h3 className="font-medium text-[#132742]" style={{ fontSize: '0.9vw', lineHeight: '1.5', marginBottom: '1.8vw', minHeight: '3vw' }}>
        {question}
      </h3>
      <div className="flex flex-col" style={{ gap: '0.7vw' }}>
        {options.map((option, index) => {
          const pctNum = parseInt(option.percentage) || 0;
          return (
            <div
              key={index}
              className="relative flex items-center justify-between overflow-hidden bg-white"
              style={{ borderRadius: '2vw', height: '2.2vw', border: '1px solid #e5e7eb' }}
            >
              {option.highlighted && (
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{ width: `${pctNum}%`, backgroundColor: '#00A4E4', borderRadius: '2vw' }}
                />
              )}
              <span
                className="relative z-10 font-medium"
                style={{ paddingLeft: '1.2vw', fontSize: '0.75vw', color: option.highlighted && pctNum > 20 ? '#fff' : '#132742' }}
              >
                {option.label}
              </span>
              <span
                className="relative z-10 font-medium"
                style={{ paddingRight: '1.2vw', fontSize: '0.75vw', color: '#6b7280' }}
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
