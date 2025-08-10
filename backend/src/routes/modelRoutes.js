import express from "express";
import ModelController from "../controllers/ModelController.js";

const router = express.Router();

router.get("/fetchModelDetails", ModelController.fetchModelDetails);
router.post("/add", ModelController.addModel);
router.post("/buyers/add/:model_id", ModelController.addBuyerToModel);
router.get("/buyers/:model_id", ModelController.getModelBuyers);

export default router;
