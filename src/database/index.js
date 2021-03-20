"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
// @ts-ignore
const index_1 = __importDefault(require("./config/index"));
const safe_1 = __importDefault(require("colors-cli/safe"));
class Database {
    constructor(__app, __http) {
        this.sequelize = new sequelize_typescript_1.Sequelize(Object.assign(Object.assign({}, index_1.default[process.env.NODE_ENV || 'development']), { paranoid: true, freezeTableName: true, models: [__dirname + '/models'] }));
        this.authentication();
    }
    authentication() {
        this.sequelize.authenticate().
            then(() => {
            console.log(safe_1.default.green_bbt.x16('Database Server started successfully.'));
        }).
            catch((error) => {
            console.log(safe_1.default.red_bt.bold('Database Server could not be started'));
            console.log(safe_1.default.red(error.message));
        });
    }
}
exports.default = Database;
