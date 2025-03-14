import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OrderDetail.css";

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Bạn cần đăng nhập để xem đơn hàng!");
                return;
            }

            try {
                const response = await fetch(`https://ecom-amwn.onrender.com/api/public/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrder(data);
                } else {
                    alert("Không tìm thấy đơn hàng!");
                }
            } catch (error) {
                console.error("Lỗi khi lấy đơn hàng:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p className="loading-detail">Đang tải...</p>;
    if (!order) return <p className="not-found-detail">Không tìm thấy đơn hàng.</p>;

    return (
        <div className="order-detail-container">
            <h2 className="order-detail-title">Chi tiết đơn hàng #{order.orderId}</h2>

            {/* Thông tin đơn hàng */}
            <div className="order-detail-info">
                <p className="order-detail-date">
                    <strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // Định dạng 24h
                    })}
                </p>
                <p className={`order-detail-status ${order.status?.toLowerCase()}`}>
                    Trạng thái: {order.status}
                </p>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="order-detail-products">
                {order.orderItems.map((item) => (
                    <div key={item.orderItemId} className="order-detail-product">
                        <img src={item.product.imageUrl || "/default-product.png"} alt={item.product.name} />
                        <div className="order-detail-product-info">
                            <p className="order-detail-product-name">{item.product.name}</p>
                            <span className="order-detail-product-price">
                                {item.quantity} x {item.productPrice.toLocaleString()}đ
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tổng kết đơn hàng */}
            <div className="order-detail-summary">
                <p className="order-detail-total"><strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()}đ</p>
                <p className="order-detail-payment"><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
