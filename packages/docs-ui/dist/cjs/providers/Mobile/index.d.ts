import React from "react";
export type MobileContextType = {
    isMobile?: boolean;
};
export type MobileProviderProps = {
    children: React.ReactNode;
};
export declare const MobileProvider: ({ children }: MobileProviderProps) => React.JSX.Element;
export declare const useMobile: () => MobileContextType;
//# sourceMappingURL=index.d.ts.map