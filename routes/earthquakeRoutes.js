import express from "express";
import {
    getLiveEarthquakeData,
    queryStoredData,
    insertEarthquakeData,
    queryInitData
} from "../controllers/earthquakeController.js";

const router = express.Router();

router.get("/live-data", getLiveEarthquakeData);

router.route("/")
    .get(queryStoredData)
    .post(insertEarthquakeData);

router.get("/init", queryInitData);

export default router;
