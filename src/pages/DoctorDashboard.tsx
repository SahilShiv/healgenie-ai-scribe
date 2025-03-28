
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Mic, User, FileText, Calendar, Clock, Plus } from 'lucide-react';
import RecentPatientsTable from '@/components/dashboard/RecentPatientsTable';

const DoctorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [isRecording, setIsRecording] = useState(false);

  if (!isAuthenticated || user?.userType !== 'doctor') {
    return <Navigate to="/login" />;
  }

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // In a real app, we would start/stop voice recording here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Dr. {user?.name}</h1>
            <p className="text-muted-foreground">
              Your doctor dashboard
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="/patient-search">
              <Button className="gap-2 bg-healgenie-300 hover:bg-healgenie-400">
                <Search className="h-4 w-4" />
                Search Patient
              </Button>
            </Link>
            <Button 
              variant={isRecording ? "destructive" : "outline"}
              className={`gap-2 ${isRecording ? "" : "border-healgenie-300 text-healgenie-500"}`}
              onClick={handleMicClick}
            >
              <Mic className="h-4 w-4" />
              {isRecording ? "Stop Recording" : "Start Voice Input"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <User className="h-5 w-5 text-healgenie-500 mr-2" />
                <span className="text-2xl font-bold">256</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Total Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-healgenie-500 mr-2" />
                <span className="text-2xl font-bold">1,024</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-healgenie-500 mr-2" />
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Patients</CardTitle>
                <Link to="/patient-search">
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add patient</span>
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <RecentPatientsTable />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Patient {index + 1}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {10 + index}:00 AM
                        </div>
                      </div>
                      <Link to={`/patient/${index + 1}`}>
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Button variant="link">View all appointments</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* AI Assistant Button - Fixed to bottom right */}
        <div className="fixed bottom-6 right-6 z-10">
          <Button className="h-14 w-14 rounded-full shadow-lg bg-healgenie-500 hover:bg-healgenie-600">
            <span className="sr-only">AI Assistant</span>
            <span className="text-2xl">AI</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
