import React from "react";
import { type ModalProps } from "../../components";
export type ModalContextType = {
    modalProps: ModalProps | null;
    setModalProps: (value: ModalProps | null) => void;
    closeModal: () => void;
};
export type ModalProviderProps = {
    children?: React.ReactNode;
};
export declare const ModalProvider: ({ children }: ModalProviderProps) => React.JSX.Element;
export declare const useModal: () => ModalContextType;
//# sourceMappingURL=index.d.ts.map