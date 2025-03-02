import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/atoms/Button';

const FallbackErrorPage = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">
          Oops! Something Went Wrong.
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          We couldn't load the page. Please try refreshing the application by clicking the button below.
        </p>
        <Button
          onClick={() => navigate('/')}        >
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default FallbackErrorPage;
