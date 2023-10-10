import React from "react";
import { ExtraData } from "../../providers/Analytics";
export type FeedbackProps = {
    event: string;
    pathName: string;
    reportLink?: string;
    question?: string;
    positiveBtn?: string;
    negativeBtn?: string;
    positiveQuestion?: string;
    negativeQuestion?: string;
    submitBtn?: string;
    submitMessage?: string;
    showPossibleSolutions?: boolean;
    className?: string;
    extraData?: ExtraData;
    vertical?: boolean;
    showLongForm?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const Feedback: ({ event, pathName, reportLink, question, positiveBtn, negativeBtn, positiveQuestion, negativeQuestion, submitBtn, submitMessage, showPossibleSolutions, className, extraData, vertical, showLongForm, }: FeedbackProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map