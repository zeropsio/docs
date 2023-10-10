import React from "react";
export type DetailsProps = {
    openInitial?: boolean;
    summaryContent?: React.ReactNode;
    summaryElm?: React.ReactNode;
} & React.HTMLAttributes<HTMLDetailsElement>;
export declare const Details: ({ openInitial, summaryContent, summaryElm, children, ...props }: DetailsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map