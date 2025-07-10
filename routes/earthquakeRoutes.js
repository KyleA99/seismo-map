import express from 'express';
import { getEarthquakeData } from '../controllers/earthquakeController.js';
import { insertEarthquakeData } from '../controllers/earthquakeController.js';
import { queryInitData } from '../controllers/earthquakeController.js';

const router = express.Router();

router.get('/', getEarthquakeData);
// this route can be deleted once the entire init logic is built
router.post('/', insertEarthquakeData);
router.get('/init', queryInitData);

export default router;
