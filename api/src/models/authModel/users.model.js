import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false, // Exclude password from queries by default
  },
  mobile: {
    type: String,
    required: false,
    unique: true,
    trim: true,
  },
  about: {
    type: String,
    required: false,
    trim: true,
  },
  designation: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  experience: {
    type: Number,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
