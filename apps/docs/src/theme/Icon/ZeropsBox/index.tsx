import { IconProps } from '@medusajs/icons/dist/types';
import React from 'react';

const IconZeropsBox = ({ color = 'currentColor', ...props }: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <g
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}>
        <path d="M10 2.25 16.75 6.13v7.74L10 17.75l-6.75-3.88V6.13L10 2.25Z" />
        <path d="M3.25 6.13 10 10l6.75-3.87" />
        <path d="M10 10v7.75" />
      </g>
    </svg>
  );
};

export default IconZeropsBox;
