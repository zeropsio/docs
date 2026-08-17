import { IconProps } from '@medusajs/icons/dist/types';
import React from 'react';

const IconServersConnected = ({ color = 'currentColor', ...props }: IconProps) => {
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
        strokeWidth={1.5}>
        <path d="M4.5 7.75v5.75A1.5 1.5 0 0 0 6 15h2.25" />
        <rect x="1.75" y="2.25" width="10" height="5.5" rx="1.75" />
        <rect x="8.25" y="12.25" width="10" height="5.5" rx="1.75" />
        <path d="M4.25 5h.007v.007H4.25V5Z" />
        <path d="M6.75 5h3" />
        <path d="M10.75 15h.007v.007h-.007V15Z" />
        <path d="M13.25 15h3" />
      </g>
    </svg>
  );
};

export default IconServersConnected;
