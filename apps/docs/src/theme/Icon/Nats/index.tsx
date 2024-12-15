import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconNats = (props: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 256 266"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}>
      <path fill="#34a574" d="M128 0h128v103.768H128z"/>
      <path fill="#27aae1" d="M0 0h128v103.768H0z"/>
      <path fill="#8dc63f" d="M256 103.863v103.769h-84.193v57.395l-62.622-57.205l18.815-.76V103.863z"/>
      <path fill="#375c93" d="M128 103.863v120.678l-18.815-16.719H0V103.863z"/>
      <path fill="#fff" d="M181.024 134.177V48.273h30.599v111.086H165.25l-93.6-87.424v87.519H40.956V48.273h47.988z"/>
    </svg>
  );
};

export default IconNats;
