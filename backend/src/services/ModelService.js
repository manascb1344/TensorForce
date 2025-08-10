import ModelDetails from "../models/ModelDetails.js";

class ModelService {
    async getAllModels() {
        return await ModelDetails.find();
    }

    async addModel(modelData) {
        const { model_name, description, performance_metrics, price } = modelData;

        if (!model_name || !price) {
            throw new Error("Missing required fields: model_name and price");
        }

        const modelCount = await ModelDetails.countDocuments();
        const model_id = modelCount + 1;

        const newModel = new (await ModelDetails.getModel())({
            model_id,
            model_name,
            description,
            performance_metrics,
            price,
        });

        return await newModel.save();
    }

    async getModelById(model_id) {
        const model = await ModelDetails.findOne({ model_id });
        
        if (!model) {
            throw new Error("Model not found");
        }

        return model;
    }

    async addBuyerToModel(model_id, buyerData) {
        const { apiKey, apiSecretKey } = buyerData;

        if (!apiKey || !apiSecretKey) {
            throw new Error("Missing required fields: apiKey and apiSecretKey");
        }

        const model = await this.getModelById(model_id);
        model.buyers.push({ apiKey, apiSecretKey });

        return await model.save();
    }

    async getModelBuyers(model_id) {
        const model = await this.getModelById(model_id);
        return model.buyers;
    }
}

export default new ModelService();
