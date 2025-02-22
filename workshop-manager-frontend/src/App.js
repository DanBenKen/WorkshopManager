import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import WorkersPage from './pages/worker/WorkersPage';
import SuppliesPage from './pages/supply/SupplyPage';
import SupplyDetailsPage from './pages/supply/SupplyDetailsPage';
import WorkerDetailsPage from './pages/worker/WorkerDetailsPage';
import WorkerDeletePage from './pages/worker/WorkerDeletePage';
import SupplyDeletePage from './pages/supply/SupplyDeletePage';
import JobPage from './pages/job/JobPage';
import JobFormPage from './pages/job/JobFormPage';
import JobDetailsPage from './pages/job/JobDetailsPage';
import JobDeletePage from './pages/job/JobDeletePage';
import SupplyFormPage from './pages/supply/SupplyFormPage';
import WorkersFormPage from './pages/worker/WorkerFormPage';
import WorkersListWithJobsPage from './pages/worker/WorkersListWithJobsPage';
import AdminDashboard from './pages/AdminDashboard';
import WorkersListWithoutJobsPage from './pages/worker/WorkersListWithoutJobsPage';
import SupplyListWithLowStockPage from './pages/supply/SupplyListWithLowStockPage';
import JobListInProgressPage from './pages/job/JobListInProgressPage';
import PrivateRoute from './components/organism/auth/PrivateRoute';
import Sidebar from './components/organism/Sidebar';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/account/login" element={<LoginPage />} />
                <Route path="/account/register" element={<RegisterPage />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Sidebar />}>
                        <Route path="/" element={<AdminDashboard />} />
                        <Route path="/workers" element={<WorkersPage />} />
                        <Route path="/supplies" element={<SuppliesPage />} />
                        <Route path="/supplies/create" element={<SupplyFormPage />} />
                        <Route path="/supplies/details/:supplyId" element={<SupplyDetailsPage />} />
                        <Route path="/supplies/edit/:supplyId" element={<SupplyFormPage />} />
                        <Route path="/supplies/delete/:supplyId" element={<SupplyDeletePage />} />
                        <Route path="/supplies/low-stock" element={<SupplyListWithLowStockPage />} />
                        <Route path="/jobs" element={<JobPage />} />
                        <Route path="/jobs/create" element={<JobFormPage />} />
                        <Route path="/jobs/edit/:jobId" element={<JobFormPage />} />
                        <Route path="/jobs/details/:jobId" element={<JobDetailsPage />} />
                        <Route path="/jobs/delete/:jobId" element={<JobDeletePage />} />
                        <Route path="/jobs/list-in-progress" element={<JobListInProgressPage />} />
                        <Route path="/workers/create" element={<WorkersFormPage />} />
                        <Route path="/workers/with-jobs" element={<WorkersListWithJobsPage />} />
                        <Route path="/workers/without-jobs" element={<WorkersListWithoutJobsPage />} />
                        <Route path="/workers/details/:workerId" element={<WorkerDetailsPage />} />
                        <Route path="/workers/edit/:workerId" element={<WorkersFormPage />} />
                        <Route path="/workers/delete/:workerId" element={<WorkerDeletePage />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
