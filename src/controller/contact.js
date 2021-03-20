"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkDelete = exports.bulkCreate = exports.createContactSchema = void 0;
const express_1 = require("express");
const route_decorators_1 = require("../routes/route.decorators");
const base_controller_1 = __importDefault(require("./base.controller"));
const contact_1 = __importDefault(require("../database/models/contact"));
const joi_1 = __importDefault(require("joi"));
const validator_1 = require("../middleware/validator");
exports.createContactSchema = joi_1.default.object({
    name: joi_1.default.string().insensitive().required(),
    email: joi_1.default.string().email(),
    phone: joi_1.default.string(),
    pix: joi_1.default.string(),
    website: joi_1.default.string(),
    job: joi_1.default.string(),
    priority: joi_1.default.string(),
    id: joi_1.default.string(),
    userId: joi_1.default.string(),
}).or('email', 'phone', 'website');
exports.bulkCreate = joi_1.default.array().items(exports.createContactSchema.with('userId', 'name')).required();
exports.bulkDelete = joi_1.default.array().items(joi_1.default.string().uuid());
class Contact extends base_controller_1.default {
    constructor() {
        super(...arguments);
        this.base = "contact";
        this.app = express_1.Router();
    }
    get({ params }, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = yield contact_1.default.findAll({
                where: { userId: params.userId }
            });
            res.json(contact);
        });
    }
    create(__req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.default.create(__req.body);
                res.status(201).json({ status: 201, data: contact });
            }
            catch (err) {
                res.status(400).json({ status: 400, message: err.message, object: err });
            }
        });
    }
    bulkCreate(__req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.default.bulkCreate(__req.body);
                res.status(201).json({ status: 201, data: contact });
            }
            catch (err) {
                res.status(400).json({ status: 400, message: err.message, object: err });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.default.update(req.body, { where: { id: req.params.id } });
                res.status(200).json({ status: 200, data: contact[0] ? 'updated' : 'nothing changed' });
            }
            catch (err) {
                res.status(400).json({ status: 400, message: err.message, object: err });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.default.destroy({ where: { id: req.params.id } });
                res.status(200).json({ status: 200, data: contact[0] ? 'deleted' : 'already deleted' });
            }
            catch (err) {
                res.status(400).json({ status: 400, message: err.message, object: err });
            }
        });
    }
    bulkDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_1.default.destroy({ where: { id: req.body } });
                res.status(200).json({ status: 200, data: contact[0] ? 'deleted' : 'already deleted' });
            }
            catch (err) {
                res.status(400).json({ status: 400, message: err.message, object: err });
            }
        });
    }
}
__decorate([
    route_decorators_1.Get(":userId")
], Contact.prototype, "get", null);
__decorate([
    route_decorators_1.Post("", validator_1.requestValidator(exports.createContactSchema))
], Contact.prototype, "create", null);
__decorate([
    route_decorators_1.Post("bulk", validator_1.requestValidator(exports.bulkCreate, true))
], Contact.prototype, "bulkCreate", null);
__decorate([
    route_decorators_1.Patch(":id", validator_1.requestValidator(exports.createContactSchema))
], Contact.prototype, "update", null);
__decorate([
    route_decorators_1.Delete(":id")
], Contact.prototype, "delete", null);
__decorate([
    route_decorators_1.Delete("bulk", validator_1.requestValidator(exports.bulkDelete, true))
], Contact.prototype, "bulkDelete", null);
exports.default = Contact;
