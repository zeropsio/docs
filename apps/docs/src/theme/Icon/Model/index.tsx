import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconModel = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path d="M28.447 16.105 23 13.383V7a1 1 0 0 0-.553-.894l-6-3a1 1 0 0 0-.894 0l-6 3A1 1 0 0 0 9 7v6.382l-5.447 2.723A1 1 0 0 0 3 17v7a1 1 0 0 0 .553.894l6 3a1.001 1.001 0 0 0 .894 0L16 25.119l5.553 2.777a1.001 1.001 0 0 0 .894 0l6-3A1 1 0 0 0 29 24v-7a1 1 0 0 0-.553-.895ZM21 13.383l-4 2v-4.764l4-2Zm-5-8.264L19.764 7 16 8.882 12.236 7Zm-5 3.5 4 2v4.764l-4-2ZM9 25.382l-4-2v-4.764l4 2Zm1-6.5L6.236 17 10 15.118 13.764 17Zm1 1.736 4-2v4.764l-4 2Zm10 4.764-4-2v-4.764l4 2Zm1-6.5L18.236 17 22 15.118 25.764 17Zm5 4.5-4 2v-4.764l4-2Z" fill="currentColor"/>
      <path d="M0 0h32v32H0z" data-name="&lt;Transparent Rectangle&gt;" style={{fill: "none"}}/>
    </svg>
  );
};

export default IconModel;