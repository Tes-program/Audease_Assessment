import { Router } from "express";
import { blogRouter, blog } from "../api/blogs/blog.route";
import { authRouter } from "../api/users/users.route";
import { protectUser } from "../modules/middleware";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});
router.use("/blogs", blog);
router.use("/blogs", protectUser, blogRouter);
router.use("/users", authRouter);

export { router };
