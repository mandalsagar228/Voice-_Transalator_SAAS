import bcrypt from "bcrypt";
import user from "../Models/user.models.js";
import token from "../Models/token.model.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { sendOTP, generateOTP } from "../utils/OTPVerification.js";

dotenv.config();

export const signupDetails = async (req, res) => {
  try {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    const hashPassword = await bcrypt.hash(password, 10); //bcrypting the password
    const hashCpassword = await bcrypt.hash(confirmPassword, 10);
    const afterHashingSignupData = {
      firstname,
      lastname,
      email,
      password: hashCpassword,
      confirmPassword: hashPassword,
    };

    const userAlreadyExist = await user.findOne({ email: email }); //checking whether the user req from client side is already existing or not
    if (userAlreadyExist) {
      return res.status(401).json({ msg: "Account already exist" });
    }
    // Generating OTP:
    const OTPData = generateOTP();
    const { OTP, expireAt } = OTPData;
    afterHashingSignupData.otp = OTP;
    afterHashingSignupData.otpExpirationTime = expireAt;
    afterHashingSignupData.isVerified = false;

    const signupData = await new user(afterHashingSignupData); //validate the req data with userSchema
    await signupData.save(); //save requsted data
    sendOTP(email, OTP); //send otp to the user

    return res.status(201).json({ msg: "signup successful", signupData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "internal server error", error: error.message });
  }
};

// Verify OTP comming from the client side:
export const matchOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    console.log("This is otp value", otp);
    // Find the user with the provided OTP
    const userWithOTP = await user.findOne({ otp: otp });
    if (!userWithOTP) {
      return res.status(401).json({ msg: "Invalid OTP" });
    }

    // Verify if the OTP is not expired
    if (userWithOTP.otpExpirationTime < Date.now()) {
      return res.status(401).json({ msg: "OTP has expired" });
    }

    // Update the user as verified and remove OTP and expiration time
    userWithOTP.isVerified = true;
    userWithOTP.removeOTP();
    await userWithOTP.save();
    return res.status(200).json({ msg: "Verified succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// Getting login details:
export const loginDetails = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isLoginVerified = await user.findOne({
      email: email,
    });
    if (!isLoginVerified) {
      return res.status(401).json({ msg: "invalid email" });
    }

    let match = await bcrypt.compare(password, isLoginVerified.password);

    if (match) {
      //generate accessToken
      const accessToken = jwt.sign(
        isLoginVerified.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      //generate refreshToken
      const refreshToken = jwt.sign(
        isLoginVerified.toJSON(),
        process.env.REFRESH_SECRECT_KEY
      );

      const newToken = new token({ token: refreshToken }); //validate refreshToken based in tokenSchema
      await newToken.save(); //save refreshToken in db
      return res.status(200).json({
        msg: "Login Successful",
        username: isLoginVerified.email,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({
        msg: "password doesn't matched",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

// if the user forget the password, they reset it by querying the existing mail
export const queryEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const isMailExist = await user.findOne({ email: email });
    if (!isMailExist) {
      return res.status(401).json({
        msg: "Email address doesn,t exist.Please provide existing email.",
      });
    } else {
      // Generating OTP:
      const OTPData = generateOTP();
      const { OTP } = OTPData;
      isMailExist.otp = OTP; // saving the new entity called "otp" to verify the email

      sendOTP(email, OTP);
      await isMailExist.save();
      return res.status(200).json({ msg: "Email verified" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "internal server error", error });
  }
};

export const ResetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  const hashCpassword = await bcrypt.hash(confirmPassword, 10);

  const afterHashingSignupData = {
    password: hashCpassword,
    confirmPassword: hashPassword,
  };

  // Update the user's password in the database
  const updatedUser = await user.findByIdAndUpdate(
    {
      $set: { password: hashPassword },
      $set: { password: hashCpassword },
    },
    { new: true }
  );
};
