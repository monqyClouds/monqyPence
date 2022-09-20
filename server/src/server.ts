import http from "http";

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import mongoConnect from "./services/mongo";

const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()