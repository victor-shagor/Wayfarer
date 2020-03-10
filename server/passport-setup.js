import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import pool from "../server/config";
import Helper from './helpers/helper';

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((user_id, done) => {
  done(null, user_id);
});
passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID:
        "440467217911-qsviehe0g93jaiva4lnlro0famcg93oe.apps.googleusercontent.com",
      clientSecret: "L5-AYORhbaaxHKqsdsOz8g-c"
    },
    (accessToken, refreshToken, profile, cb) => {
      pool.query(
        "SELECT * FROM users WHERE google_id = $1 ",
        [profile.id],
        (error, users) => {
          if (users.rows[0]) {
            const {
              user_id,
              is_admin,
              first_name,
              google_id,
              last_name
            } = users.rows[0];
            const token = Helper.generateToken(user_id, google_id, is_admin);
            const user = {
              user_id,
              is_admin,
              first_name,
              last_name,
              token
            };
            
            return cb(null, user);
          }
          pool.query(
            "INSERT INTO users (first_name, last_name, google_id, is_admin, is_verified) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
              profile.name.givenName,
              profile.name.familyName,
              profile.id,
              false,
              true
            ],
            (error, results) => {
                const {
                    user_id,
                    is_admin,
                    first_name,
                    google_id,
                    last_name
                  } = results.rows[0];
                  const token = Helper.generateToken(user_id, google_id, is_admin);
                  const user = {
                    user_id,
                    is_admin,
                    first_name,
                    last_name,
                    token
                  };
              return cb(null, user);
            }
          );
        }
      );
    }
  )
);
