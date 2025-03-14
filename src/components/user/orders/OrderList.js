import React from "react";
import OrderItem from "./OrderItem";
import "./OrderList.css";

const OrderList = ({ orders }) => {
    // Kiểm tra nếu orders là undefined hoặc null
    if (!orders || orders.length === 0) {
        return <p className="empty-message">Bạn chưa có đơn hàng nào!</p>;
    }

    return (
        <div className="order-list">
            {orders.map((order) => (
                <OrderItem key={order.orderId} order={order} />
            ))}
        </div>
    );
};

export default OrderList;
