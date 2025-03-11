import { Router } from "express";
import { PollControllers } from "./poll.controller";

const router = Router();

router.get("/", PollControllers.getAllPoll);
router.get("/:pollId", PollControllers.pollResult);
router.post("/:pollId/vote", PollControllers.addVote);
router.post("/", PollControllers.createPoll);
router.post("/reaction/:pollId", PollControllers.addReaction);

export const PollRoutes = router;
