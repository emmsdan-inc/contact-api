"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    getAppControllerMethods() {
        const object = Object.getOwnPropertyNames(Object.getPrototypeOf(this));
        return object.filter(method => {
            return method !== 'constructor' && this && typeof this[method] === 'function' && typeof this[method]() === 'function';
        }).map(method => method);
    }
}
exports.default = BaseController;
