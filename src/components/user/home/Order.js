import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressModal from "./AddressModal";
import "./Order.css";


const OrderPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingAddress, setShippingAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isAddressValid, setIsAddressValid] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:9090/api/public/view-cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data);
                    const total = data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
                    setTotalPrice(total);
                } else {
                    console.error("Không thể lấy dữ liệu giỏ hàng");
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu giỏ hàng:", error);
            }
        };

        const fetchCustomerAddress = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch("http://localhost:9090/api/public/customer-address", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.ok) {
                    const address = await response.json();
                    setShippingAddress(address);

                    // Kiểm tra xem địa chỉ có đủ thông tin không
                    if (!address.address || !address.commune || !address.district || !address.city || !address.country) {
                        setIsAddressValid(false);
                    }
                } else {
                    setIsAddressValid(false);
                }
            } catch (error) {
                console.error("Lỗi khi lấy địa chỉ:", error);
                setIsAddressValid(false);
            }
        };

        fetchCartData();
        fetchCustomerAddress();
    }, [navigate]);

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Bạn cần đăng nhập để đặt hàng!");
                navigate("/login");
                return;
            }
    
            // 🔍 Gọi API lấy địa chỉ
            const addressResponse = await fetch("http://localhost:9090/api/public/customer-address", {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            let addressData = null;
            if (addressResponse.ok) {
                addressData = await addressResponse.json();
            }
    
            // ❌ Nếu chưa có địa chỉ, mở modal nhập địa chỉ
            if (!addressData || !addressData.addressId) {
                setModalIsOpen(true); // Mở modal nhập địa chỉ
                return;
            }
    
            // 🛒 Nếu có địa chỉ, tiếp tục đặt hàng (Gửi addressId qua query param)
            const orderResponse = await fetch(
                `http://localhost:9090/api/public/order?paymentMethod=${paymentMethod}&addressId=${addressData.addressId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            if (orderResponse.ok) {
                if (paymentMethod === "VNPay") {
                    const returnUrl = `${window.location.origin}/payment-success`;
                    const vnpayResponse = await fetch(
                        `http://localhost:9090/api/public/vn-pay?amount=${totalPrice}&bankCode=NCB&returnUrl=${encodeURIComponent(returnUrl)}`
                    );
    
                    if (vnpayResponse.ok) {
                        const vnpayData = await vnpayResponse.json();
                        if (vnpayData.data?.paymentUrl) {
                            window.location.href = vnpayData.data.paymentUrl;
                            return;
                        }
                    }
                } else {
                    alert("Đặt hàng thành công!");
                    navigate("/home");
                }
            } else {
                alert("Đặt hàng thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    
    

    const handleSaveAddress = async (newAddress) => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để thêm địa chỉ!");
            navigate("/login");
            return;
        }
    
        try {
            // Nếu đã có địa chỉ trước đó, thêm addressId vào newAddress
            const updatedAddress = {
                ...newAddress,
                addressId: shippingAddress?.addressId || null, // Nếu có addressId thì gửi, nếu không thì null
            };
    
            const response = await fetch("http://localhost:9090/api/public/save-customer-address", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedAddress),
            });
    
            if (response.ok) {
                const savedAddress = await response.json();
                setShippingAddress(savedAddress);
                alert("Đã lưu địa chỉ thành công!");
                setModalIsOpen(false);
            } else {
                alert("Lưu địa chỉ thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi lưu địa chỉ:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    

    return (
        <div className="order-page-container">
            <h2 className="order-page-title">Xác nhận đơn hàng</h2>

            <div className="order-shipping-info">
                <h3>Thông tin giao hàng</h3>
                {shippingAddress && shippingAddress.address ? (
                    <p>Địa chỉ:
                        {" " + shippingAddress.address || "Chưa có địa chỉ"}, 
                        {" " + shippingAddress.commune || "Chưa có địa chỉ"},
                        {" " + shippingAddress.district || "Chưa có địa chỉ"},
                        {" " + shippingAddress.city || "Chưa có địa chỉ"}
                    </p>
                ) : (
                    <div>
                        <p className="warning-text">Bạn chưa có địa chỉ giao hàng.</p>
                        <button className="add-address-button" onClick={() => setModalIsOpen(true)}>
                            Thêm địa chỉ
                        </button>
                    </div>
                )}
            </div>

            <AddressModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} onSave={handleSaveAddress} />

            <div className="order-products">
                <h3>Danh sách sản phẩm</h3>
                {cartItems.map((item) => (
                    <div key={item.cartItemId} className="order-product-item">
                        <img src={item.product.imageUrl} alt={item.product.name} />
                        <div className="product-details">
                            <p>{item.product.name}</p>
                            <p>Số lượng: {item.quantity}</p>
                            <p>Giá: {item.product.price.toLocaleString()} VND</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="order-summary">
                <h3>Tóm tắt đơn hàng</h3>
                <p>Tổng tiền hàng: {totalPrice.toLocaleString()} VND</p>
                <p>Phí vận chuyển: 20,000 VND</p>
                <p className="total-price">
                    Tổng tiền thanh toán: {(totalPrice + 20000).toLocaleString()} VND
                </p>
            </div>

            <div className="payment-method">
                <h3>Phương thức thanh toán</h3>
                <label>
                    <input
                        type="radio"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={() => setPaymentMethod("COD")}
                    />
                    Thanh toán khi nhận hàng (COD)
                </label>
                {/* <label>
                    <input
                        type="radio"
                        value="VNPay"
                        checked={paymentMethod === "VNPay"}
                        onChange={() => setPaymentMethod("VNPay")}
                    />
                    Thanh toán qua VNPay
                </label> */}
            </div>

            <button onClick={handlePlaceOrder} className="place-order-button">
                Đặt hàng
            </button>

        </div>
    );
};

export default OrderPage;
