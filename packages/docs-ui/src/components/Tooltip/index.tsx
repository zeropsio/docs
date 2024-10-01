'use client';

import React, { useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import type { ITooltip } from 'react-tooltip';
import clsx from 'clsx';
import 'react-tooltip/dist/react-tooltip.css';

export type TooltipProps = {
  text?: string;
  tooltipClassName?: string;
  html?: string;
  tooltipChildren?: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement> &
  ITooltip;

export const Tooltip = ({
  text = '',
  tooltipClassName = '',
  children,
  html = '',
  tooltipChildren,
  className,
  ...tooltipProps
}: TooltipProps) => {
  const elementId = useId();

  return (
    <>
      <span
        id={elementId}
        data-tooltip-content={text}
        data-tooltip-html={html}
        data-tooltip-id={elementId}
        className={className}
      >
        {children}
      </span>
      <ReactTooltip
        anchorId={elementId}
        // anchorSelect={elementId ? `#${elementId}` : undefined}
        className={clsx(
          'border-[#DEE1E4] dark:border-[#323237] !border !border-solid',
          '!text-compact-x-small-plus !shadow-tooltip dark:!shadow-tooltip-dark !rounded-docs_DEFAULT',
          '!py-docs_0.4 !z-[399] hidden !px-docs_1 lg:block',
          '!bg-medusa-bg-base',
          '!text-medusa-fg-subtle',
          tooltipClassName
        )}
        wrapper="span"
        noArrow={true}
        positionStrategy={'fixed'}
        {...tooltipProps}
      >
        {tooltipChildren}
      </ReactTooltip>
    </>
  );
};
