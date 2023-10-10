import React from "react";
import { IconProps } from "@medusajs/icons/dist/types";
export type BorderedIconProps = {
    icon?: string;
    IconComponent?: ((props: IconProps) => React.JSX.Element) | null;
    wrapperClassName?: string;
    iconWrapperClassName?: string;
    iconClassName?: string;
    iconColorClassName?: string;
} & React.HTMLAttributes<HTMLSpanElement>;
export declare const BorderedIcon: ({ icon, IconComponent, wrapperClassName, iconWrapperClassName, iconClassName, iconColorClassName, }: BorderedIconProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map