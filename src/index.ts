import express, { Express } from 'express';
import { passRecordRouter } from './routes';
import { dbConnect } from './db/mongoose';
import { generalConfig } from './config/generalConfig';

dbConnect();

const app: Express = express();

app.disable('x-powered-by');
app.use(express.json());

app.use('/passRecord', passRecordRouter);

app.listen(generalConfig.serverPort, () => {
  console.log(`⚡️ Server is running at port: ${generalConfig.serverPort}`);
});