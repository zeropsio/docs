import React from "react";
export type AiAssistantFeedbackType = "upvote" | "downvote";
export type AiAssistantContextType = {
    getAnswer: (question: string, thread_id?: string) => Promise<Response>;
    sendFeedback: (questionId: string, reaction: AiAssistantFeedbackType) => Promise<Response>;
};
export type AiAssistantProviderProps = {
    children?: React.ReactNode;
    apiUrl: string;
    recaptchaSiteKey: string;
    websiteId: string;
};
export declare const AiAssistantProvider: ({ apiUrl, recaptchaSiteKey, websiteId, children, }: AiAssistantProviderProps) => React.JSX.Element;
export declare const useAiAssistant: () => AiAssistantContextType;
//# sourceMappingURL=index.d.ts.map