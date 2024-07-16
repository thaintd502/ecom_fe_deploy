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

const Home = () => {
    return ( 
        <div className="home">
            <Header />
            
            <div className="app-container-home">
                <div className="sider-container-home">
                    <Sider />
                    
                </div>
                <div className="header-container-home">

                    <PageNavigate/>

                    <Routes>
                        <Route path="home" element={<ListAccount />} />
                        <Route path="list-customer" element={<CustomerList />} />
                        <Route path="/add-account" element={<AddAccount />} />
                        <Route path="/edit/:userId" element={<EditAccount />} />
                        <Route path="/add-customer" element={<AddCustomer />} />
                        <Route path="/edit-customer/:id" element={<EditCustomer />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;
