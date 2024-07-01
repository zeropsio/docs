import React from "react";
import { OptionType } from "../../../hooks";
import { Ref } from "types";
export type SelectDropdownProps = {
    options: OptionType[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    addAll?: boolean;
    multiple?: boolean;
    isAllSelected: boolean;
    isValueSelected: (val: string) => boolean;
    handleSelectAll: () => void;
    handleChange?: (selectedValue: string, wasSelected: boolean) => void;
    parentRef?: React.RefObject<HTMLDivElement>;
    className?: string;
    passedRef?: Ref<HTMLDivElement>;
};
export declare const SelectDropdown: ({ open, setOpen, options, addAll, multiple, isAllSelected, isValueSelected, handleSelectAll, handleChange: handleSelectChange, parentRef, className, passedRef, }: SelectDropdownProps) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map