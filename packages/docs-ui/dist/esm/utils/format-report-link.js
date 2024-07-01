import { GITHUB_ISSUES_PREFIX } from "../constants";
export function formatReportLink(title, sectionTitle) {
    const prefix = GITHUB_ISSUES_PREFIX;
    return `${prefix}&title=${encodeURI(title)}%3A%20Issue%20in%20${encodeURI(sectionTitle)}`;
}
