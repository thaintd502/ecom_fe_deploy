
import React from 'react';

import CustomerInfo from '../customer_infor';
import ProductList from '../bill_infor/list_product';

import './index.css';

const BillDetail = () => {
    return ( 
        <div className="bill-detail">
            <h2 className='order-detail-title'>Chi tiết hóa đơn</h2>
            <div className='order-detail-customer-info'><CustomerInfo /> </div>
            <div> <ProductList/></div>
        </div>
    );
};

export default BillDetail;
