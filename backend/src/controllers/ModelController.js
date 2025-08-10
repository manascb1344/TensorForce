import ModelService from "../services/ModelService.js";

class ModelController {
    async fetchModelDetails(req, res) {
        try {
            const modeldetails = await ModelService.getAllModels();
            res.status(200).json({ success: true, modeldetails });
        } catch (error) {
            console.error("Error fetching ModelDetails:", error);
            res.status(500).json({ 
                success: false, 
                message: "Internal server error" 
            });
        }
    }

    async addModel(req, res) {
        try {
            const modelData = req.body;
            await ModelService.addModel(modelData);
            return res.status(201).json({ message: "Model added successfully." });
        } catch (error) {
            console.error("Error adding model:", error);
            if (error.message.includes("Missing required fields")) {
                return res.status(400).json({ error: error.message });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async addBuyerToModel(req, res) {
        try {
            const { model_id } = req.params;
            const buyerData = req.body;

            await ModelService.addBuyerToModel(model_id, buyerData);

            return res.status(200).json({ message: "Buyer added successfully." });
        } catch (error) {
            console.error("Error adding buyer:", error);
            if (error.message.includes("Missing required fields")) {
                return res.status(400).json({ error: error.message });
            }
            if (error.message === "Model not found") {
                return res.status(404).json({ error: "Model not found." });
            }
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getModelBuyers(req, res) {
        try {
            const { model_id } = req.params;
            const buyers = await ModelService.getModelBuyers(model_id);
            res.json(buyers);
        } catch (error) {
            console.error("Error fetching model buyers:", error);
            if (error.message === "Model not found") {
                return res.status(404).json({ message: "Model not found" });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new ModelController();
