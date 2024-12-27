import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/AccountPages/LoginPage';
import Register from './pages/AccountPages/RegisterPage';
import JobCreate from './pages/JobPages/JobCreatePage';
import JobPage from './pages/JobPages/JobIndexPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/job/create" element={<JobCreate />} />
                <Route path="/job" element={<JobPage />} />
                <Route path="/" element={<AdminDashboardPage />} />
            </Routes>
        </Router>
    );
};

export default App;
