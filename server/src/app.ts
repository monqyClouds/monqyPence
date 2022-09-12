import path from "path";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const publicDirectoryPath = "../public";

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, publicDirectoryPath)));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, publicDirectoryPath, "/index.html"));
});

export default app;
