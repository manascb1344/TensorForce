import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import modelRoutes from "./routes/modelRoutes.js";
import alpacaRoutes from "./routes/alpacaRoutes.js";
import ErrorHandler from "./middleware/errorHandler.js";

class App {
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.setupErrorHandling();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes() {
        this.app.use("/api", userRoutes);
        this.app.use("/api/models", modelRoutes);
        this.app.use("/", alpacaRoutes);
    }

    setupErrorHandling() {
        this.app.use(ErrorHandler.notFound);
        this.app.use(ErrorHandler.handleError);
    }

    start(port = process.env.PORT || 5000) {
        this.app.listen(port, () => {
            console.log(`App is Running on port ${port}`);
        });
    }
}

export default App;
