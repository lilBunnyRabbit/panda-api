import dotenv from "dotenv";
import { Server } from "http";
import { startApp } from "./app";
import { connectToDB } from "./database/mongoDB";
dotenv.config();

(async () => {
    await connectToDB();
    let server: Server = startApp();
})();
