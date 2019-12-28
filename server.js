import express from 'express';
import mongoose from 'mongoose';

import { USER, PASSWD, DBURL, PORT, SILENTWARNINGS } from './config.js';

import subscribersRouter from './routes/subscribers.js';

mongoose.connect(DBURL, SILENTWARNINGS);
const db = mongoose.connection;
db.on('error', (error) => console.log(`Internal server error: ${error}`));
db.once('open', () => console.log('Connected to database'));

const app = express();

app.use(express.json());

app.use('/subscribers', subscribersRouter);

app.listen(PORT, () => console.log("Server listening..."));