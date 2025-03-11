import { Router } from "express";
import { PollRoutes } from "../modules/poll/poll.routes";
import { CommentRoutes } from "../modules/comment/comment.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/poll",
    route: PollRoutes,
  },
  {
    path: "/comment",
    route: CommentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
