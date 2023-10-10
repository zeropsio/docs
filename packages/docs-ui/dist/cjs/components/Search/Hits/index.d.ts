import React from "react";
import { ConfigureProps } from "react-instantsearch";
export type Hierarchy = "lvl0" | "lvl1" | "lvl2" | "lvl3" | "lvl4" | "lvl5";
export type HitType = {
    hierarchy: {
        lvl0: string | null;
        lvl1: string | null;
        lvl2: string | null;
        lvl3: string | null;
        lvl4: string | null;
        lvl5: string | null;
    };
    _tags: string[];
    url: string;
    type?: "lvl1" | "lvl2" | "lvl3" | "lvl4" | "lvl5" | "content";
    content?: string;
    __position: number;
    __queryID?: string;
    objectID: string;
};
export type GroupedHitType = {
    [k: string]: HitType[];
};
export type SearchHitWrapperProps = {
    configureProps: ConfigureProps;
    indices: string[];
} & Omit<SearchHitsProps, "indexName" | "setNoResults">;
export type IndexResults = {
    [k: string]: boolean;
};
export declare const SearchHitsWrapper: ({ configureProps, indices, ...rest }: SearchHitWrapperProps) => React.JSX.Element;
export type SearchHitsProps = {
    indexName: string;
    setNoResults: (index: string, value: boolean) => void;
    checkInternalPattern?: RegExp;
};
export declare const SearchHits: ({ indexName, setNoResults, checkInternalPattern, }: SearchHitsProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map