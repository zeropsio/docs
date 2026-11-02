import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconTerraform = (props: IconProps) => {
  return (
    <svg
      fill="currentColor"
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 24 24"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z" />
    </svg>
  );
};

export default IconTerraform;
