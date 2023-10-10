import { useCallback, useMemo } from "react";
export const useSelect = ({ value, options, multiple = false, setSelected, addSelected, removeSelected, handleAddAll, }) => {
    const isValueSelected = useCallback((val) => {
        return ((typeof value === "string" && val === value) ||
            (Array.isArray(value) && value.includes(val)));
    }, [value]);
    // checks if there are multiple selected values
    const hasSelectedValues = useMemo(() => {
        return multiple && Array.isArray(value) && value.length > 0;
    }, [value, multiple]);
    // checks if there are any selected values,
    // whether multiple or one
    const hasSelectedValue = useMemo(() => {
        return hasSelectedValues || (typeof value === "string" && value.length);
    }, [hasSelectedValues, value]);
    const selectedValues = useMemo(() => {
        if (typeof value === "string") {
            const selectedValue = options.find((option) => option.value === value);
            return selectedValue ? [selectedValue] : [];
        }
        else if (Array.isArray(value)) {
            return options.filter((option) => value.includes(option.value));
        }
        return [];
    }, [options, value]);
    const isAllSelected = useMemo(() => {
        return Array.isArray(value) && value.length === options.length;
    }, [options, value]);
    const handleChange = (selectedValue, wasSelected) => {
        if (multiple) {
            wasSelected
                ? removeSelected === null || removeSelected === void 0 ? void 0 : removeSelected(selectedValue)
                : addSelected === null || addSelected === void 0 ? void 0 : addSelected(selectedValue);
        }
        else {
            setSelected === null || setSelected === void 0 ? void 0 : setSelected(selectedValue);
        }
    };
    const handleSelectAll = () => {
        if (handleAddAll) {
            handleAddAll(isAllSelected);
        }
        else {
            setSelected === null || setSelected === void 0 ? void 0 : setSelected(options.map((option) => option.value));
        }
    };
    return {
        isValueSelected,
        hasSelectedValue,
        hasSelectedValues,
        selectedValues,
        isAllSelected,
        handleChange,
        handleSelectAll,
    };
};
