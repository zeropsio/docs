import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconStrapi = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 244 244"
      preserveAspectRatio="xMidYMid meet"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <g fill="#8E75FF" fillRule="evenodd">
        <path d="M161.893 165.833v-78.73a5.077 5.077 0 0 0-5.077-5.076H78.178V.76h159.815a5.077 5.077 0 0 1 5.078 5.077v159.996h-81.178Z" />
        <path
          d="M78.178.76v81.267H3.124a2.539 2.539 0 0 1-1.796-4.333L78.178.76ZM161.893 240.966v-75.133h81.178l-76.844 76.927a2.539 2.539 0 0 1-4.334-1.794ZM78.178 82.027h81.176a2.539 2.539 0 0 1 2.539 2.538v81.268H83.255a5.077 5.077 0 0 1-5.077-5.077v-78.73Z"
          opacity=".405"
        />
      </g>
    </svg>
  );
};

export default IconStrapi;
