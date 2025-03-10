import mongoose, { Schema } from "mongoose";
import { IPoll } from "./poll.interface";

const pollSchema = new Schema<IPoll>({
  question: { type: String, required: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  expiresAt: { type: Date, required: true },
  showResultsAfterExpire: { type: Boolean, default: false },
});

export const PollModel = mongoose.model<IPoll>("Poll", pollSchema);
