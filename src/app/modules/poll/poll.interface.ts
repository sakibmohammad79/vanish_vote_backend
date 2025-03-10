import mongoose, { Schema } from "mongoose";

export interface IPoll {
  question: string;
  options: { text: string; votes: number }[];
  expiresAt: Date;
  showResultsAfterExpire: boolean;
}
