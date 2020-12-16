"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bench = void 0;
const perf_hooks_1 = require("perf_hooks");
function bench(func) {
    const start = perf_hooks_1.performance.now();
    func();
    const end = perf_hooks_1.performance.now();
    console.log(`${end - start}ms`);
}
exports.bench = bench;
