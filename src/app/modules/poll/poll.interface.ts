import mongoose, { Schema } from "mongoose";

interface PollOption {
  text: string;
  votes: number;
}

export interface IPoll extends Document {
  question: string;
  options: PollOption[];
  expiresAt: Date;
  hideResults: boolean;
  reactions: { like: number; trending: number };
  createdAt: Date;
}
