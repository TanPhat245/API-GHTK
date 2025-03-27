import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShippingCalculator from "./components/ShippingCalculator";
import WarehouseList from "./components/WarehouseList"; // Trang lấy địa chỉ kho

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ShippingCalculator />} />
                <Route path="/warehouse" element={<WarehouseList />} />
            </Routes>
        </Router>
    );
}

export default App;
