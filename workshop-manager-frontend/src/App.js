import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import Workers from './pages/Workers';
import Supplies from './pages/Supplies';
import Jobs from './pages/Jobs';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/" element={<AdminDashboard />}>
                    <Route path="/" element={<div>Welcome to Admin Dashboard</div>} />
                    <Route path="/workers" element={<Workers />} />
                    <Route path="/supplies" element={<Supplies />} />
                    <Route path="/jobs" element={<Jobs />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
