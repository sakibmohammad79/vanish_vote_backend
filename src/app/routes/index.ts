import { Router } from "express";
import { PollRoutes } from "../modules/poll/poll.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/poll",
    route: PollRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
