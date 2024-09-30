import clsx from 'clsx';
import React, { Suspense, lazy } from 'react';
import { Loading } from '@/components';

export type CommonProps = {
  expandUrl?: string;
  sectionTitle?: string;
  siteUrl?: string;
  // TODO replace this with inferring pathname when using Next.js only
  pathname?: string;
};

export type Type = {
  name: string;
  type: string;
  optional?: boolean;
  defaultValue?: string;
  description?: string;
  featureFlag?: string;
  expandable: boolean;
  children?: Type[];
};

type ParameterTypesType = {
  types: Type[];
  sectionTitle?: string;
} & CommonProps &
  React.HTMLAttributes<HTMLDivElement>;

const TypeListItems = lazy(async () => import('./Items'));

export const TypeList = ({
  types,
  className,
  siteUrl,
  sectionTitle,
  expandUrl,
  pathname,
  ...props
}: ParameterTypesType) => {
  return (
    <div
      className={clsx(
        'bg-docs-bg-surface shadow-card-rest rounded my-docs_1',
        className
      )}
      {...props}
    >
      <Suspense fallback={<Loading />}>
        <TypeListItems
          types={types}
          expandUrl={expandUrl}
          sectionTitle={sectionTitle}
          siteUrl={siteUrl}
          pathname={pathname}
        />
      </Suspense>
    </div>
  );
};
