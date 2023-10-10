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
import React, { useEffect, useState } from "react";
import { request } from "@octokit/request";
import { Link } from "../../../components/Link";
export const Solutions = ({ feedback, message }) => {
    const [possibleSolutionsQuery, setPossibleSolutionsQuery] = useState("");
    const [possibleSolutions, setPossibleSolutions] = useState([]);
    function constructQuery(searchQuery) {
        return `${searchQuery} repo:medusajs/medusa is:closed is:issue`;
    }
    function searchGitHub(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return request(`GET /search/issues`, {
                q: query,
                sort: "updated",
                per_page: 3,
            });
        });
    }
    useEffect(() => {
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
    return (React.createElement(React.Fragment, null, possibleSolutions.length > 0 && (React.createElement("div", { className: "text-compact-large-plus font-normal" },
        React.createElement("span", { className: "my-docs_1 mx-0 inline-block" }, "If you faced a problem, here are some possible solutions from GitHub:"),
        React.createElement("ul", null, possibleSolutions.map((solution) => (React.createElement("li", { key: solution.url, className: "mb-docs_0.5 last:mb-0" },
            React.createElement(Link, { href: solution.html_url, target: "_blank", rel: "noreferrer" }, solution.title))))),
        React.createElement("span", null,
            "Explore more issues in",
            " ",
            React.createElement("a", { href: `https://github.com/medusajs/medusa/issues?q=${possibleSolutionsQuery}`, target: "_blank", rel: "noreferrer" }, "the GitHub repository"))))));
};
