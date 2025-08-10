import mongoose from "mongoose";
import databaseManager from "../config/database.js";

const userDetailsSchema = new mongoose.Schema({
    user: [
        {
            user_id: { type: Number, unique: true },
            username: { type: String },
            email: { type: String, unique: true },
            balance: { type: Number },
            apiKey: { type: String },
            apiSecretKey: { type: String },
        },
    ],
    transactions: [
        {
            model_id: { type: Number },
            transaction_date: { type: Date },
            amount: { type: Number },
            transaction_type: { type: String, enum: ["buy", "sell"] },
        },
    ],
    portfolios: [
        {
            model_id: { type: Number },
            quantity: { type: Number },
            average_price: { type: Number },
            current_value: { type: Number },
        },
    ],
});

class UserDetailsModel {
    constructor() {
        this.model = null;
    }

    async getModel() {
        if (!this.model) {
            const connection = await databaseManager.connectCustomers();
            this.model = connection.model("UserDetails", userDetailsSchema);
        }
        return this.model;
    }

    async findOne(query) {
        const model = await this.getModel();
        return model.findOne(query);
    }

    async create(data) {
        const model = await this.getModel();
        return model.create(data);
    }

    async find(query, sort = {}) {
        const model = await this.getModel();
        return model.find(query).sort(sort);
    }
}

export default new UserDetailsModel();
