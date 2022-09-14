import mongoose from "mongoose";

// const MONGO_URL = process.env.MONGO_URL_DEV!!;

mongoose.connection.once("open", () => {
	console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});

async function mongoConnect() {
	await mongoose.connect("mongodb://127.0.0.1:27017/monqypence");
}

export async function mongoDisconnect() {
	await mongoose.disconnect();
}

export default mongoConnect;
