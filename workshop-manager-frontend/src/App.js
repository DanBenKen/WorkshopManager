import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Home from './pages/HomePage';
import JobCreate from './pages/JobPages/JobCreatePage';
import Job from './pages/JobPages/JobIndexPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<Login />} />
                <Route path="/account/register" element={<Register />} />
                <Route path="/job/create" element={<JobCreate />} />
                <Route path="/job" element={<Job />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default App;
