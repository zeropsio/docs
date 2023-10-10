import React from "react";
export type InputTextProps = {
    className?: string;
    addGroupStyling?: boolean;
    passedRef?: React.Ref<HTMLInputElement>;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export declare const InputText: ({ addGroupStyling, className, passedRef, ...props }: InputTextProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map