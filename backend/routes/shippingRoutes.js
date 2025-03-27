const express = require("express");
const axios = require("axios");
require("dotenv").config();

const { getShippingFee } = require("../controller/shippingController.js");
const { warehouse } = require("../controller/warehousecontroller.js")
const router = express.Router();
//route lấy giá ship
router.post("/calculate", getShippingFee);

// route lấy kho
router.get("/list-warehouse", warehouse);

module.exports = router;
