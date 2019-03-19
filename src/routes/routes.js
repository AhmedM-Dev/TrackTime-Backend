import express from "express";
import postController from "../controllers/postController";
import authenticate from "../controllers/authenticate";
import getUsers from "../controllers/getUsers"
import registerUser from "../controllers/registerUser";

const router = express.Router();

router.post("/tracktime/api/auth", authenticate);
router.get("/tracktime/api/users", getUsers);
router.post("/tracktime/api/register", registerUser);

router.get("/api/v1/posts", postController.getPosts);
router.post("/api/v1/posts", postController.createPost);
router.get("/api/v1/posts/:id", postController.getOnePost);
router.put("/api/v1/posts/:id", postController.updatePost);
router.delete("/api/v1/posts/:id", postController.deletePost);

export default router;
