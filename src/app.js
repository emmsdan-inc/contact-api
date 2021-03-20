"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class App {
    constructor(name, base = null) {
        this.services = [];
        this.app = express_1.default();
        this.http = new http_1.Server(this.app);
        this.PORT = 3300;
        this.base = base || 'api/';
        this.app.get("/", (_req, res) => res.json({ name, message: `App running on port ${this.PORT}` }));
        this.Middlewares([
            express_1.default.urlencoded({
                extended: true
            }),
            express_1.default.json(),
            cookie_parser_1.default(),
            this.injectedServices(),
        ]);
    }
    Controllers(controllers) {
        controllers.forEach((controller) => {
            controller.base = this.base + controller.base;
            controller.getAppControllerMethods().forEach(method => {
                controller[method]()(this.app, controller);
            });
        });
    }
    Middlewares(middlewares) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
    Services(services) {
        services.forEach((service) => {
            const handler = new service.handler(this.app, this.http);
            this.services.push({ name: service.name, handler, [service.name]: handler });
        });
    }
    injectedServices() {
        return (req, __res, next) => {
            req.__AppServices = this.services;
            next();
        };
    }
    listen() {
        this.http.listen(this.PORT, () => {
            console.log(`App listening on the port http://localhost:${this.PORT}`);
        });
    }
    getServer() {
        return this.app;
    }
    ErrorHanders(errorHanders) {
        this.app.use(errorHanders);
    }
    /**
     *
     * @param config database configuration
     * @returns void | objrct
     */
    Database(config = null) {
        if (!config)
            return;
        return config;
    }
    Start(port = null) {
        this.PORT = port || Number(process.env.PORT || this.PORT);
        this.listen();
    }
}
exports.default = App;
