import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: undefined,
  },
  otpExpirationTime: {
    type: Date,
    default: undefined,
  },
  isVerified: {
    type: Boolean,
    default: undefined,
  },

  // when user sign in with google then it will validate from the below schema.
  googleId: String,
  gFirstname: String,
  gLastname: String,
  gEmail: String,
});

// Add the removeOTP method to the user schema

userSchema.methods.removeOTP = function () {
  this.otp = undefined;
  this.otpExpirationTime = undefined;
};

const user = new mongoose.model("user", userSchema);

export default user;
