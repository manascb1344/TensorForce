import mongoose from "mongoose";
import databaseManager from "../config/database.js";

const modelDetailsSchema = new mongoose.Schema({
    model_id: { type: Number, unique: true },
    model_name: { type: String },
    description: { type: String },
    performance_metrics: [
        {
            metric_name: { type: String },
            value: { type: Number },
        },
    ],
    price: { type: Number },
    buyers: [
        {
            apiKey: { type: String },
            apiSecretKey: { type: String },
        },
    ],
});

class ModelDetailsModel {
    constructor() {
        this.model = null;
    }

    async getModel() {
        if (!this.model) {
            const connection = await databaseManager.connectModels();
            this.model = connection.model("modeldetail", modelDetailsSchema);
        }
        return this.model;
    }

    async findOne(query) {
        const model = await this.getModel();
        return model.findOne(query);
    }

    async find() {
        const model = await this.getModel();
        return model.find();
    }

    async create(data) {
        const model = await this.getModel();
        return model.create(data);
    }

    async countDocuments(query = {}) {
        const model = await this.getModel();
        return model.countDocuments(query);
    }
}

export default new ModelDetailsModel();
