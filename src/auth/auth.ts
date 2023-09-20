import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { SECRETS } from "../utils/jwtUtils";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { getUserbyMail } from "../Mongo/userMongo";
import { UserType } from "../@types/userTypes";
import bcrypt from "bcrypt";

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user: UserType = await getUserbyMail(email);
        const match = bcrypt.compareSync(password, user.password);

        if (match) {
          return done(null, user, { message: "Logged in Successfully" });
        } else {
          return done(null, false, { message: "Bad credentials" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: SECRETS.jwt,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
