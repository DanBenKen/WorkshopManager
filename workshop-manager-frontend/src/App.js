import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/FrontPage';
import Jobs from './pages/Jobs';
import Workers from './pages/Workers';
import Supplies from './pages/Supplies';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FrontPage />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/supplies" element={<Supplies />} />
                <Route path="/workers" element={<Workers />} />
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
            </Routes>
        </Router>
    );
};

export default App;
