require("dotenv").config();
const axios = require("axios");

const warehouse = async (req, res) => {
    try {
        const response = await axios.get("https://services.giaohangtietkiem.vn/services/shipment/list_pick_add", {
            headers: {
                Token: process.env.GHTK_API_KEY,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching warehouse list:", error);
        res.status(500).json({ error: "Failed to fetch warehouse list" });
    }
};

module.exports = { warehouse };
