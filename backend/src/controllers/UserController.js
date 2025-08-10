import UserService from "../services/UserService.js";

class UserController {
    async createUser(req, res) {
        try {
            const formData = req.body;
            await UserService.generateUserIdAndSaveUser(formData);
            res.status(201).json({ message: "User created successfully!" });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async authenticate(req, res) {
        try {
            const { email, apiKey, apiSecretKey } = req.body;

            const existingUser = await UserService.authenticateUser(email, apiKey, apiSecretKey);

            if (existingUser) {
                return res.json({
                    success: true,
                    message: "Authentication Successful",
                });
            } else {
                const formData = req.body;
                await UserService.generateUserIdAndSaveUser(formData);
                res.status(201).json({ message: "User created successfully!" });
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            return res.status(500).json({ 
                success: false, 
                message: "Internal Server Error" 
            });
        }
    }

    async updateKeys(req, res) {
        try {
            const { email, apiKey, apiSecretKey } = req.body;

            if (!email || !apiKey || !apiSecretKey) {
                return res.status(400).json({ message: "Missing required fields" });
            }

            await UserService.updateUserKeys(email, apiKey, apiSecretKey);

            res.json({
                message: "API Key and Secret Key updated successfully",
            });
        } catch (error) {
            console.error("Error updating keys:", error);
            if (error.message === "User not found") {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    }

    async getKeys(req, res) {
        try {
            const { email } = req.params;
            const keys = await UserService.getUserKeys(email);
            res.json({ success: true, ...keys });
        } catch (error) {
            console.error("Error fetching user keys:", error);
            if (error.message === "User not found") {
                return res.status(404).json({ 
                    success: false, 
                    message: "User not found" 
                });
            }
            res.status(500).json({ 
                success: false, 
                message: "Internal server error" 
            });
        }
    }

    async addTransaction(req, res) {
        try {
            const userId = parseInt(req.params.userId);
            const transactionData = req.body;

            const user = await UserService.addTransaction(userId, transactionData);

            return res.json({
                message: "Transaction added successfully",
                user,
            });
        } catch (error) {
            console.error("Error adding transaction:", error);
            if (error.message === "User not found") {
                return res.status(404).json({ error: "User not found" });
            }
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export default new UserController();
