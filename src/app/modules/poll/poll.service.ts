import { Request, RequestHandler, Response } from "express";
import { PollModel } from "./poll.model";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getAllPollFromDB = async () => {
  const allPollData = await PollModel.find();
  return allPollData;
};

const createPollIntoDB = async (payload: any) => {
  const { question, options, expiresIn, showResultsAfterExpire } = payload;
  const expiresAt = new Date(Date.now() + expiresIn * 60 * 60 * 1000);

  const pollData = {
    question,
    options,
    expiresAt,
    showResultsAfterExpire,
  };

  const createPollData = await PollModel.create(pollData);

  return createPollData;
};
const addVoteInPoll = async (pollId: any, optionIndex: any) => {
  const poll = await PollModel.findById(pollId);
  if (!poll) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Poll not found!");
  }

  poll.options[optionIndex].votes += 1;
  const addVoteInPoll = await poll.save();

  return addVoteInPoll;
};
const getPollResults = async (pollId: any) => {
  console.log(pollId);
  const poll = await PollModel.findById(pollId);

  if (!poll) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Poll not found!");
  }

  if (poll.showResultsAfterExpire && new Date() < poll.expiresAt) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      "Results are hidden until the poll ends"
    );
  }

  return poll;
};

export const PollServices = {
  getAllPollFromDB,
  createPollIntoDB,
  addVoteInPoll,
  getPollResults,
};
