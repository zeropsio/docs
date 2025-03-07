import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconMariadb = (props: IconProps) => {
  return (
    <svg
      width={props.width || 20}
      height={props.height || 20}
      viewBox="0 0 305 305"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={clsx('text-ui-fg-subtle', props.className)}
    >
      <path
        d="M301.4 55.7c-.8-.7-1.9-1-2.9-1-2.9 0-6.6 2-8.7 3l-.8.4c-3.4 1.7-7.1 2.6-10.8 2.8-3.9.1-7.2.3-11.5.8C241 64.4 229.6 84 218.6 103c-6 10.3-12.2 21-20.7 29.3-1.8 1.7-3.6 3.3-5.6 4.7-8.8 6.5-19.8 11.2-28.4 14.5-8.3 3.2-17.3 6-26 8.7-8 2.5-15.5 4.9-22.4 7.5-3.1 1.2-5.8 2-8.1 2.8-6.3 2.1-10.9 3.6-17.5 8.2-2.6 1.8-5.2 3.7-7 5.1-5.3 4.2-9.9 9.1-13.9 14.6-3.4 5.1-7.3 9.8-11.6 14-1.4 1.4-3.9 2-7.6 2-4.4 0-9.7-.9-15.3-1.9-5.8-1-11.8-2-16.9-2-4.2 0-7.4.7-9.7 2.1 0 0-4 2.3-5.7 5.4l1.7.8c2.6 1.4 5 3.1 7.1 5.1 2.2 2.1 4.7 3.8 7.4 5.2.9.3 1.6.9 2.3 1.5-.7 1-1.7 2.4-2.8 3.8-5.9 7.7-9.4 12.6-7.4 15.3.9.5 2 .7 3 .7 12.9 0 19.8-3.4 28.6-7.6 2.5-1.2 5.2-2.5 8.2-3.8 5.1-2.2 10.6-5.8 16.5-9.5 7.7-5 15.7-10.1 23.5-12.6 6.4-1.9 13-2.9 19.7-2.8 8.2 0 16.8 1.1 25.2 2.2 6.2.8 12.6 1.6 18.9 2 2.4.1 4.7.2 6.9.2 2.9 0 5.9-.1 8.8-.5l.7-.2c4.4-2.7 6.5-8.6 8.5-14.2 1.3-3.6 2.4-6.9 4.1-9l.3-.3c.2-.1.4-.1.5.1v.1c-1.1 22.1-9.9 36.1-18.9 48.5l-6 6.4s8.4 0 13.2-1.8c17.4-5.2 30.6-16.7 40.1-35 2.4-4.7 4.5-9.5 6.3-14.4.2-.4 1.7-1.2 1.5.9 0 .6-.1 1.3-.1 2 0 .4-.1.9-.1 1.3-.2 3-1 9.6-1 9.6l5.4-2.9c13-8.2 23-24.7 30.6-50.5 3.2-10.7 5.5-21.4 7.5-30.8 2.4-11.2 4.5-20.9 7-24.7 3.8-5.9 9.5-9.9 15.1-13.7l2.3-1.6c7-4.9 14-10.6 15.5-21.2v-.2c1.1-7.8.2-9.8-.9-10.7z"
        fill="#003545"
        className="dark:fill-[var(--docs-fg-subtle)]"
      />
    </svg>
  );
};

export default IconMariadb;
