import React from 'react';
import { Tooltip } from 'docs-ui';

function Wip() {
  return (
    <div className="fixed z-40 bottom-2 right-4">
      <Tooltip
        text="Confused? Click to contact us."
        positionStrategy="absolute"
        place="top"
      >
        <a href="https://docs.zerops.io/help/contacts">
          <span
            className="cursor-pointer px-1 text-lg text-neutral-900 dark:text-neutral-200 py-0.5 bg-gray-100 dark:bg-neutral-800 border-medusa-tag-neutral-border border border-solid rounded shadow-none duration-150 hover:scale-105 inline-block"
          >
            🚧 Work in Progress
          </span>
        </a>
      </Tooltip>
    </div>
  );
}

export default Wip;