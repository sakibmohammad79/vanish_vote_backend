import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  pollId: string;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    pollId: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);
