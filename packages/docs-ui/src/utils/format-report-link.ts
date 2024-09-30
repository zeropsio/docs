import { GITHUB_ISSUES_PREFIX } from '../constants';

export type ReportLinkType = 'default';

export function formatReportLink(title: string, sectionTitle: string) {
  const prefix = GITHUB_ISSUES_PREFIX;

  return `${prefix}&title=${encodeURI(title)}%3A%20Issue%20in%20${encodeURI(
    sectionTitle
  )}`;
}
