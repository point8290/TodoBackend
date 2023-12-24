import { config } from "../config/config";
import * as jwt from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
import Logging from "../services/logging";

const SECRET_KEY = config.jwt.secretKey || ''

interface Token {
    email?: string
}

declare global {
    namespace Express {
        interface Request {
            user?: Token,
        }
    }
}

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers["authorization"] || '';
    if (token) {
        try {
            const user = jwt.verify(token, SECRET_KEY) as Token;
            req.user = user;
            next();
        } catch (error) {
            res.status(500).json({
                error
            });
        }

    } else {
        res.status(404).json({
            message: "Not Authorized"
        });
    }
}