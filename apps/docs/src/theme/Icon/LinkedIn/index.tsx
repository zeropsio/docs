import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconLinkedIn = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path
        d="M15.25 1H4.75C2.67925 1 1 2.67925 1 4.75V15.25C1 17.3208 2.67925 19 4.75 19H15.25C17.3215 19 19 17.3208 19 15.25V4.75C19 2.67925 17.3215 1 15.25 1ZM7 15.25H4.75V7H7V15.25ZM5.875 6.049C5.1505 6.049 4.5625 5.4565 4.5625 4.726C4.5625 3.9955 5.1505 3.403 5.875 3.403C6.5995 3.403 7.1875 3.9955 7.1875 4.726C7.1875 5.4565 6.60025 6.049 5.875 6.049ZM16 15.25H13.75V11.047C13.75 8.521 10.75 8.71225 10.75 11.047V15.25H8.5V7H10.75V8.32375C11.797 6.38425 16 6.241 16 10.1808V15.25Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default IconLinkedIn;
