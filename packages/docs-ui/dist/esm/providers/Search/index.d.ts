import React from "react";
import { BadgeProps, SearchProps } from "../../components";
import { SearchClient } from "algoliasearch/lite";
export type SearchCommand = {
    name: string;
    component: React.ReactNode;
    icon?: React.ReactNode;
    title: string;
    badge?: BadgeProps;
};
export type SearchContextType = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    defaultFilters: string[];
    setDefaultFilters: (value: string[]) => void;
    searchClient: SearchClient;
    commands: SearchCommand[];
    command: SearchCommand | null;
    setCommand: React.Dispatch<React.SetStateAction<SearchCommand | null>>;
    modalRef: React.MutableRefObject<HTMLDialogElement | null>;
};
export type AlgoliaProps = {
    appId: string;
    apiKey: string;
    mainIndexName: string;
    indices: string[];
};
export type SearchProviderProps = {
    children: React.ReactNode;
    initialDefaultFilters?: string[];
    algolia: AlgoliaProps;
    searchProps: Omit<SearchProps, "algolia">;
    commands?: SearchCommand[];
    modalClassName?: string;
};
export declare const SearchProvider: ({ children, initialDefaultFilters, searchProps, algolia, commands, modalClassName, }: SearchProviderProps) => React.JSX.Element;
export declare const useSearch: () => SearchContextType;
//# sourceMappingURL=index.d.ts.map