import express from 'express';
import dotenv from 'dotenv';
import earthquakeRoutes from './routes/earthquakeRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', earthquakeRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
