import React from "react";
export type PageLoadingContextType = {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
export type PageLoadingProviderProps = {
    children?: React.ReactNode;
};
export declare const PageLoadingProvider: ({ children }: PageLoadingProviderProps) => React.JSX.Element;
export declare const usePageLoading: () => PageLoadingContextType;
//# sourceMappingURL=index.d.ts.map