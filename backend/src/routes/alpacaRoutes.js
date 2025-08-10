import express from "express";
import AlpacaController from "../controllers/AlpacaController.js";

const router = express.Router();

router.get("/fetchAlpacaData", AlpacaController.fetchAlpacaData);
router.get("/news", AlpacaController.getNews);

export default router;
