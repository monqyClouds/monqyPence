import http from "http";

import dotenv from "dotenv";

import app from "./app";
import mongoConnect from "./services/mongo";

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()