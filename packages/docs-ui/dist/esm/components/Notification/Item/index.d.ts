import React, { ReactElement } from "react";
export type NotificationItemProps = {
    layout?: "default" | "empty";
    type?: "info" | "error" | "warning" | "success" | "custom" | "none";
    CustomIcon?: React.ReactNode;
    title?: string;
    text?: string;
    className?: string;
    children?: ReactElement;
    isClosable?: boolean;
    placement?: "top" | "bottom";
    show?: boolean;
    setShow?: (value: boolean) => void;
    onClose?: () => void;
    closeButtonText?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export declare const NotificationItem: ({ className, placement, show, layout, setShow, onClose, children, ...rest }: NotificationItemProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map