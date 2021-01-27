import express, { Express } from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "morgan";
import cors from 'cors';
import path from "path";
import { Server } from "http";
import { routes } from "./routes";

export function startApp(): Server {
    const app: Express = express();
    
    addConfig(app);
    addRoutes(app);
    errorHandler(app);

    return app.listen(process.env.PORT, () => console.log(`Listening at http://localhost:${process.env.PORT}`));
}

function addConfig(app: Express) {
    app.use(logger("dev"));
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
}

function addRoutes(app: Express) {
    app.use(express.static('public'));
    routes.forEach((route) => app.use(route.path, route.router));
}

function errorHandler(app: Express) {
    return app.use((req, res, next) => {
        res.sendFile(path.join(__dirname, "views/404.html"));
    });
}