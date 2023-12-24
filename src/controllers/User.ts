import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs"
import { generateToken } from "../services/generateToken";


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

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
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
                const token = generateToken(user);
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