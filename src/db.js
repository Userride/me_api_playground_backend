import mongoose from "mongoose";

export async function connectDB(uri) {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { dbName: "me_api_playground" });
  console.log("✅ MongoDB connected");
}
