import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import Header from '../header';
import Sider from '../slider';
import PageNavigate from '../manage_account/page_navigate';

import ListAccount from '../manage_account/list_account/index';
import CustomerList from '../manage_customer/list_customer/table';
import AddAccount from '../manage_account/add_account/form';
import EditAccount from '../manage_account/edit_account/form';
import AddCustomer from '../manage_customer/add_customer/index';
import EditCustomer from '../manage_customer/edit_customer';
import Orderlist from '../manage_order/list_order';
import BillDetails from '../manage_order/bill_detail/page';
import ProductList from '../manage_product/list_product';
import AddProduct from '../manage_product/add_product';
import EditProduct from '../manage_product/edit_product';

const Home = () => {
    return ( 
        <div className="home">
            <Header />
            
            <div className="app-container-home">
                <div className="sider-container-home">
                    <Sider />
                    
                </div>
                <div className="header-container-home">

                    {/* <PageNavigate/> */}

                    <Routes>
                        <Route path="/home" element={<ListAccount />} />
                        <Route path="/list-customer" element={<CustomerList />} />
                        <Route path="/add-account" element={<AddAccount />} />
                        <Route path="/edit/:userId" element={<EditAccount />} />
                        <Route path="/add-customer" element={<AddCustomer />} />
                        <Route path="/edit-customer/:id" element={<EditCustomer />} />
                        <Route path="/list-order" element={<Orderlist />} />
                        <Route path="/bill-details/:orderId" element={<BillDetails />} />
                        <Route path="/list-product" element={<ProductList />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/edit-product/:productId" element={<EditProduct />} />



                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;
