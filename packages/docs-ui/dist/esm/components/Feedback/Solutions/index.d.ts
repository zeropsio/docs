import React from "react";
export type SolutionsProps = {
    feedback: boolean;
    message?: string;
};
export type GitHubSearchItem = {
    url: string;
    html_url: string;
    title: string;
    [key: string]: unknown;
};
export declare const Solutions: ({ feedback, message }: SolutionsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map