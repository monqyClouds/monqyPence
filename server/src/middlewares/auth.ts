import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import User, { IUser } from "../models/user.model";

declare module "express-serve-static-core" {
	interface Request {
		token?: string;
		user: IUser;
	}
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.signedCookies.uid as string;

		const user = await verifyToken(token);

		if (!user) {
			return res.status(403).json("unauthenticated");
		}

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		return res.status(403).json("unauthenticated");
	}
};

export async function verifyToken(token: string) {
	const decoded = jwt.verify(token, "gig-Em!") as JwtPayload;

	const user = await User.findOne({
		_id: decoded._id,
		token: token,
	});

	return user as Promise<typeof user> | null;
}

export default auth;
