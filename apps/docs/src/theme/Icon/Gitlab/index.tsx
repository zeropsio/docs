import { IconProps } from '@medusajs/icons/dist/types';
import clsx from 'clsx';
import React from 'react';

const IconGitlab = (props: IconProps) => {
  return (
      <svg
        fill="currentColor"
        width={props.width || 20}
        height={props.height || 20}
        viewBox="-2 -2.5 24 24"
        {...props}
        className={clsx('text-ui-fg-subtle', props.className)}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin">
        <path d='M10.006 18.443L6.326 7.118h7.36l-3.68 11.325zm0 0L1.168 7.118h5.158l3.68 11.325zM1.168 7.118l8.838 11.325-9.68-7.032a.762.762 0 0 1-.276-.852l1.118-3.441zm0 0L3.385.296a.38.38 0 0 1 .724 0l2.217 6.822H1.168zm8.838 11.325l3.68-11.325h5.157l-8.837 11.325zm8.837-11.325l1.119 3.441a.762.762 0 0 1-.277.852l-9.68 7.032 8.838-11.325zm0 0h-5.157L15.902.296a.38.38 0 0 1 .725 0l2.216 6.822z' />
      </svg>
  );
};

export default IconGitlab;
