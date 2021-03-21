import Controller from "../interface/controller.interface";
import { Router, Request, Response, Application } from "express";
import {Delete, Get, Patch, Post, requestHandler} from "../routes/route.decorators";
import BaseController from "./base.controller";
import IRequest from "../interface/server.interface";
import ContactModel from '../database/models/contact'
import Joi from 'joi'
import {requestValidator} from "../middleware/validator";

export const createContactSchema  = Joi.object({
    name: Joi.string().insensitive().required(),
    email: Joi.string().email(),
    phone: Joi.string(),
    pix: Joi.string(),
    website: Joi.string(),
    job: Joi.string(),
    priority: Joi.string(),
    id: Joi.string(),
    userId: Joi.string(),
}).or('email', 'phone', 'website');

export const bulkCreate = Joi.array().items(
    createContactSchema.with('userId', 'name')
).required()

export const bulkDelete = Joi.array().items(Joi.string().uuid())
export default class Contact extends  BaseController implements Controller {
    base = "contact"
    app = Router()


    @Get(":id")
    async get({params}: IRequest, res: Response) {
        const contact = await ContactModel.findAll({
            where: { id: params.id }
        });
        res.json(contact);
    }

    @Get("bulk/:userId")
    async bulkGet({params}: IRequest, res: Response) {
        const contact = await ContactModel.findAll({
            where: { userId: params.userId }
        });
        res.json(contact);
    }

    @Post("", requestValidator(createContactSchema))
    async create(__req: IRequest, res: Response) {
        try {
            const contact = await ContactModel.create(__req.body)
            res.status(201).json({ status: 201, data: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }

    @Post("bulk", requestValidator(bulkCreate, true))
    async bulkCreate(__req: IRequest, res: Response) {
        try {
            const contact = await ContactModel.bulkCreate(__req.body)
            res.status(201).json({ status: 201, data: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }


    @Patch(":id", requestValidator(createContactSchema))
    async update(req: IRequest, res: Response) {
        try {
            const contact = await ContactModel.update(req.body, {where: { id: req.params.id }})
            res.status(200).json({ status: 200, data: 'updated', object: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }


    @Delete("bulk", requestValidator(bulkDelete, true))
    async bulkDelete(req: IRequest, res: Response) {
        try {
            const contact = await ContactModel.destroy({where: { id: req.body }})
            res.status(200).json({ status: 200, data: 'deleted', object: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }

    @Delete("single/:id")
    async delete(req: IRequest, res: Response) {
        try {
            const contact = await ContactModel.destroy({where: { id: req.params.id }})
            res.status(200).json({ status: 200, data: 'deleted' , object: contact });
        } catch (err) {
            res.status(400).json({ status: 400, message: err.message, object: err })
        }
    }
}
