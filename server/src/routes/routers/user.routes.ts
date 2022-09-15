import express, { Request, Response } from "express";
import { IUser } from "../../models/user.model";
import { createNewUser, getUser } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
	const userData: IUser = req.body;
	const { username, password } = userData;

	const isValidUsername =
		username.trim().length <= 15 && username.trim() !== "";
	const isValidPassword = password.length > 0;

	if (!isValidUsername || !isValidPassword) return res.status(400).json();

	try {
		const userData = await getUser({ username: username.trim(), password });
		return res.json(userData);
	} catch (err: any) {
        console.log(err);
		if (err.message === "Unable to login") {
			return res.status(401).json("Invalid details");
		}
		return res.status(500).json("Unable to login");
	}
});

userRouter.post("/signup", async (req: Request, res: Response) => {
	const userData: IUser = req.body;
	const { username, password } = userData;

	const isValidUsername =
		username.trim().length <= 15 && username.trim() !== "";
	const isValidPassword = password.length > 0;

	if (!isValidUsername || !isValidPassword) return res.status(400).json();

	try {
		const user = await createNewUser(userData);
		res.cookie("uid", user.token, { signed: true, maxAge: 18000000 });
		res.status(203).json({ username: user.username });
	} catch (err: any) {
		console.log(err);
		if (err.code === 11000) {
			return res.status(406).json("username already in system");
		}
		res.status(500).json("server error");
	}
});

export default userRouter;
