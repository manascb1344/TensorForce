import UserDetails from "../models/UserDetails.js";

class UserService {
    async getNextUserId() {
        try {
            const result = await UserDetails.find({}, { "user.user_id": -1 });

            if (result && result.length > 0 && result[0].user && result[0].user.length > 0) {
                const lastUserId = result[0].user[0].user_id;
                return lastUserId + 1;
            } else {
                return 1;
            }
        } catch (error) {
            console.error("Error generating user_id:", error);
            throw error;
        }
    }

    async generateUserIdAndSaveUser(userData) {
        const user_id = await this.getNextUserId();
        const newUser = {
            user_id,
            balance: 0,
            ...userData,
        };

        if (!newUser.username) {
            newUser.username = `user${user_id}`;
        }

        try {
            const createdUser = await UserDetails.create({ user: newUser });
            console.log("User created:", createdUser);
            return createdUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    }

    async authenticateUser(email, apiKey, apiSecretKey) {
        let query = { "user.email": email };

        if (apiKey && apiSecretKey) {
            query["user.apiKey"] = apiKey;
            query["user.apiSecretKey"] = apiSecretKey;
        }

        return await UserDetails.findOne(query);
    }

    async updateUserKeys(email, apiKey, apiSecretKey) {
        const existingUser = await UserDetails.findOne({ "user.email": email });

        if (!existingUser) {
            throw new Error("User not found");
        }

        existingUser.user[0].apiKey = apiKey;
        existingUser.user[0].apiSecretKey = apiSecretKey;

        return await existingUser.save();
    }

    async getUserKeys(email) {
        const user = await UserDetails.findOne({ "user.email": email });
        
        if (!user) {
            throw new Error("User not found");
        }

        return {
            apiKey: user.user[0].apiKey,
            apiSecretKey: user.user[0].apiSecretKey
        };
    }

    async addTransaction(userId, transactionData) {
        const user = await UserDetails.findOne({ "user.user_id": userId });

        if (!user) {
            throw new Error("User not found");
        }

        user.transactions.push(transactionData);
        return await user.save();
    }
}

export default new UserService();
