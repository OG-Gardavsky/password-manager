import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { googleAuthclientID, googleAuthclientSecret, port } from '../config/generalConfig';


const authUser = (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
     return done(null, profile);
}


export const usePassport = () => {

     passport.use(new GoogleStrategy({
          clientID: googleAuthclientID,
          clientSecret: googleAuthclientSecret,
          callbackURL: `http://localhost:${port}/auth/callback`,
          passReqToCallback: true
     }, authUser));
     
     passport.serializeUser( (user, done) => {
          done(null, user)
     });
      
     passport.deserializeUser((user: any, done) => {
          done (null, user)
     });
}
