import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import apiRoutes from './routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(apiRoutes);

export default app;
