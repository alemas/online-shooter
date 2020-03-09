"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var observer = new rxjs_1.Observable(function (observer) {
    var i = 0;
    while (i < 5) {
        observer.next(i);
        i++;
    }
});
var s1 = observer.subscribe(function (value) {
    console.log(value);
});
var s2 = observer.subscribe(function (value) {
    console.log(value);
});
var x = { name: "x", lastName: "y" };
var dict = {};
dict[0] = x;
console.log(dict[0]);
delete dict[0];
console.log(dict[0]);
console.log(x);
