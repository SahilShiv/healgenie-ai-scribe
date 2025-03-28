
import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.userType === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (user.userType === 'patient') {
        navigate('/patient-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Redirecting to dashboard...</h1>
          <p className="text-muted-foreground">
            Please wait while we redirect you to your personalized dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
