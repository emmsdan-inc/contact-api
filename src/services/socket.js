"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class LiveEvents {
    constructor(app, http) {
        this.io = new socket_io_1.Server(http);
        this.io.once("connection", (socket) => {
            this.socket = socket;
            console.log('socket server running on id', socket);
        });
    }
}
exports.default = LiveEvents;
