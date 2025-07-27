import express from "express";
import { getLiveEarthquakeData } from "../controllers/earthquakeController.js";
import { insertEarthquakeData } from "../controllers/earthquakeController.js";
import { queryInitData } from "../controllers/earthquakeController.js";

const router = express.Router();

router.get("/live-data", getLiveEarthquakeData);
router.post("/", insertEarthquakeData);
router.get("/init", queryInitData);

export default router;
