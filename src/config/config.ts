import dotenv from "dotenv";

dotenv.config()

const DB_USERNAME = process.env.DB_USERNAME || ''
const DB_USER_PASSWORD = process.env.DB_USER_PASSWORD || ''
const DB_NAME = process.env.DB_NAME || ''

const DB_CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_USER_PASSWORD}@cluster0.hjluxqf.mongodb.net/${DB_NAME}`;

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const SECRET_KEY = process.env.JWT_SECRET_KEY || ''

export const config = {
    mongo: {
        url: DB_CONNECTION_STRING
    },
    server: {
        port: SERVER_PORT
    },
    jwt: {
        secretKey: SECRET_KEY
    }
}
