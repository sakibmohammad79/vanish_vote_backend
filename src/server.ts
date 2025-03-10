import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

const main = async () => {
  await app.listen(config.PORT, async () => {
    await connectDB();
    console.log(`🚀 Vanish vote server running on port ${config.PORT}`);
  });
};

export const connectDB = async () => {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

main();
