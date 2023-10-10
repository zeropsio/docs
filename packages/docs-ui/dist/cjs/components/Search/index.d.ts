import React from "react";
import { type SearchSuggestionType } from "./Suggestions";
import { AlgoliaProps } from "../../providers";
import { type OptionType } from "../../hooks";
export type SearchProps = {
    algolia: AlgoliaProps;
    isLoading?: boolean;
    suggestions: SearchSuggestionType[];
    checkInternalPattern?: RegExp;
    filterOptions?: OptionType[];
};
export declare const Search: ({ algolia, suggestions, isLoading, checkInternalPattern, filterOptions, }: SearchProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map