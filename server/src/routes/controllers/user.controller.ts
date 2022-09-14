import User, { IUser } from "../../models/user.model";

export async function createNewUser(userData: IUser) {
	const user = new User(userData);
	const token =  user.generateAuthToken();
    user.token = token;
    await user.save();
	return user;
}
