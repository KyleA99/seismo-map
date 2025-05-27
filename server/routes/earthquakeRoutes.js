import express from 'express';
import { getEarthquakeData } from '../controllers/earthquakeController.js';
import { queryInitData } from '../controllers/earthquakeController.js';

const router = express.Router();

router.get('/', getEarthquakeData);
router.get('/init', queryInitData);

export default router;
