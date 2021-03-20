"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Patch = exports.Get = exports.Post = exports.requestHandler = void 0;
const requestHandler = (route, type, middleware = []) => (target, propertyName, descriptor, other) => {
    const method = descriptor.value;
    descriptor.value = () => {
        return (app, controller) => {
            if (controller) {
                const ctMethod = (method || function () { }).bind(controller);
                app[type](`/${controller.base}/${route}`, middleware, ctMethod);
            }
        };
    };
};
exports.requestHandler = requestHandler;
function Post(route, middleware = []) {
    return exports.requestHandler(route, "post", middleware);
}
exports.Post = Post;
function Get(route, middleware = []) {
    return exports.requestHandler(route, "get", middleware);
}
exports.Get = Get;
function Patch(route, middleware = []) {
    return exports.requestHandler(route, "patch", middleware);
}
exports.Patch = Patch;
function Put(route, middleware = []) {
    return exports.requestHandler(route, "put", middleware);
}
exports.Put = Put;
function Delete(route, middleware = []) {
    return exports.requestHandler(route, "delete", middleware);
}
exports.Delete = Delete;
