import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import Supplies from './pages/Supplies';
import Jobs from './pages/Jobs';
import WorkersPage from './pages/worker/WorkersPage';
import WorkersCreatePage from './pages/worker/WorkerCreatePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/" element={<AdminDashboard />}>
                    <Route path="/" element={<div>Welcome to Admin Dashboard</div>} />
                    <Route path="/workers" element={<WorkersPage />} />
                    <Route path="/supplies" element={<Supplies />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/worker/create" element={<WorkersCreatePage />} />
                    <Route path="/workers/edit/:workerId" element={<WorkersCreatePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
