import React from 'react';

type AsciiGraphProps = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

const AsciiGraph: React.FC<AsciiGraphProps> = ({
  children,
  className,
  ariaLabel,
}) => {
  return (
    <pre
      className={`ascii-graph${className ? ` ${className}` : ''}`}
      aria-label={ariaLabel}
    >
      {children}
    </pre>
  );
};

export default AsciiGraph;
