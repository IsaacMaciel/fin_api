import { Router } from "express";
import { authenticateRouter } from "./authentication.routes";
import { userRouter } from "./user.routes";

const router = Router();

router.use("/session",authenticateRouter)
router.use("/user", userRouter);

export { router };
