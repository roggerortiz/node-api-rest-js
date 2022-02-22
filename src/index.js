import { config } from 'dotenv';
import connectDB from './database';
import startServer from './server';

config();

connectDB();

startServer();