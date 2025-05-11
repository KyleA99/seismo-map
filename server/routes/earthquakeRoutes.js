import express from 'express';
import { getEarthquakeData } from '../controllers/earthquakeController.js';

const router = express.Router();

router.get('/', getEarthquakeData);

export default router;
