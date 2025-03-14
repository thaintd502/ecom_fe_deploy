const API_BASE_URL = "https://ecom-amwn.onrender.com/api/public";

export const fetchOrders = async (token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/user`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Không thể lấy danh sách đơn hàng!");
        return response.json();
    } catch (error) {
        console.error("Lỗi:", error);
        return [];
    }
};
