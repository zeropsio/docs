import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconElasticsearch = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path
        d="M62.8 32.5H41.9c.1.5.3 1 .4 1.4.7 2.4 1.1 4.9 1.3 7.5.1 1 .1 2.1.1 3.1s0 2.1-.1 3.1c-.2 2.6-.6 5.1-1.3 7.5-.1.5-.3 1-.4 1.4h20.9c6.6 0 11.9-5.4 11.9-12s-5.3-12-11.9-12z"
        fill="#00a9e5"
      />
      <path
        d="M43.6 47.6c.1-1 .1-2.1.1-3.1s0-2.1-.1-3.1c-.2-2.6-.6-5.1-1.3-7.5-.1-.5-.3-1-.4-1.4H9.6c-1.2 3.8-1.8 7.8-1.8 12s.6 8.2 1.8 12h32.3c.1-.5.3-1 .4-1.4.7-2.4 1.1-4.9 1.3-7.5z"
        fill="#353535"
      />
      <path
        d="M66.4 60.5h-26c-.8 1.8-1.7 3.5-2.7 5.1-1.5 2.5-3.3 4.7-5.3 6.8-.7.7-1.4 1.3-2.1 2-1.4 1.3-3 2.4-4.6 3.5 6.3 4.2 13.9 6.6 22 6.6 13.9 0 26.1-7.1 33.3-17.8-3.7-3.8-8.9-6.2-14.6-6.2z"
        fill="#00bfb3"
      />
      <path
        d="M37.7 65.6c1-1.6 1.9-3.3 2.7-5.1H11.1c3.1 7.1 8.2 13.2 14.7 17.4 1.6-1.1 3.1-2.2 4.6-3.5.7-.6 1.4-1.3 2.1-2 1.9-2 3.7-4.3 5.2-6.8z"
        fill="#019b8f"
      />
      <path
        d="M32.4 16.6c-.7-.7-1.4-1.3-2.1-2-1.4-1.3-3-2.4-4.6-3.5-6.4 4.2-11.5 10.3-14.7 17.4h29.3c-.8-1.8-1.7-3.5-2.7-5.1-1.4-2.5-3.2-4.8-5.2-6.8z"
        fill="#f9b110"
      />
      <path
        d="M47.7 4.5c-8.1 0-15.7 2.4-22 6.6 1.6 1.1 3.1 2.2 4.6 3.5.7.6 1.4 1.3 2.1 2 2 2.1 3.8 4.3 5.3 6.8 1 1.6 1.9 3.3 2.7 5.1h26c5.7 0 10.9-2.4 14.6-6.2C73.8 11.6 61.6 4.5 47.7 4.5z"
        fill="#fed10a"
      />
    </svg>
  );
};

export default IconElasticsearch;
