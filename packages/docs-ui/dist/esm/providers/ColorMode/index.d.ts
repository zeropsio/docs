import React from "react";
export type ColorMode = "light" | "dark";
export type ColorModeContextType = {
    colorMode: ColorMode;
    setColorMode: (value: ColorMode) => void;
    toggleColorMode: () => void;
};
export type ColorModeProviderProps = {
    children: React.ReactNode;
};
export declare const ColorModeProvider: ({ children }: ColorModeProviderProps) => React.JSX.Element;
export declare const useColorMode: () => ColorModeContextType;
//# sourceMappingURL=index.d.ts.map