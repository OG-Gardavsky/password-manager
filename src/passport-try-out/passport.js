const passport = require('passport');
const dotenv = require("dotenv");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
// const { generalConfig } = require('../config/generalConfig')
dotenv.config();

passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        // clientID: generalConfig.googleAuthclientID, // Your Credentials here.
        // clientSecret: generalConfig.googleAuthclientSecret, // Your Credentials here.
        callbackURL:"http://localhost:4000/auth/callback",
        passReqToCallback:true,
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));
