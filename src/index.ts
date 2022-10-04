import express, { Express } from 'express';
import { passRecordRouter } from './routes';
import { dbConnect } from './db/mongoose';

dbConnect();

const app: Express = express();
const port = process.env.PORT;

app.disable('x-powered-by');
app.use(express.json());

app.use('/passRecord', passRecordRouter);

app.listen(port, () => {
  console.log(`⚡️ Server is running at port: ${port}`);
});