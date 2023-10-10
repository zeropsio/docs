export type useKeyboardShortcutOptions = {
    metakey?: boolean;
    shortcutKeys: string[];
    action: (e: KeyboardEvent) => void;
    checkEditing?: boolean;
    preventDefault?: boolean;
    isLoading?: boolean;
};
export declare const useKeyboardShortcut: ({ metakey, shortcutKeys, action, checkEditing, preventDefault, isLoading, }: useKeyboardShortcutOptions) => void;
//# sourceMappingURL=index.d.ts.map