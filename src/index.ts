import express, { Express } from 'express';
import dotenv from 'dotenv';
import { passRecordRouter } from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/passRecord', passRecordRouter);

app.listen(port, () => {
  console.log(`⚡️ Server is running at port: ${port}`);
});