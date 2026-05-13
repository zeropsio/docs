import React from 'react';
import { render } from '../CodingAgentsTopology/grid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildLayout } = require('./build.cjs');

type LogoSlot = { src: string; alt: string; col: number; row: number };

const IntroAgentVisual: React.FC = () => {
  const { grid, logos } = buildLayout() as {
    grid: any[][];
    logos: LogoSlot[];
  };

  return (
    <div
      className="intro-ascii"
      role="img"
      aria-label="ZCP MCP + your agent → recipes for any stack → one Zerops project with multiple runtimes and managed services"
    >
      <pre className="ascii-graph intro-ascii__frame">{render(grid)}</pre>
      {logos.map((l, i) => (
        <img
          key={i}
          className="intro-ascii__logo"
          src={l.src}
          alt={l.alt}
          title={l.alt}
          style={{
            left: `calc(${l.col + 0.5}ch)`,
            top: `calc((${l.row} + 0.5) * 1lh)`,
          }}
        />
      ))}
    </div>
  );
};

export default IntroAgentVisual;
