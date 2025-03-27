require("dotenv").config();
const axios = require("axios");

const getShippingFee = async (req, res) => {
    try {
        const { pick_province, pick_district, province, district, weight } = req.body;
        const response = await axios.get("https://services.giaohangtietkiem.vn/services/shipment/fee", {
            params: { pick_province, pick_district, province, district, weight },
            headers: { Token: process.env.GHTK_TOKEN }
            
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi tính phí", error: error.response?.data || error.message });
    }
};

module.exports = { getShippingFee };
