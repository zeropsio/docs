import React from "react";
export type ButtonVariants = "primary" | "secondary" | "clear";
export type ButtonType = "default" | "icon";
export type ButtonProps = {
    isSelected?: boolean;
    disabled?: boolean;
    variant?: ButtonVariants;
    className?: string;
    buttonType?: ButtonType;
    buttonRef?: React.LegacyRef<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLButtonElement>;
export declare const Button: ({ className, children, variant, buttonType, buttonRef, ...props }: ButtonProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map