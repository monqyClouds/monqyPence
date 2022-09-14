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
		const token = req.cookies.uid as string;

		const user = await verifyToken(token);

		if (!user) {
			res.status(401);
			return res.redirect("/login");
		}

		req.token = token;
		req.user = user;
		next();
	} catch (err) {
        console.log(err);
		res.status(501);
		return res.redirect("/login");
	}
};

async function verifyToken(token: string) {
    const decoded = jwt.verify(token, "gig-Em!") as JwtPayload;

    const user = await User.findOne({
        _id: decoded._id,
        token: token,
    });

    return user as Promise<typeof user> | null;
}

export default { auth, verifyToken };
