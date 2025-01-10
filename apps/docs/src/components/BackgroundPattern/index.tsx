import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="absolute top-0 right-0 -z-10 pointer-events-none">
      <svg
        width="400"
        height="300"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60"
      >
        <defs>
          <linearGradient id="fade" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748b" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#64748b" stopOpacity="0.1"/>
          </linearGradient>
        </defs>
        <g stroke="url(#fade)" strokeWidth="1.5">
          {[...Array(6)].map((_, i) => (
            <path
              key={i}
              d={`M${400 - i * 35} 0 L400 ${i * 35}`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default BackgroundPattern; 