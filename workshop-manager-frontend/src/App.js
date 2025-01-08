import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import Jobs from './pages/Jobs';
import WorkersPage from './pages/worker/WorkersPage';
import WorkersCreatePage from './pages/worker/WorkerCreatePage';
import SuppliesPage from './pages/supply/SupplyPage';
import SupplyCreatePage from './pages/supply/SupplyCreatePage';
import SupplyDetailsPage from './pages/supply/SupplyDetailsPage';
import WorkerDetailsPage from './pages/worker/WorkerDetailsPage';
import WorkerDeletePage from './pages/worker/WorkerDeletePage';
import SupplyDeletePage from './pages/supply/SupplyDeletePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />
                <Route path="/" element={<AdminDashboard />}>
                    <Route path="/" element={<div>Welcome to Admin Dashboard</div>} />
                    <Route path="/workers" element={<WorkersPage />} />
                    <Route path="/supplies" element={<SuppliesPage />} />
                    <Route path="/supplies/create" element={<SupplyCreatePage />} />
                    <Route path="/supplies/details/:supplyId" element={<SupplyDetailsPage />} />
                    <Route path="/supplies/edit/:supplyId" element={<SupplyCreatePage />} />
                    <Route path="/supplies/delete/:supplyId" element={<SupplyDeletePage />} />
                    <Route path="/jobs" element={<Jobs />} />
                    <Route path="/workers/create" element={<WorkersCreatePage />} />
                    <Route path="/workers/details/:workerId" element={<WorkerDetailsPage />} />
                    <Route path="/workers/edit/:workerId" element={<WorkersCreatePage />} />
                    <Route path="/workers/delete/:workerId" element={<WorkerDeletePage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
