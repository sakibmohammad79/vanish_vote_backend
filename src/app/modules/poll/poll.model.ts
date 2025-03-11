import mongoose, { Schema } from "mongoose";
import { IPoll } from "./poll.interface";

const PollSchema = new Schema<IPoll>(
  {
    question: { type: String, required: true },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    expiresAt: { type: Date, required: true },
    hideResults: { type: Boolean, default: false },
    reactions: {
      like: { type: Number, default: 0 },
      trending: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const PollModel = mongoose.model<IPoll>("Poll", PollSchema);
