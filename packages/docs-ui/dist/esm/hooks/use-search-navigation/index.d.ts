import { type useKeyboardShortcutOptions } from "../use-keyboard-shortcut";
export type useSearchNavigationProps = {
    getInputElm: () => HTMLInputElement | null;
    focusInput: () => void;
    handleSubmit?: () => void;
    keyboardProps?: Partial<useKeyboardShortcutOptions>;
};
export declare const useSearchNavigation: ({ getInputElm, focusInput, handleSubmit, keyboardProps, }: useSearchNavigationProps) => void;
//# sourceMappingURL=index.d.ts.map