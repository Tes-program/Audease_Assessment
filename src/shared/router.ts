import { Router } from "express";
import { blogRouter } from "../api/blogs/blog.route";
import { authRouter } from "../api/users/users.route";


const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

router.use("/blogs", blogRouter);
router.use("/users", authRouter);

export { router };
