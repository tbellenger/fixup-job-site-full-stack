const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.create({
          email,
          password,
          username: email,
          last_login: new Date(),
        });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Unknown user" });
        }

        const validate = user.checkPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong password" });
        }
        //await user.update("last_login", new Date()); // This is buggy!!!!
        return done(null, user, { message: "Logged in" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromExtractors([
        ExtractJWT.fromAuthHeaderAsBearerToken(),
        ExtractJWT.fromUrlQueryParameter("auth_token"),
      ]),
    },
    async (token, done) => {
      console.log("Attemp to check auth token");
      try {
        return done(null, token.user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
