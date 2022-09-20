import path from "path";

import express, { Express, Request, Response } from "express";
// import bodyParser from "body-parser";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import api from "./routes/api";

const publicDirectoryPath = "../public";
const app: Express = express();

const allowedOrigins = ["http://localhost:3000"];
const corsOptions: CorsOptions = {
	origin: function (
		origin: string | undefined,
		callback: (a: Error | null, b: boolean) => void
	) {
		if (!origin || !allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			var msg =
				"The CORS policy for this site does not allow access from the specified origin.";
			callback(new Error(msg), false);
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(cors(corsOptions));

app.use(helmet());

app.use(cookieParser("gig-Emm!!"));
app.use(morgan("combined"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, publicDirectoryPath)));

app.use(api);

app.get("/", (req: Request, res: Response) => {
	res.sendFile(path.join(__dirname, publicDirectoryPath, "/index.html"));
});

export default app;
