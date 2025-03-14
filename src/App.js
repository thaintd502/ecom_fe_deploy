import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from './components/admin/login/index';
import AdminHome from './components/admin/home';
import UserLogin from './components/user/login';
import PrivateRoute from './components/PrivateRoute';
import ImageUpload from './components/test';
// import UserRegister from './components/user/register';
import HomePage from './components/user/home/index';
// import ProductDetail from './components/user/home/ProductDetail';

function App() {

  return (


    <Router>
      <div>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin></AdminLogin>} />
          <Route path="/login" element={<UserLogin></UserLogin>} />
          {/* <Route path="/register" element={<UserRegister></UserRegister>} /> */}
          {/* <Route path="/home" element={<HomePage></HomePage>} /> */}
          <Route path="/upload" element={<ImageUpload></ImageUpload>} />

          <Route
            path="/*"
            element={
              // <PrivateRoute>
                <HomePage />
              // </PrivateRoute>
            }
          />

          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminHome />
              </PrivateRoute>
            }
          />

        </Routes>




      </div>
    </Router>
  );
}

export default App;
