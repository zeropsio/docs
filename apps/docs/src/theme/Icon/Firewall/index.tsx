import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconFirewall = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 406 406"
      fill="currentColor"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
    <path
   d="m 363.606,42.4 c -2.813,-2.813 -6.629,-4.393 -10.607,-4.393 L 203.28,38.014 C 203.186,38.013 203.095,38 203,38 c -0.095,0 -0.187,0.013 -0.281,0.014 l -149.72,0.008 c -8.284,0 -14.999,6.716 -14.999,15 v 299.981 c 0,8.284 6.716,15 15,15 h 300 c 8.284,0 15,-6.716 15,-15 V 53.007 c 0,-3.979 -1.58,-7.794 -4.394,-10.607 z M 68,237.994 v -70.006 h 50 v 70.006 z m 80,0 v -69.996 h 110 v 69.996 z m 140,-70.006 h 50 v 70.006 h -50 z m 50,-30 H 218 V 68.014 L 338,68.008 Z M 188,68.015 v 69.974 H 68 V 68.021 Z M 68,267.994 h 64.923 c 0.026,0 0.051,0.004 0.077,0.004 h 55 v 70.004 H 68 Z m 150,70.008 v -70.004 h 55 c 0.026,0 0.051,-0.004 0.077,-0.004 H 338 v 70.008 z"
   id="path863" />
	    </svg>
  );
};

export default IconFirewall;
