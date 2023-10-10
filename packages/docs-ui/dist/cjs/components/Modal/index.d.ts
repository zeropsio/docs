import React from "react";
import { ButtonProps } from "../../components";
import { Ref } from "../../types";
export type ModalProps = {
    className?: string;
    title?: React.ReactNode;
    actions?: ButtonProps[];
    modalContainerClassName?: string;
    contentClassName?: string;
    onClose?: React.ReactEventHandler<HTMLDialogElement>;
    open?: boolean;
    footerContent?: React.ReactNode;
    passedRef?: Ref<HTMLDialogElement>;
    headerClassName?: string;
} & Omit<React.ComponentProps<"dialog">, "ref" | "title">;
export declare const Modal: ({ className, title, actions, children, contentClassName, modalContainerClassName, onClose, open, footerContent, passedRef, ...props }: ModalProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map