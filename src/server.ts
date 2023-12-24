import express, {
    Express, Request, Response, NextFunction
} from "express";
import { config } from "./config/config";
import Logging from "./services/logging";
import TodoRoutes from "./routes/Todo"
import userROutes from "./routes/User"
import compression from "compression";


const StartServer = (app: Express) => {

    app.use(compression())
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req: Request, res: Response, next: NextFunction) => {

        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
        if (req.method == 'OPTIONS') {
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE , PATCH");
            return res.status(200).json({});
        }

        next();
    });

    app.use('/todo', TodoRoutes);
    app.use('/user', userROutes);

    app.get("/ping", (req: Request, res: Response) => {
        res.status(200).json({ message: "Acknowledged" });
    });

    app.use((req: Request, res: Response) => {
        const error = new Error("Url not found");

        Logging.error(error);
        res.status(404).json({ message: "url not found" })
    })

    app.listen(config.server.port, () => {
        Logging.info(`[server]: Server is running at http://localhost:${config.server.port}`);
    });

}

export default StartServer;