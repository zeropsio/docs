"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNextSibling = exports.findPrevSibling = void 0;
function findPrevSibling(element, selector) {
    let prevElement = element.previousElementSibling;
    while (prevElement !== null) {
        if (prevElement.matches(selector)) {
            return prevElement;
        }
        prevElement = prevElement.previousElementSibling;
    }
    return null;
}
exports.findPrevSibling = findPrevSibling;
function findNextSibling(element, selector) {
    let nextElement = element.nextElementSibling;
    while (nextElement !== null) {
        if (nextElement.matches(selector)) {
            return nextElement;
        }
        nextElement = nextElement.nextElementSibling;
    }
    return null;
}
exports.findNextSibling = findNextSibling;
