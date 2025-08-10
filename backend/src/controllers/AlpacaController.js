import AlpacaService from "../services/AlpacaService.js";

class AlpacaController {
    async fetchAlpacaData(req, res) {
        try {
            const data = await AlpacaService.getAccountData();
            res.json(data);
        } catch (error) {
            console.error("Error fetching data from Alpaca API:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getNews(req, res) {
        try {
            const data = await AlpacaService.getNews();
            res.json(data);
        } catch (error) {
            console.error("Error fetching news:", error);
            res.status(500).json({ message: "Server error" });
        }
    }
}

export default new AlpacaController();
