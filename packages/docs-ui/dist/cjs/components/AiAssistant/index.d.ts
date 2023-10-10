import React from "react";
export type ChunkType = {
    stream_end: boolean;
} & ({
    type: "relevant_sources";
    content: {
        relevant_sources: RelevantSourcesType[];
    };
} | {
    type: "partial_answer";
    content: PartialAnswerType;
} | {
    type: "identifiers";
    content: IdentifierType;
} | {
    type: "error";
    content: ErrorType;
});
export type RelevantSourcesType = {
    source_url: string;
};
export type PartialAnswerType = {
    text: string;
};
export type IdentifierType = {
    thread_id: string;
    question_answer_id: string;
};
export type ErrorType = {
    reason: string;
};
export type ThreadType = {
    type: "question" | "answer" | "error";
    content: string;
    question_id?: string;
    order: number;
};
export declare const AiAssistant: () => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map