"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solver = solver;
var fs_1 = require("fs");
var path_1 = require("path");
var file = path_1.default.join(__dirname, 'test.txt');
var data = (0, fs_1.readFileSync)(file, 'utf-8');
var input = data.trim();
function solver(input, part) {
}
console.log('parte 1:', solver(input, 1));
console.log('parte 2:', solver(input, 2));
