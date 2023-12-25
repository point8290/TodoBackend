import { config } from "../config/config";
import * as jwt from "jsonwebtoken"
import { IUserModel } from "../models/User";

const SECRET_KEY = config.jwt.secretKey

export const generateToken = (user: IUserModel) => {

    if (SECRET_KEY != '') {
        const token = jwt.sign(
            {
                email: user.email,
            },
            SECRET_KEY, {
            expiresIn: "1hr"
        }
        );
        return token;

    } else {
        throw "Server Error: Error in generating token";
    }

}