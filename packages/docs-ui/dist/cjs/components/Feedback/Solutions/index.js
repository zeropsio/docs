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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Solutions = void 0;
const react_1 = __importStar(require("react"));
const request_1 = require("@octokit/request");
const Link_1 = require("../../../components/Link");
const Solutions = ({ feedback, message }) => {
    const [possibleSolutionsQuery, setPossibleSolutionsQuery] = (0, react_1.useState)("");
    const [possibleSolutions, setPossibleSolutions] = (0, react_1.useState)([]);
    function constructQuery(searchQuery) {
        return `${searchQuery} repo:medusajs/medusa is:closed is:issue`;
    }
    function searchGitHub(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, request_1.request)(`GET /search/issues`, {
                q: query,
                sort: "updated",
                per_page: 3,
            });
        });
    }
    (0, react_1.useEffect)(() => {
        if (!feedback) {
            let query = constructQuery(
            // Github does not allow queries longer than 256 characters
            message ? message.substring(0, 256) : document.title);
            searchGitHub(query)
                .then((result) => __awaiter(void 0, void 0, void 0, function* () {
                if (!result.data.items.length && message) {
                    query = constructQuery(document.title);
                    result = yield searchGitHub(query);
                }
                setPossibleSolutionsQuery(query);
                setPossibleSolutions(result.data.items);
            }))
                .catch((err) => console.error(err));
        }
        else {
            setPossibleSolutionsQuery("");
            setPossibleSolutions([]);
        }
    }, [feedback, message]);
    return (react_1.default.createElement(react_1.default.Fragment, null, possibleSolutions.length > 0 && (react_1.default.createElement("div", { className: "text-compact-large-plus font-normal" },
        react_1.default.createElement("span", { className: "my-docs_1 mx-0 inline-block" }, "If you faced a problem, here are some possible solutions from GitHub:"),
        react_1.default.createElement("ul", null, possibleSolutions.map((solution) => (react_1.default.createElement("li", { key: solution.url, className: "mb-docs_0.5 last:mb-0" },
            react_1.default.createElement(Link_1.Link, { href: solution.html_url, target: "_blank", rel: "noreferrer" }, solution.title))))),
        react_1.default.createElement("span", null,
            "Explore more issues in",
            " ",
            react_1.default.createElement("a", { href: `https://github.com/medusajs/medusa/issues?q=${possibleSolutionsQuery}`, target: "_blank", rel: "noreferrer" }, "the GitHub repository"))))));
};
exports.Solutions = Solutions;
