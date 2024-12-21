import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconZerops = (props: IconProps) => {
  return (
    <svg
        width={props.width || 20}
        height={props.height || 20}
      viewBox="0 0 520 621"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}>
      <path d="M242.657 3.19771L31.2392 84.0014C22.0201 87.6157 14.1063 93.928 8.5327 102.113C2.95913 110.298 -0.0147199 119.974 5.47863e-05 129.876V333.3L97.1612 277.463V163.083L259.998 100.605V0C254.072 0.0127634 248.198 1.09607 242.657 3.19771Z" fill="#68BAB2"/>
    <path d="M98.883 458.749L259.998 365.892V253.727L11.069 397.254C7.71812 399.218 4.93563 402.019 2.99493 405.382C1.05424 408.746 0.0221225 412.557 0 416.441V491.587C0.0836722 501.405 3.10339 510.974 8.67059 519.062C14.2378 527.149 22.0978 533.386 31.2392 536.97L242.657 617.773C248.198 619.875 254.072 620.958 259.998 620.971V520.366L98.883 458.749Z" fill="#68BAB2"/>
    <path d="M509.667 221.749C512.844 219.929 515.477 217.294 517.294 214.115C519.11 210.936 520.044 207.33 519.998 203.669V129.876C520.013 119.974 517.039 110.297 511.466 102.113C505.892 93.9279 497.978 87.6156 488.759 84.0013L277.218 3.19771C271.716 1.11058 265.885 0.0275195 260 0V100.605L419.885 162.099L260 254.218V366.383L509.667 221.749Z" fill="#54AEA3"/>
    <path d="M277.218 617.773L488.759 536.969C497.901 533.386 505.761 527.149 511.328 519.061C516.895 510.973 519.915 501.405 519.998 491.587V286.072L422.837 342.155V458.134L260 520.366V620.971C265.885 620.943 271.716 619.86 277.218 617.773Z" fill="#54AEA3"/>
    </svg>
    
  );
};

export default IconZerops;