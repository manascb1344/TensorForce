import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.post("/createUser", UserController.createUser);
router.post("/authenticate", UserController.authenticate);
router.put("/updateKeys", UserController.updateKeys);
router.get("/keys/:email", UserController.getKeys);
router.post("/add-transaction/:userId", UserController.addTransaction);

export default router;
