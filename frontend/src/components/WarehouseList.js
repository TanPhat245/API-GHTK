import React, { useEffect, useState } from "react";
import axios from "axios";

const WarehouseList = () => {
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
        const fetchWarehouses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/shipping/list-warehouse");
                setWarehouses(response.data.stores || []);
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
                            <strong>{warehouse.name}</strong> - {warehouse.address}
                        </li>
                    ))
                ) : (
                    <p>Không có kho hàng nào</p>
                )}
            </ul>
        </div>
    );
};

export default WarehouseList;
