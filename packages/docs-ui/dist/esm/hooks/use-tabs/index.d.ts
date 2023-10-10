export type BaseTabType = {
    label: string;
    value: string;
};
export type EventData = {
    storageValue: string;
};
export type TabProps<T> = {
    tabs: T[];
    group?: string;
};
export declare function useTabs<T extends BaseTabType>({ tabs, group }: TabProps<T>): {
    selectedTab: T | null;
    changeSelectedTab: (tab: T) => void;
};
//# sourceMappingURL=index.d.ts.map