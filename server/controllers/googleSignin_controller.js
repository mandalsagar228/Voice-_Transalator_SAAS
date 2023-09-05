import passport, { use } from "passport";
import { Jwt } from "jsonwebtoken";
import dotenv from "dotenv";
import { Strategy as GooglStrategy } from "passport-google-oauth20";
import user from "../Models/user.models.js";

dotenv.config();

// signin with google
passport.use(
  new GooglStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACKURL,
  })
);

async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await user.findOne({ googleId: profile.id });

    if (existingUser) {
      const customAccessToken = jwt.sign(
        { userId: existingUser._id },
        process.env.accessToken,
        { expiresIn: "15m" }
      );
      return done(null, { user: existingUser, accessToken: customAccessToken });
    }

    // if user doesn't exist
    const newUser = new user({
      googleId: profile.Id,
      gFirstname: profile.name.givenName,
      gLastname: profile.name.familyName,
      gEmail: profile.email[0].value,
    });
    await newUser.save();

    //  generate jwt token
    const customAccessToken = jwt.sign(
      { userId: existingUser._id },
      process.env.accessToken,
      { expiresIn: "15m" }
    );
    return done(null, { user: existingUser, accessToken: customAccessToken });
  } catch (error) {
    return done(error, false, {
      message: "An error occured while signin to google",
    });
  }
};
