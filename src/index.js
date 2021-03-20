"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const contact_1 = __importDefault(require("./controller/contact"));
const socket_1 = __importDefault(require("./services/socket"));
const database_1 = __importDefault(require("./database"));
const Module = new app_1.default("myContaxt");
// register a global middleware
Module.Middlewares([]);
// register app controllers
Module.Controllers([new contact_1.default()]);
// register services
Module.Services([
    { name: 'LiveEvents', handler: socket_1.default },
    { name: 'Database', handler: database_1.default },
]);
// start app server
Module.Start();
