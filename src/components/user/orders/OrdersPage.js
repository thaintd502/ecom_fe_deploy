import React, { useEffect, useState } from "react";
import OrderList from "./OrderList";
import { fetchOrders } from "../../services/OrderService";
import "./OrdersPage.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để xem đơn hàng!");
            return;
        }

        fetchOrders(token).then((data) => {
            setOrders(data);
            setFilteredOrders(data);
        });
    }, []);

    // Lọc đơn hàng theo trạng thái
    const handleTabChange = (status) => {
        setActiveTab(status);
        if (status === "ALL") {
            setFilteredOrders(orders);
        } else {
            setFilteredOrders(orders.filter((order) => order.status === status));
        }
    };

    return (
        <div className="orders-container">
            {/* Tabs chọn trạng thái */}
            <div className="order-tabs">
                {["ALL", "PENDING", "PROCESSING", "SHIPPING", "COMPLETED", "CANCELED"].map((status) => (
                    <button
                        key={status}
                        className={activeTab === status ? "active" : ""}
                        onClick={() => handleTabChange(status)}
                    >
                        {status === "ALL" ? "Tất cả" : status}
                    </button>
                ))}
            </div>

            {/* Danh sách đơn hàng */}
            <OrderList orders={filteredOrders} />
        </div>
    );
};

export default OrdersPage;
