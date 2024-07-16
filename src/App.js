import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AdminLogin from './components/admin/login/index';
import AdminHome from './components/admin/home';
import UserLogin from './components/user/login';
import PrivateRoute from './components/PrivateRoute';



function App() {

  return (


    <Router>
      <div>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin></AdminLogin>} />
          <Route path="/user/login" element={<UserLogin></UserLogin>} />

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
