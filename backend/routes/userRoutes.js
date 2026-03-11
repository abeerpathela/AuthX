import e from "express";
import { userData } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = e.Router();

userRouter.get('/data',userAuth,userData);

export default userRouter;