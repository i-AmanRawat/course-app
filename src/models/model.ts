import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: true,
  },
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Please provide title"] },
  description: String,
  price: { type: String, required: [true, "Please provide price"] },
  imageLink: String,
  published: Boolean,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    unique: true,
  },
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

export const User = mongoose.model("User", userSchema);
export const Course = mongoose.model("Course", courseSchema);
export const Admin = mongoose.model("Admin", adminSchema);
