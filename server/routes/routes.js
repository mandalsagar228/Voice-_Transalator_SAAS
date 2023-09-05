import express from "express";
import passport from "passport";
const Router = express.Router();
const clientURL = "http://localhost:5173";
import {
  signupDetails,
  matchOtp,
  loginDetails,
  queryEmail,
} from "../controllers/user_controller.js";
Router.post("/signup", signupDetails);
Router.post("/otp", matchOtp);
Router.post("/login", loginDetails);
Router.post("/queryEmail", queryEmail);

// sign in with google

// Set up Google OAuth 2.0 routes
Router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: clientURL,
    failureRedirect: `${clientURL}/login`,
  })
);

export default Router;
