import React from "react";
import NavigationGrid from "../../components/organisms/NavigationGrid";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  const navigationItems = [
    {
      title: "Jobs",
      description: "Manage job postings and applications.",
      onNavigate: () => navigate("/job"),
    },
    {
      title: "Users",
      description: "View and manage user accounts.",
      onNavigate: () => navigate("/user"),
    },
    {
      title: "Supplys",
      description: "Manage supply inventory and details.",
      onNavigate: () => navigate("/supply"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <NavigationGrid items={navigationItems} />
    </div>
  );
};

export default DashboardPage;
