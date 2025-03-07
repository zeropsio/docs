import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconTwill = (props: IconProps) => {
  return (
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 93 39"
        width={props.width || 20}
        height={props.height || 20}
        {...props}
        className={clsx('text-ui-fg-subtle dark:fill-[var(--docs-fg-subtle)]', props.className)}>
        <path d="M72 1h9v37h-9zm12 0h9v37h-9z"/>
        <circle cx="64.5" cy="5.5" r="5.1" fill="0"/>
        <path d="M45.924 26.548 39.686 13H34.13l-6.237 13.158L21.898 13H12V6H3v7H0v7h3v18h9V20h3.527l9.344 18h5.994l5.946-13.694L43.049 38h5.896l9.516-18H60v18h9V13H52.21z"/>
      </svg>
  );
};

export default IconTwill;
