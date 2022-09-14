import mongoose, { Model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface IUser {
	username: string;
	password: string;
	token?: string;
}

interface IUserMethods {
	generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

export const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
});

userSchema.methods.generateAuthToken = function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "gig-Em!");
	return token;
};

userSchema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
