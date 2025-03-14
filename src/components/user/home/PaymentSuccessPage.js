import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const status = queryParams.get("vnp_ResponseCode");

        if (status === "00") {
            alert("Thanh toán thành công!");
            navigate("/home");
        } else {
            alert("Thanh toán thất bại. Vui lòng thử lại!");
            navigate("/home");
        }
    }, [navigate, location]);

    return <div className="payment-success">Đang xử lý thanh toán...</div>;
};

export default PaymentSuccessPage;
