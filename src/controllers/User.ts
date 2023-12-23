import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs"
import * as jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config()



const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const dbUser = await User.findOne({
            email: req.body.email,
        });
        if (dbUser) {
            res.status(400).json({
                message: "User with this email address already exist",
            });
            return;
        }
        if (!req.body.email) {
            res.status(400).json({
                message: "Please provide valid email address",
            });
            return;

        }
        if (req.body.confirmPassword != req.body.password) {
            res.status(400).json({
                message: "Password do not match",
            });
            return;

        }
        const newPassword = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) {
            res.status(404).json({
                message: "User not found",
            });
        } else {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordValid) {
                const SECRET_KEY = process.env.JWT_SECRET_KEY || ''

                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    SECRET_KEY
                );
                res.status(200).json({ token });
            } else {
                res.status(401).send({
                    message: "Incorrect Password",
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}



export default { signup, login }