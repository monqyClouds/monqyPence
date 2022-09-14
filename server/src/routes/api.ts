import express from "express";

import expenseRouter from "./routers/expense.routes";
import userRouter from "./routers/user.routes";

const api = express.Router();

api.use("/expense", expenseRouter);
api.use("/user", userRouter);

export default api;