import mongoose from "mongoose";

const modelsUri = "mongodb://localhost:27017/models";
const modelsConnection = mongoose.createConnection(modelsUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

modelsConnection.on("connected", () => {
  console.log("Models Database Connected");
});

modelsConnection.on("error", (error) => {
  console.error("Error connecting to Models Database:", error);
});

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
});

// Use "modeldetail" instead of "modeldetails" as the collection name
const ModelDetails = modelsConnection.model("modeldetail", modelDetailsSchema);

export default ModelDetails;
