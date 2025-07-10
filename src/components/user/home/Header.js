import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import ic_logo from "../../../assets/images/23.png";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false); // ✅ Thêm trạng thái hiển thị gợi ý

  useEffect(() => {
    const handleLoginEvent = () => {
      setUserName(localStorage.getItem("userName"));
    };

    window.addEventListener("user-login", handleLoginEvent);
    return () => {
      window.removeEventListener("user-login", handleLoginEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token"); // Xóa token khi đăng xuất
    setUserName(null);
    window.dispatchEvent(new Event("user-login"));
    navigate("/login");
};


  const handleCartClick = () => {
    if (!userName) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };

  const handleNavigate = (path) => {
    setIsDropdownOpen(false);
    navigate(path);
  };

  // 🎯 Xử lý thay đổi input tìm kiếm
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    handleSearch(e.target.value);
  };

  // 🔍 Gợi ý kết quả tìm kiếm
  const handleSearch = async (keyword) => {
    if (!keyword.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:9090/api/public/products/search-by-keyword?keyword=${keyword}`);
      if (response.ok) {
        const data = await response.json();
        
        console.log("🔍 Kết quả tìm kiếm:", data); // Debug
  
        // ✅ Chỉ hiển thị gợi ý nếu có sản phẩm
        if (data.length > 0) {
          setSearchResults(data);
          setShowResults(true);
        } else {
          setSearchResults([]);
          setShowResults(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
      setSearchResults([]);
      setShowResults(false);
    }
  };
  
  
  

  // 🛒 Khi chọn sản phẩm -> Chuyển trang + Ẩn gợi ý
  const onSelectProduct = (productId) => {
    setShowResults(false); // ✅ Ẩn danh sách gợi ý
    setSearchKeyword(""); // ✅ Xóa nội dung ô tìm kiếm
    navigate(`/product/${productId}`); // ✅ Chuyển trang chi tiết sản phẩm
  };

  // 🛒 Chuyển hướng đến danh sách tìm kiếm khi nhấn Enter
  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      if (searchKeyword.trim() !== "") {
        navigate(`/search?keyword=${searchKeyword}`);
      }
  
      // ✅ Ẩn gợi ý và xóa kết quả tìm kiếm
      setSearchKeyword(""); 
      setShowResults(false);
      setSearchResults([]); 
    }
  };
  
  
  
  

  return (
    <header className="header">
      <div className="header-logo">
        <img src={ic_logo} alt="Logo" onClick={() => navigate("/home")} />
      </div>

      <div className="header-search">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchKeyword}
          onChange={handleSearchChange}
          onKeyDown={handleSearchSubmit}
        />
        <button onClick={() => navigate(`/search?keyword=${searchKeyword}`)}>🔍</button>

        {/* 🛍️ Danh sách kết quả tìm kiếm gợi ý */}
        {showResults && searchResults.length > 0 && (
          <ul className="search-results">
            {searchResults.map((product) => (
              <li key={product.productId} onClick={() => onSelectProduct(product.productId)}>
                <img src={product.imageUrl || "/default-product.png"} alt={product.name} />
                <span>{product.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="header-actions">
        <button className="cart-button" onClick={handleCartClick}>
          🛒 Giỏ hàng
        </button>
        {userName ? (
          <div
            className="user-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="user-name">👤 {userName}</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleNavigate("/orders")}>📦 Đơn mua</button>
                <button onClick={() => handleNavigate("/account")}>⚙️ Tài khoản của tôi</button>
                <button className="logout-button" onClick={handleLogout}>🚪 Đăng xuất</button>
              </div>
            )}
          </div>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>
            Đăng nhập
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
