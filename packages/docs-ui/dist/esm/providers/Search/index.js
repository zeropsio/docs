"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { createContext, useContext, useEffect, useState, useMemo, useRef, } from "react";
import { Modal, Search } from "../../components";
import { checkArraySameElms } from "../../utils";
import algoliasearch from "algoliasearch/lite";
import clsx from "clsx";
import { CSSTransition, SwitchTransition } from "react-transition-group";
const SearchContext = createContext(null);
export const SearchProvider = ({ children, initialDefaultFilters = [], searchProps, algolia, commands = [], modalClassName, }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [defaultFilters, setDefaultFilters] = useState(initialDefaultFilters);
    const [command, setCommand] = useState(null);
    const modalRef = useRef(null);
    const searchClient = useMemo(() => {
        const algoliaClient = algoliasearch(algolia.appId, algolia.apiKey);
        return Object.assign(Object.assign({}, algoliaClient), { search(requests) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (requests.every(({ params }) => !(params === null || params === void 0 ? void 0 : params.query))) {
                        return Promise.resolve({
                            results: requests.map(() => ({
                                hits: [],
                                nbHits: 0,
                                nbPages: 0,
                                page: 0,
                                processingTimeMS: 0,
                                hitsPerPage: 0,
                                exhaustiveNbHits: false,
                                query: "",
                                params: "",
                            })),
                        });
                    }
                    return algoliaClient.search(requests);
                });
            } });
    }, [algolia.appId, algolia.apiKey]);
    useEffect(() => {
        if (initialDefaultFilters.length &&
            !checkArraySameElms(defaultFilters, initialDefaultFilters)) {
            setDefaultFilters(initialDefaultFilters);
        }
    }, [initialDefaultFilters]);
    return (React.createElement(SearchContext.Provider, { value: {
            isOpen,
            setIsOpen,
            defaultFilters,
            setDefaultFilters,
            searchClient,
            commands,
            command,
            setCommand,
            modalRef,
        } },
        children,
        React.createElement(Modal, { contentClassName: clsx("!p-0 overflow-hidden relative h-full", "rounded-none md:rounded-docs_lg flex flex-col justify-between"), modalContainerClassName: clsx("!rounded-none md:!rounded-docs_lg", "md:!h-[480px] h-screen", "md:!w-[640px] w-screen", "bg-medusa-bg-base"), open: isOpen, onClose: () => setIsOpen(false), passedRef: modalRef, className: modalClassName },
            React.createElement(SwitchTransition, null,
                React.createElement(CSSTransition, { classNames: {
                        enter: command === null
                            ? "animate-fadeInLeft animate-fast"
                            : "animate-fadeInRight animate-fast",
                        exit: command === null
                            ? "animate-fadeOutLeft animate-fast"
                            : "animate-fadeOutRight animate-fast",
                    }, timeout: 300, key: (command === null || command === void 0 ? void 0 : command.name) || "search" },
                    React.createElement(React.Fragment, null,
                        command === null && (React.createElement(Search, Object.assign({}, searchProps, { algolia: algolia }))), command === null || command === void 0 ? void 0 :
                        command.component))))));
};
export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used inside a SearchProvider");
    }
    return context;
};
