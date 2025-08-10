import dotenv from "dotenv";
import App from "./app.js";

// Load environment variables from .env file
dotenv.config();

const app = new App();
app.start();
