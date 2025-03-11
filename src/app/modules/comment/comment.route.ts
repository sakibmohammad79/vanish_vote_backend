import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router();

router.get("/:pollId", CommentController.getComment);
router.post("/", CommentController.addComment);

export const CommentRoutes = router;
