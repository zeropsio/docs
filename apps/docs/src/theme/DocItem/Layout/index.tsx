import React from 'react';
import clsx from 'clsx';
import { useWindowSize } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import Unlisted from '@theme/Unlisted';
import type { Props } from '@theme/DocItem/Layout';
import { useSidebar } from '../../../providers/Sidebar';
import Footer from '@theme/Footer';
import { NavigationButtons } from "../../../components/NavigationButons";


/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc();
  const windowSize = useWindowSize();

  const hidden = frontMatter.hide_table_of_contents;
  const canRender = !hidden && toc.length > 0;

  const mobile = canRender ? <DocItemTOCMobile /> : undefined;

  const desktop =
    canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? (
      <DocItemTOCDesktop />
    ) : undefined;

  return {
    hidden,
    mobile,
    desktop,
  };
}

export default function DocItemLayout({ children }: Props): JSX.Element {
  const docTOC = useDocTOC();
  const {
    metadata: { unlisted, previous, next },
  } = useDoc();
  const sidebarContext = useSidebar();
  return (
    <div className="row m-0">
      <div
        className={clsx(
          'col',
          'my-0 mx-auto max-w-main-content w-full ml-auto lg:py-0 py-0 px-1',
          !docTOC.hidden && 'w-9/12 !max-w-[760px]',
          docTOC.hidden && 'flex justify-center !max-w-[920px]'
        )}
      >
        <div className={clsx(docTOC.hidden && 'w-full')}>
          {unlisted && <Unlisted />}
          <DocVersionBanner />
          <div>
            <article className={clsx('[&>*:first-child]:mt-0', 'px-1')}>
              <DocBreadcrumbs />
              <DocVersionBadge />
              {docTOC.mobile}
              <DocItemContent>{children}</DocItemContent>
              <NavigationButtons
                prevPage={previous && {
                  href: previous.permalink,
                  title: previous.title
                }}
                nextPage={next && {
                  href: next.permalink,
                  title: next.title
                }}
              />
              <DocItemFooter />
            </article>
            <DocItemPaginator />
            <Footer />
          </div>
        </div>
      </div>
      {docTOC.desktop && (
        <div className="col toc-wrapper">{docTOC.desktop}</div>
      )}
    </div>
  );
}
