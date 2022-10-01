import pkg from "passport-jwt"
import user from "../models/user.js";
import * as dotenv from 'dotenv' 

dotenv.config()

const JwtStrategy = pkg.Strategy,
    ExtractJwt = pkg.ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

export default (passport) => {
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        user.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}