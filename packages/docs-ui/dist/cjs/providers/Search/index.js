"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearch = exports.SearchProvider = void 0;
const react_1 = __importStar(require("react"));
const components_1 = require("../../components");
const utils_1 = require("../../utils");
const lite_1 = __importDefault(require("algoliasearch/lite"));
const clsx_1 = __importDefault(require("clsx"));
const react_transition_group_1 = require("react-transition-group");
const SearchContext = (0, react_1.createContext)(null);
const SearchProvider = ({ children, initialDefaultFilters = [], searchProps, algolia, commands = [], modalClassName, }) => {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const [defaultFilters, setDefaultFilters] = (0, react_1.useState)(initialDefaultFilters);
    const [command, setCommand] = (0, react_1.useState)(null);
    const modalRef = (0, react_1.useRef)(null);
    const searchClient = (0, react_1.useMemo)(() => {
        const algoliaClient = (0, lite_1.default)(algolia.appId, algolia.apiKey);
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
    (0, react_1.useEffect)(() => {
        if (initialDefaultFilters.length &&
            !(0, utils_1.checkArraySameElms)(defaultFilters, initialDefaultFilters)) {
            setDefaultFilters(initialDefaultFilters);
        }
    }, [initialDefaultFilters]);
    return (react_1.default.createElement(SearchContext.Provider, { value: {
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
        react_1.default.createElement(components_1.Modal, { contentClassName: (0, clsx_1.default)("!p-0 overflow-hidden relative h-full", "rounded-none md:rounded-docs_lg flex flex-col justify-between"), modalContainerClassName: (0, clsx_1.default)("!rounded-none md:!rounded-docs_lg", "md:!h-[480px] h-screen", "md:!w-[640px] w-screen", "bg-medusa-bg-base"), open: isOpen, onClose: () => setIsOpen(false), passedRef: modalRef, className: modalClassName },
            react_1.default.createElement(react_transition_group_1.SwitchTransition, null,
                react_1.default.createElement(react_transition_group_1.CSSTransition, { classNames: {
                        enter: command === null
                            ? "animate-fadeInLeft animate-fast"
                            : "animate-fadeInRight animate-fast",
                        exit: command === null
                            ? "animate-fadeOutLeft animate-fast"
                            : "animate-fadeOutRight animate-fast",
                    }, timeout: 300, key: (command === null || command === void 0 ? void 0 : command.name) || "search" },
                    react_1.default.createElement(react_1.default.Fragment, null,
                        command === null && (react_1.default.createElement(components_1.Search, Object.assign({}, searchProps, { algolia: algolia }))), command === null || command === void 0 ? void 0 :
                        command.component))))));
};
exports.SearchProvider = SearchProvider;
const useSearch = () => {
    const context = (0, react_1.useContext)(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used inside a SearchProvider");
    }
    return context;
};
exports.useSearch = useSearch;
