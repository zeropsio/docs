import React, { useEffect, useRef } from 'react';
import NavbarSearch from '@theme/Navbar/Search';
import 'meilisearch-docsearch/css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function SearchNavbarItem(): JSX.Element | null {
  const { siteConfig } = useDocusaurusContext();
  const destroyRef = useRef<(() => void) | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only initialize if not already initialized
    if (!destroyRef.current && containerRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const docsearch = require('meilisearch-docsearch').default;
      destroyRef.current = docsearch({
        host: siteConfig.customFields.meilisearchHost,
        apiKey: siteConfig.customFields.meilisearchApiKey,
        indexUid: siteConfig.customFields.meilisearchIndexUid,
        container: containerRef.current,
      });
    }

    // Cleanup function
    return () => {
      if (destroyRef.current) {
        destroyRef.current();
        destroyRef.current = null;
      }
    };
  }, [
    siteConfig.customFields.meilisearchHost,
    siteConfig.customFields.meilisearchApiKey,
    siteConfig.customFields.meilisearchIndexUid,
  ]);

  return (
    <NavbarSearch>
      <div ref={containerRef} />
    </NavbarSearch>
  );
}

export default React.memo(SearchNavbarItem);
