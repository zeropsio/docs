import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconAlpine = (props: IconProps) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 20}
        height={props.height || 20}
        fill="#0d597f"
        {...props}
        className={clsx('text-ui-fg-subtle', props.className)}>
        <path d="M23.25 38.81v-6.745l-4.855 4.864c.474.333.968.635 1.48.906.463.243.87.434 1.303.58s.782.24 1.13.304.66.093.95.096m24.822-.562c.045.037.092.07.142.1a2.77 2.77 0 0 0 .385.203 2.93 2.93 0 0 0 .637.194c.296.06.598.088.9.087.3 0 .608-.03.955-.087a7.24 7.24 0 0 0 1.138-.301 9.96 9.96 0 0 0 1.32-.579c.52-.274 1.02-.58 1.503-.918l-3.685-3.6-12.21-12.258-5.356 5.356-7.23-7.455-18.14 17.935a13.82 13.82 0 0 0 1.5.918c.47.246.91.434 1.317.58a7.18 7.18 0 0 0 1.135.301 5.53 5.53 0 0 0 .955.087c.302.001.604-.028.9-.087a3.29 3.29 0 0 0 .637-.194 2.49 2.49 0 0 0 .385-.197l.145-.104 8.193-8.193 2.924-2.808 8.106 8.106 2.837 2.912a1.29 1.29 0 0 0 .145.101 2.52 2.52 0 0 0 .385.2c.206.085.42.15.637.194.255.052.556.087.903.087.3 0 .608-.03.955-.087a6.89 6.89 0 0 0 1.138-.301 9.95 9.95 0 0 0 1.32-.579c.52-.274 1.02-.58 1.503-.918l-6.508-6.37 1.2-1.2 5.63 5.63 3.283 3.254m-.07-33.96l15.998 27.714L48.003 59.71H15.996L-.002 31.997 15.996 4.283z"/>
        <path d="M38.02 30.65l-4.262-4.256.304-.304 4.3 4.244z"/>
      </svg>
  );
};

export default IconAlpine;
