import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { IAuth, ISignup } from "../models/User";
import Logging from "../services/logging";

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

export default function (validate: string) {

    return async function (req: Request, res: Response, next: NextFunction) {
        switch (validate) {
            case "login":
                try {
                    const loginValidation = await loginSchema.validateAsync(req.body, { abortEarly: false })
                    req.body = loginValidation
                }
                catch (error) {

                    res.status(400).json({
                        error
                    });
                    return;
                }
                break;
            case "signup":
                try {

                    const signupValidation = await registerSchema.validateAsync(req.body, { abortEarly: false });
                    req.body = signupValidation
                } catch (error) {
                    Logging.error(error);
                    res.status(400).json({
                        error,
                    });
                    return;
                }

                break;

            default:
                break;

        }

        next()

    }
}