import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    require: [true, "Please enter a email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please enter a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswodToken: String,
  forgotPasswodTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});


const User =mongoose.models.users || mongoose.model("users", userSchema)
//standard practice is to use as User but its nextjs, for its flexibility

export default User