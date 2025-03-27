import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WarehouseList = () => {
    const [warehouses, setWarehouses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/shipping/list-warehouse");
                console.log("Warehouses response:", response.data);
                setWarehouses(response.data.data ?? []);
            } catch (error) {
                console.error("Error fetching warehouses:", error);
            }
        };
    
        fetchWarehouses();
    }, []);
    

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Danh sách kho hàng</h2>
            <ul className="border rounded p-4">
                {warehouses.length > 0 ? (
                    warehouses.map((warehouse, index) => (
                        <li key={index} className="border-b py-2">
                            <strong>{warehouse.pick_name}</strong> - {warehouse.address}  
                            <br />
                            📞 {warehouse.pick_tel}
                        </li>
                    ))
                ) : (
                    <p>Không có kho hàng nào</p>
                )}
            </ul>
            <button 
                onClick={() => navigate("/")} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                ⬅ Trở về Trang chủ
            </button>
        </div>
    );
    
};

export default WarehouseList;
