import {
  ColorModeProvider,
  ModalProvider,
  NotificationProvider,
} from 'docs-ui';
import React from 'react';
import SkipToContent from '@theme/SkipToContent';

type DocsProvidersProps = {
  children?: React.ReactNode;
};

const DocsProviders = ({ children }: DocsProvidersProps) => {
  return (
    <ColorModeProvider>
      <ModalProvider>
        <NotificationProvider>
          <SkipToContent />
          {children}
        </NotificationProvider>
      </ModalProvider>
    </ColorModeProvider>
  );
};

export default DocsProviders;
