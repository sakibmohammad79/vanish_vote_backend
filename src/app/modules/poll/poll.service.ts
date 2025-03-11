import { Request, RequestHandler, Response } from "express";
import { PollModel } from "./poll.model";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";

// Function to calculate expiration time based on duration in hours
const calculateExpirationTime = (duration: number): Date => {
  if (isNaN(duration) || duration <= 0) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Invalid duration. Duration must be a positive number."
    );
  }

  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + duration);

  return currentDate;
};

const getAllPollFromDB = async () => {
  const allPollData = await PollModel.find();
  return allPollData;
};

const createPollIntoDB = async (payload: any) => {
  const { question, options, duration, hideResults } = payload;

  if (!question || !options || options.length < 2) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Poll must have at least two options."
    );
  }

  // Calculate expiresAt based on the duration (in hours)
  const expiresAt = calculateExpirationTime(duration);

  // Create new poll
  const poll = await PollModel.create({
    question,
    options,
    expiresAt,
    hideResults,
  });

  return poll;
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
  const poll = await PollModel.findById(pollId);

  if (!poll) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Poll not found!");
  }

  return poll;
};

export const addReaction = async (pollId: string, reactionType: string) => {
  if (!["like", "trending"].includes(reactionType)) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Invalid reaction type");
  }

  const poll = await PollModel.findById(pollId);
  if (!poll) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Poll not found");
  }

  // Increment the respective reaction counter
  if (reactionType === "like") {
    poll.reactions.like += 1;
  } else if (reactionType === "trending") {
    poll.reactions.trending += 1;
  }

  const pollData = await poll.save();

  return pollData;
};

export const PollServices = {
  getAllPollFromDB,
  createPollIntoDB,
  addVoteInPoll,
  getPollResults,
  addReaction,
};
