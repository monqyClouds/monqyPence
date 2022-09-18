import mongoose from "mongoose";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT?: string;
		}
	}
}

const MONGO_URL =
	process.env.NODE_ENV === "development"
		? process.env.MONGO_URL_DEV!!
		: process.env.MONGO_URL!!;

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});

async function mongoConnect() {
	await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
	await mongoose.disconnect();
}

export default mongoConnect;
