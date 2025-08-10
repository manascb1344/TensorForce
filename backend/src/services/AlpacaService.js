import Alpaca from "@alpacahq/alpaca-trade-api";

class AlpacaService {
    constructor() {
        const keyId = process.env.ALPACA_KEY_ID;
        const secretKey = process.env.ALPACA_SECRET_KEY;
        
        if (!keyId || !secretKey) {
            throw new Error("ALPACA_KEY_ID and ALPACA_SECRET_KEY environment variables are required");
        }

        this.alpaca = new Alpaca({
            keyId,
            secretKey,
            paper: true,
            usePolygon: false,
        });
    }

    async getAccountData() {
        try {
            return await this.alpaca.getAccount();
        } catch (error) {
            console.error("Error fetching data from Alpaca API:", error.message);
            throw error;
        }
    }

    async getNews() {
        const apiKeyId = process.env.APCA_API_KEY_ID;
        const apiSecretKey = process.env.APCA_API_SECRET_KEY;
        
        if (!apiKeyId || !apiSecretKey) {
            throw new Error("APCA_API_KEY_ID and APCA_API_SECRET_KEY environment variables are required");
        }

        const options = {
            method: "GET",
            headers: {
                "APCA-API-KEY-ID": apiKeyId,
                "APCA-API-SECRET-KEY": apiSecretKey,
            },
        };

        try {
            const response = await fetch(
                "https://data.alpaca.markets/v1beta1/news",
                options
            );
            return await response.json();
        } catch (error) {
            console.error("Error fetching news:", error);
            throw error;
        }
    }
}

export default new AlpacaService();
