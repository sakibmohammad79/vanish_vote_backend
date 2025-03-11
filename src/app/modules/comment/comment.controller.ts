import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CommentService } from "./comment.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const addComment: RequestHandler = catchAsync(async (req, res) => {
  const { pollId, text } = req.body;
  const result = await CommentService.addComment(pollId, text);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment added successfully!",
    data: result,
  });
});
const getComment: RequestHandler = catchAsync(async (req, res) => {
  const { pollId } = req.params;
  const result = await CommentService.getCommentById(pollId);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Comment fetch successfully!",
    data: result,
  });
});

export const CommentController = {
  addComment,
  getComment,
};
