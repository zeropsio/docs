import React from "react";
import { NavbarIconButtonProps } from "../../IconButton";
export type NavbarMobileMenuButtonProps = {
    buttonProps?: NavbarIconButtonProps;
    mobileSidebarOpen: boolean;
    setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading?: boolean;
};
export declare const NavbarMobileMenuButton: ({ buttonProps, mobileSidebarOpen, setMobileSidebarOpen, isLoading, }: NavbarMobileMenuButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map