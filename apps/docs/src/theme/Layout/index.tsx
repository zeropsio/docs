import React, { useEffect } from 'react';
import clsx from 'clsx';
import ErrorBoundary from '@docusaurus/ErrorBoundary';
import {
  PageMetadata,
  SkipToContentFallbackId,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import { useKeyboardNavigation } from '@docusaurus/theme-common/internal';
import SkipToContent from '@theme/SkipToContent';
import Navbar from '@theme/Navbar';
import LayoutProvider from '@theme/Layout/Provider';
import ErrorPageContent from '@theme/ErrorPageContent';
import type { Props } from '@theme/Layout';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { useLocation } from '@docusaurus/router';
import Wip from '@site/src/components/work-in-progress';

export default function Layout(props: Props): JSX.Element {
  const {
    children,
    wrapperClassName,
    // Not really layout-related, but kept for convenience/retro-compatibility
    title,
    description,
  } = props;

  useKeyboardNavigation();
  const isBrowser = useIsBrowser();
  const location = useLocation();

  useEffect(() => {
    if (isBrowser) {
      const handlePlay = () => {};

      const videos = document.querySelectorAll('video');
      videos.forEach((video) =>
        video.addEventListener('play', handlePlay, {
          once: true,
          capture: true,
        })
      );

      return () => {
        videos.forEach((video) =>
          video.removeEventListener('play', handlePlay)
        );
      };
    }
  }, [isBrowser, location.pathname]);

  return (
    <LayoutProvider>
      <PageMetadata title={title} description={description} />

      <SkipToContent />
      <Wip />
      <Navbar />

      <div
        id={SkipToContentFallbackId}
        className={clsx(
          ThemeClassNames.wrapper.main,
          'flex-auto flex-grow flex-shrink-0',
          wrapperClassName
        )}
      >
        <ErrorBoundary fallback={(params) => <ErrorPageContent {...params} />}>
          {children}
        </ErrorBoundary>
      </div>
    </LayoutProvider>
  );
}
