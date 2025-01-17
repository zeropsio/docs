import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconLaravelJetstream = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
        <g id="Layer_1-2" data-name="Layer_1">
          <path fill="#6875f5" class="cls-1" d="M11.4,44.43C4.56,40.2,0,32.63,0,24,0,10.75,10.74,0,24,0c5.02,0,9.92,1.57,14,4.5-.2,17.91-11.1,33.24-26.6,39.93Z"/>
          <path fill="#6875f5" class="cls-1" d="M14.13,45.89c3.1,1.4,6.46,2.12,9.87,2.12,13.26,0,24-10.74,24-24,0-3.52-.76-6.86-2.12-9.87-4.66,15.14-16.61,27.09-31.75,31.75h0Z"/>
        </g>
    </svg>
  );
};

export default IconLaravelJetstream;
