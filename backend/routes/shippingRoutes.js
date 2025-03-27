const express = require("express");
const axios = require("axios");
require("dotenv").config();

const { getShippingFee } = require("../controller/shippingController.js");
const router = express.Router();

router.post("/calculate", getShippingFee);

// Lấy danh sách kho hàng từ GHTK
router.get("/list-warehouse", async (req, res) => {
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
});

module.exports = router;
