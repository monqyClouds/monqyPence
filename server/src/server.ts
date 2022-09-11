import http from "http";

import dotenv from "dotenv";

import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()