"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = __importDefault(require("colors-cli/safe"));
const random_1 = __importDefault(require("lodash/random"));
const config = require('./config');
const dbLogger = (...logs) => {
    const colors = ['red', 'italic', 'green', 'blue', 'yellow', 'white', 'green_bbt'];
    logs.forEach(msg => {
        if (typeof msg !== 'string') {
            console.log(msg);
        }
        console.log(safe_1.default.bold[colors[random_1.default(0, colors.length - 1)]](msg));
    });
};
config.development.logging = dbLogger;
config.test.logging = dbLogger;
exports.default = config;
