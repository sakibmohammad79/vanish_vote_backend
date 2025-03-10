import { StatusCodes } from "http-status-codes";
import { PollServices } from "./poll.service";
import catchAsync from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { RequestHandler } from "express";
const createPoll: RequestHandler = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PollServices.createPollIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Poll created successfully!",
    data: result,
  });
});
const addVote: RequestHandler = catchAsync(async (req, res) => {
  const { pollId } = req.params;
  const { optionIndex } = req.body;
  // console.log(pollId, optionIndex);
  const result = await PollServices.addVoteInPoll(pollId, optionIndex);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Vote submitted successfully",
    data: result,
  });
});

export const PollControllers = {
  createPoll,
  addVote,
};
