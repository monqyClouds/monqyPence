import Expense from "../../models/expense.model";
import User, { IUser } from "../../models/user.model";

export async function createNewUser(userData: IUser) {
	const user = new User(userData);
	const token = user.generateAuthToken();
	user.token = token;
	await user.save();
	return user;
}

export async function getUser(userData: IUser) {
	const user = await User.findByCredentials(
		userData.username,
		userData.password
	);
	const expenses = await Expense.find({ owner: user._id }).lean();
	const token = user.generateAuthToken();
	user.token = token;
	await user.save();
	return { username: user.username, expenses: expenses, token };
}
