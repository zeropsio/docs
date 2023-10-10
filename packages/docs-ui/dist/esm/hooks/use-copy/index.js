"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import copy from "copy-text-to-clipboard";
export const useCopy = (text) => {
    const [isCopied, setIsCopied] = useState(false);
    const copyTimeout = useRef(0);
    const handleCopy = useCallback(() => {
        copy(text);
        setIsCopied(true);
        copyTimeout.current = window.setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }, [text]);
    useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
    return { isCopied, handleCopy };
};
