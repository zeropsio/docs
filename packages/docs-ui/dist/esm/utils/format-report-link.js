import { GITHUB_ISSUES_PREFIX, GITHUB_UI_ISSUES_PREFIX } from "../constants";
export function formatReportLink(title, sectionTitle, type) {
    let prefix = GITHUB_ISSUES_PREFIX;
    if (type === "ui") {
        prefix = GITHUB_UI_ISSUES_PREFIX;
    }
    return `${prefix}&title=${encodeURI(title)}%3A%20Issue%20in%20${encodeURI(sectionTitle)}`;
}
