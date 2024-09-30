import React from 'react';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import type { Props } from '@theme/EditThisPage';
import { Button } from 'docs-ui';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <Button variant="secondary">
      <Link
        href={editUrl}
        target="_blank"
        rel="noreferrer noopener"
        className={clsx(ThemeClassNames.common.editThisPage)}
      >
        <Translate
          id="theme.common.editThisPage"
          description="The link label to edit the current page"
        >
          Edit this page
        </Translate>
      </Link>
    </Button>
  );
}
