import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShippingCalculator = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        pick_province: "",
        pick_district: "",
        province: "",
        district: "",
        weight: 1000,
    });

    const [fee, setFee] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const calculateShipping = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/shipping/calculate", data);
            setFee(response.data.fee);
            setError("");
            setIsModalOpen(true); // Mở thông báo khi có kết quả
            console.log(response.data);
            
        } catch (error) {
            setError("Lỗi khi tính phí. Vui lòng thử lại.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <h1 className="text-center text-2xl font-bold">Tra cứu phí ship</h1>
            </header>

            {/* Main Content */}
            <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-bold text-center mb-6 text-gray-700">Tính phí vận chuyển GHTK</h2>
                
                <div className="space-y-4">
                    <input 
                        type="text" 
                        name="pick_province" 
                        placeholder="Tỉnh lấy hàng" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />
                    <input 
                        type="text" 
                        name="pick_district" 
                        placeholder="Quận/huyện lấy hàng" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />
                    <input 
                        type="text" 
                        name="province" 
                        placeholder="Tỉnh giao hàng" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />
                    <input 
                        type="text" 
                        name="district" 
                        placeholder="Quận/huyện giao hàng" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />
                    <input 
                        type="number" 
                        name="weight" 
                        placeholder="Cân nặng (gram)" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />

                    {/* Nút tính phí */}
                    <button 
                        onClick={calculateShipping} 
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Tính phí
                    </button>

                    {/* Nút dẫn tới trang lấy địa chỉ */}
                    <button 
                        onClick={() => navigate("/warehouse")} 
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                        Lấy địa chỉ kho hàng
                    </button>
                </div>
            </div>

            {/* Hiển thị lỗi nếu có */}
            {error && <div className="mt-4 text-red-500 text-center">{error}</div>}

            {/* Modal hiển thị kết quả */}
            {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Phí vận chuyển</h2>
            
            {/* Kiểm tra fee có dữ liệu trước khi hiển thị */}
            {fee && (
                <div className="text-gray-700 text-lg">
                    <p><strong>Loại giao hàng:</strong> {fee.delivery_type}</p>
                    <p><strong>Phí vận chuyển:</strong> {fee.fee} VND</p>
                    <p><strong>Phí bảo hiểm:</strong> {fee.insurance_fee} VND</p>
                    <p><strong>VAT:</strong> {fee.include_vat ? "Đã bao gồm" : "Chưa bao gồm"}</p>
                </div>
            )}

            <button 
                onClick={() => setIsModalOpen(false)} 
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
            >
                Đóng
            </button>
        </div>
    </div>
)}

        </div>
    );
};

export default ShippingCalculator;
