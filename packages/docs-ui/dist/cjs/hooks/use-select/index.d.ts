export type OptionType = {
    value: string;
    label: string;
    index?: string;
    isAllOption?: boolean;
};
export type SelectOptions = {
    value: string | string[];
    multiple?: boolean;
    options: OptionType[];
    setSelected?: (value: string | string[]) => void;
    addSelected?: (value: string) => void;
    removeSelected?: (value: string) => void;
    handleAddAll?: (isAllSelected: boolean) => void;
};
export declare const useSelect: ({ value, options, multiple, setSelected, addSelected, removeSelected, handleAddAll, }: SelectOptions) => {
    isValueSelected: (val: string) => boolean;
    hasSelectedValue: number | boolean;
    hasSelectedValues: boolean;
    selectedValues: OptionType[];
    isAllSelected: boolean;
    handleChange: (selectedValue: string, wasSelected: boolean) => void;
    handleSelectAll: () => void;
};
//# sourceMappingURL=index.d.ts.map