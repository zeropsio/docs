"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkArraySameElms = void 0;
function checkArraySameElms(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((value, index) => value === arr2[index]);
}
exports.checkArraySameElms = checkArraySameElms;
