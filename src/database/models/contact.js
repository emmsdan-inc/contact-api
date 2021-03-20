"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
let Contact = class Contact extends sequelize_typescript_1.Model {
    static addUserId(instance) {
        // this will also be called when an instance is created
        instance.id = uuid_1.v4();
    }
    static addUserIdBulk(instances) {
        for (const instance of instances) {
            instance.id = uuid_1.v4();
        }
    }
};
__decorate([
    sequelize_typescript_1.IsUUID(4),
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.UUID)
], Contact.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Comment('Unique users identifier, across all EmmsDan apps'),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "pix", void 0);
__decorate([
    sequelize_typescript_1.IsEmail,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "email", void 0);
__decorate([
    sequelize_typescript_1.IsUrl,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "website", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "phone", void 0);
__decorate([
    sequelize_typescript_1.Default(''),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "job", void 0);
__decorate([
    sequelize_typescript_1.Default('normal'),
    sequelize_typescript_1.IsIn([['important', 'normal', 'vip', 'high', 'low']]),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING)
], Contact.prototype, "priority", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Contact, "addUserId", null);
__decorate([
    sequelize_typescript_1.BeforeBulkCreate
], Contact, "addUserIdBulk", null);
Contact = __decorate([
    sequelize_typescript_1.Table
], Contact);
exports.default = Contact;
