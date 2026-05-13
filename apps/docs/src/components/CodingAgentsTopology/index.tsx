import React, { useState } from 'react';
import { render } from './grid';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildRemote, buildLocal } = require('./build.cjs');

type Mode = 'remote' | 'local';


const CodingAgentsTopology: React.FC = () => {
  const [mode, setMode] = useState<Mode>('remote');
  const diagram = mode === 'remote' ? buildRemote() : buildLocal();

  return (
    <div className="topology-toggle">
      <div
        className="topology-toggle__control"
        role="tablist"
        aria-label="Where the agent runs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'remote'}
          className={`topology-toggle__button${
            mode === 'remote' ? ' topology-toggle__button--active' : ''
          }`}
          onClick={() => setMode('remote')}
        >
          Remote (zcp service)
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'local'}
          className={`topology-toggle__button${
            mode === 'local' ? ' topology-toggle__button--active' : ''
          }`}
          onClick={() => setMode('local')}
        >
          Local (zcli vpn up)
        </button>
      </div>
      <pre
        className="ascii-graph"
        aria-label="Zerops development project topology"
      >
        {render(diagram)}
      </pre>
    </div>
  );
};

export default CodingAgentsTopology;
