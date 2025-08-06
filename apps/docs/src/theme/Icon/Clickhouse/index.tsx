import { IconProps } from '@medusajs/icons/dist/types';
import { useColorMode } from '@docusaurus/theme-common';
import clsx from 'clsx';
import React from 'react';

const IconClickhouse = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 150 150"
      fill="#000000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('mono-icon', props.className)}
    >
        <path d="M27,25.7c0-.6.5-1.2,1.2-1.2h8.8c.6,0,1.2.5,1.2,1.2v97.7c0,.6-.5,1.2-1.2,1.2h-8.8c-.6,0-1.2-.5-1.2-1.2V25.7Z"/>
        <path d="M49.2,25.7c0-.6.5-1.2,1.2-1.2h8.8c.6,0,1.2.5,1.2,1.2v97.7c0,.6-.5,1.2-1.2,1.2h-8.8c-.6,0-1.2-.5-1.2-1.2V25.7Z"/>
        <path d="M71.4,25.7c0-.6.5-1.2,1.2-1.2h8.8c.6,0,1.2.5,1.2,1.2v97.7c0,.6-.5,1.2-1.2,1.2h-8.8c-.6,0-1.2-.5-1.2-1.2V25.7Z"/>
        <path d="M93.6,25.7c0-.6.5-1.2,1.2-1.2h8.8c.6,0,1.2.5,1.2,1.2v97.7c0,.6-.5,1.2-1.2,1.2h-8.8c-.6,0-1.2-.5-1.2-1.2V25.7Z"/>
        <path d="M115.9,64.6c0-.6.5-1.2,1.2-1.2h8.8c.6,0,1.2.5,1.2,1.2v19.9c0,.6-.5,1.2-1.2,1.2h-8.8c-.6,0-1.2-.5-1.2-1.2v-19.9Z"/>
    </svg>
  );
};

export default IconClickhouse;
