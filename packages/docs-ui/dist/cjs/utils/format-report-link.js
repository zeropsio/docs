"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatReportLink = void 0;
const constants_1 = require("../constants");
function formatReportLink(title, sectionTitle) {
    const prefix = constants_1.GITHUB_ISSUES_PREFIX;
    return `${prefix}&title=${encodeURI(title)}%3A%20Issue%20in%20${encodeURI(sectionTitle)}`;
}
exports.formatReportLink = formatReportLink;
