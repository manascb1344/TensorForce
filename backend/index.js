import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  UserDetails,
  getNextUserId,
  generateUserIdAndSaveUser,
} from "./userDetails.js";
import ModelDetails from "./modelDetails.js";
import Alpaca from "@alpacahq/alpaca-trade-api";

const app = express();

app.use(cors());

app.use(express.json());

const alpaca = new Alpaca({
  keyId: "PKXQ63AJJLRUQHYJKLIS",
  secretKey: "uWrne0JlFVcXEn8Be8qpl5dVtg9e06H8bhdXDs8J",
  paper: true, // Set to 'false' for live trading
  usePolygon: false, // Set to 'true' to use Polygon data
});

app.post("/api/createUser", async (req, res) => {
  const formData = req.body;

  try {
    await generateUserIdAndSaveUser(formData);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/authenticate", async (req, res) => {
  try {
    const { email, apiKey, apiSecretKey } = req.body;

    let query = { "user.email": email };

    if (apiKey && apiSecretKey) {
      query["user.apiKey"] = apiKey;
      query["user.apiSecretKey"] = apiSecretKey;
    }

    const existingUser = await UserDetails.findOne(query);

    if (existingUser) {
      return res.json({ success: true, message: "Authentication Successful" });
    } else {
      const formData = req.body;

      try {
        await generateUserIdAndSaveUser(formData);

        res.status(201).json({ message: "User created successfully!" });
      } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error during authentication:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

app.get("/api/fetchModelDetails", async (req, res) => {
  try {
    const modeldetails = await ModelDetails.find();
    res.status(200).json({ success: true, modeldetails });
  } catch (error) {
    console.error("Error fetching ModelDetails:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/api/models/add", async (req, res) => {
  try {
    const { model_name, description, performance_metrics, price } = req.body;

    // Validate required fields
    if (!model_name || !price) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Get the count of existing models
    const modelCount = await ModelDetails.countDocuments({});

    // Generate a unique model_id
    const model_id = modelCount + 1;

    // Create a new model instance
    const newModel = new ModelDetails({
      model_id,
      model_name,
      description,
      performance_metrics,
      price,
    });

    // Save the model to the database
    await newModel.save();

    return res.status(201).json({ message: "Model added successfully." });
  } catch (error) {
    console.error("Error adding model:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/models/:model_id/buyers/add", async (req, res) => {
  try {
    const { model_id } = req.params;
    const { apiKey, apiSecretKey } = req.body;

    // Validate required fields
    if (!apiKey || !apiSecretKey) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Find the model by model_id
    const model = await ModelDetails.findOne({ model_id });

    if (!model) {
      return res.status(404).json({ error: "Model not found." });
    }

    // Add the new buyer to the buyers array
    model.buyers.push({ apiKey, apiSecretKey });

    // Save the updated model to the database
    await model.save();

    return res.status(200).json({ message: "Buyer added successfully." });
  } catch (error) {
    console.error("Error adding buyer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/add-transaction/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const transactionData = req.body; // Assuming you send transaction data in the request body

    // Find the user based on user_id
    const user = await UserDetails.findOne({ "user.user_id": userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the transaction details to the transactions array
    user.transactions.push(transactionData);

    // Save the updated user document
    await user.save();

    return res.json({ message: "Transaction added successfully", user });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/api/updateKeys", async (req, res) => {
  try {
    const { email, apiKey, apiSecretKey } = req.body;

    if (!email || !apiKey || !apiSecretKey) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await UserDetails.findOne({ "user.email": email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    existingUser.user[0].apiKey = apiKey;
    existingUser.user[0].apiSecretKey = apiSecretKey;

    await existingUser.save();

    res.json({ message: "API Key and Secret Key updated successfully" });
  } catch (error) {
    console.error("Error updating keys:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users/:email/keys", async (req, res) => {
  try {
    const { email } = req.params;

    // Find the user by email
    const user = await UserDetails.findOne({ "user.email": email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Extract the API Key and Secret Key
    const { apiKey, apiSecretKey } = user.user[0];

    return res.status(200).json({ apiKey, apiSecretKey });
  } catch (error) {
    console.error("Error fetching keys:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/models/:model_id/buyers", async (req, res) => {
  const { model_id } = req.params;

  try {
    // Fetch the model from the database
    const model = await ModelDetails.findOne({ model_id: model_id });

    if (!model) {
      return res.status(404).json({ message: "Model not found" });
    }

    // Return the buyers array
    res.json(model.buyers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/fetchAlpacaData", async (req, res) => {
  try {
    const data = await alpaca.getAccount();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from Alpaca API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/news", async (req, res) => {
  const options = {
    method: "GET",
    headers: {
      "Apca-Api-Key-Id": "PKXQ63AJJLRUQHYJKLIS",
      "Apca-Api-Secret-Key": "uWrne0JlFVcXEn8Be8qpl5dVtg9e06H8bhdXDs8J",
    },
  };

  try {
    const response = await fetch(
      "https://data.alpaca.markets/v1beta1/news",
      options
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(5000, () => console.log("App is Running"));
