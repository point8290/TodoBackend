import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { IAuth, ISignup } from "../models/User";
import { ITodo } from "../models/Todo";

const loginSchema = Joi.object<IAuth>({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required()
});

const registerSchema = Joi.object<ISignup>({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.string().equal(Joi.ref('password')).options({ messages: { 'any.only': 'Password does not match' } })
});

const todoSchema = Joi.object<ITodo>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required(),
    completed: Joi.boolean(),
})

const updateTodoSchema = Joi.object<ITodo>({
    title: Joi.string().empty(''),
    description: Joi.string().empty(''),
    dueDate: Joi.date().empty(''),
    completed: Joi.boolean(),
})

export default function (validate: string) {

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            switch (validate) {
                case "login":

                    const loginValidation = await loginSchema.validateAsync(req.body, { abortEarly: false })
                    req.body = loginValidation

                    break;
                case "signup":

                    const signupValidation = await registerSchema.validateAsync(req.body, { abortEarly: false });
                    req.body = signupValidation

                    break;
                case "createTodo":

                    const todoValidation = await todoSchema.validateAsync(req.body, { abortEarly: false });
                    req.body = todoValidation

                case "updateTodo":

                    const updateTodoValidation = await updateTodoSchema.validateAsync(req.body, { abortEarly: false });
                    req.body = updateTodoValidation

                default:
                    break;

            }

        } catch (error) {
            res.status(500).json({
                error,
            });

            return;
        }

        next()

    }
}