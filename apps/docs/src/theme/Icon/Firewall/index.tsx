import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconFirewall = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 512 512"
      fill="currentColor"
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      xmlSpace="preserve"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
        <path d="M473.82,40.283H38.18C17.127,40.283,0,57.411,0,78.463c0,13.495,0,341.346,0,355.074c0,21.052,17.127,38.18,38.18,38.18 H473.82c21.052,0,38.18-17.127,38.18-38.18c0-13.568,0-341.517,0-355.074C512,57.411,494.873,40.283,473.82,40.283z  M367.111,78.463h106.71v92.904h-106.71V78.463z M183.068,78.463h145.863v92.904H183.068V78.463z M38.18,78.463h106.708v92.904 H38.18V78.463z M38.18,209.547h198.73v92.905H38.18V209.547z M144.888,433.536H38.18v-92.904h106.708V433.536z M328.931,433.536 H183.068v-92.904h145.863V433.536z M473.82,433.537h-106.71v-92.904h106.71V433.537z M473.82,302.452H275.09v-92.905h198.73 V302.452z" />
    </svg>
  );
};

export default IconFirewall;
