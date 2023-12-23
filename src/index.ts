import express, { Express } from "express";
import { connect } from "mongoose";
import { config } from "./config/config";
import Logging from "./library/logging";
import StartServer from "./server";

const app: Express = express();

StartServer(app);

connect(config.mongo.url, { retryWrites: true, w: "majority" }).then(() => {
    Logging.info("Connectes to MongoDB");
}).catch((err) => {
    Logging.error(err)
});
