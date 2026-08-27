import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconSeaweedfs = ({ color = 'currentColor', ...props }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}>
      <path
        d="M9.5 18.5c0-3 -2.3-4.2 0-7.5s-2.3-4.5 0-8"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 15.2c-2.4 0.2-4.1-0.9-4.7-3 2.4-0.2 4.1 0.9 4.7 3Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M9.4 11c2.4 0.2 4.1-0.9 4.7-3-2.4-0.2-4.1 0.9-4.7 3Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path
        d="M9.6 7.2c-2.2 0.2-3.7-0.8-4.3-2.7 2.2-0.2 3.7 0.8 4.3 2.7Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <circle cx="15.5" cy="3.5" r="1" stroke={color} strokeWidth={1.5} />
      <circle cx="17" cy="6.8" r="0.6" fill={color} />
    </svg>
  );
};

export default IconSeaweedfs;
