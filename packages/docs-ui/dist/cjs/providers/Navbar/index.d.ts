import React from "react";
export type NavbarContextType = {
    activeItem: string | null;
    setActiveItem: (value: string) => void;
};
export type NavbarProviderProps = {
    children: React.ReactNode;
    basePath?: string;
};
export declare const NavbarProvider: ({ children, basePath, }: NavbarProviderProps) => React.JSX.Element;
export declare const useNavbar: () => NavbarContextType;
//# sourceMappingURL=index.d.ts.map