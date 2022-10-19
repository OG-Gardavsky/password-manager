import express, { Express } from 'express';
import { passRecordRouter, googleAuthROuter } from './routes';
import { dbConnect } from './db/mongoose';
import { port, sessionSecret } from './config/generalConfig';
import session from 'express-session';
import passport from 'passport';
import { usePassport } from './config/googleAuthConfig';

dbConnect();

const app: Express = express();

app.use(session({
  secret: sessionSecret,
  resave: false ,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');
app.use(express.json());

usePassport()

app.use('/passRecord', passRecordRouter);
app.use('/auth', googleAuthROuter);

app.listen(port, () => {
  console.log(`⚡️ Server is running at port: ${port}`);
});