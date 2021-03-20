"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseRoutesConfig {
    constructor(app, name) {
        this.app = app;
        this.name = name;
    }
    getName() {
        return this.name;
    }
    get route() {
        return BaseRoutesConfig.base;
    }
}
exports.default = BaseRoutesConfig;
BaseRoutesConfig.base = '/';
