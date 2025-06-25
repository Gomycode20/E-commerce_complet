import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    trim: true
  },
  birthDate: {
    type: Date
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart"
  },
  profileImage: {
    type: String,
    trim: true
  }
});

export default mongoose.model("User", userSchema);
