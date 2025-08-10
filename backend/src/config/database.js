import mongoose from "mongoose";

const CUSTOMERS_URI = process.env.CUSTOMERS_DATABASE_URI;
const MODELS_URI = process.env.MODELS_DATABASE_URI;

class DatabaseManager {
    constructor() {
        this.customersConnection = null;
        this.modelsConnection = null;
    }

    async connectCustomers() {
        if (this.customersConnection) {
            return this.customersConnection;
        }

        if (!CUSTOMERS_URI) {
            throw new Error("CUSTOMERS_DATABASE_URI environment variable is required");
        }

        this.customersConnection = mongoose.createConnection(CUSTOMERS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.customersConnection.on("connected", () => {
            console.log("Customers Database Connected");
        });

        this.customersConnection.on("error", (error) => {
            console.error("Error connecting to Customers Database:", error);
        });

        return this.customersConnection;
    }

    async connectModels() {
        if (this.modelsConnection) {
            return this.modelsConnection;
        }

        if (!MODELS_URI) {
            throw new Error("MODELS_DATABASE_URI environment variable is required");
        }

        this.modelsConnection = mongoose.createConnection(MODELS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        this.modelsConnection.on("connected", () => {
            console.log("Models Database Connected");
        });

        this.modelsConnection.on("error", (error) => {
            console.error("Error connecting to Models Database:", error);
        });

        return this.modelsConnection;
    }

    getCustomersConnection() {
        return this.customersConnection;
    }

    getModelsConnection() {
        return this.modelsConnection;
    }
}

export default new DatabaseManager();
