import React from 'react';
import type { Props } from '@theme/Admonition';
import AdmonitionTypeWarning from '@theme/Admonition/Type/Warning';
import IconBeta from '@theme/Admonition/Icon/Beta';

// Custom :::beta admonition, registered in docusaurus.config.js
export default function AdmonitionTypeBeta(props: Props): JSX.Element {
  return <AdmonitionTypeWarning icon={<IconBeta />} title="Beta" {...props} />;
}
