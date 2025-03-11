import { Request, Response } from "express";
import { CommentModel } from "./comment.model";
const addComment = async (pollId: string, text: string) => {
  const comment = await CommentModel.create({ pollId, text });

  return comment;
};
const getCommentById = async (pollId: string) => {
  const comment = await CommentModel.find({ pollId });

  return comment;
};

export const CommentService = {
  addComment,
  getCommentById,
};
