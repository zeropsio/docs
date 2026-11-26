import React from 'react';
import type { IconProps } from '@medusajs/icons/dist/types';
import { ExclamationCircleSolid } from '@medusajs/icons';
import clsx from 'clsx';

export default function AdmonitionIconBeta({
  className,
  ...props
}: IconProps): JSX.Element {
  return (
    <ExclamationCircleSolid
      {...props}
      className={clsx(
        'inline-block mr-0.125 text-medusa-tag-orange-icon',
        className
      )}
    />
  );
}
