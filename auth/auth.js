//require the passport package and JWTStargey package
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/User");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
//function to generate authentication token for a new user
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log("sign up in auth");
        const user = await User.create({
          email,
          password,
          username: email,
          last_login: new Date(),
        });
        console.log(user);

        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
//function for a login user authentication
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
        await user.update({ last_login: new Date() });
        return done(null, user, { message: "Logged in" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
//function to assign new authentication token and extract old token if expired
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
      try {
        return done(null, token.user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    }
  )
);
