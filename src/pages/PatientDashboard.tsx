
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Clock } from 'lucide-react';

const PatientDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || user?.userType !== 'patient') {
    return <Navigate to="/login" />;
  }

  // Mock prescriptions data
  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. Jane Smith",
      date: "2023-06-15",
      medications: [
        { name: "Paracetamol 500mg", timing: "Twice a day", price: "$5" },
        { name: "Vitamin C 1000mg", timing: "Once a day", price: "$8" }
      ],
      notes: "Take with food. Stay hydrated.",
      isActive: true
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      date: "2023-05-20",
      medications: [
        { name: "Amoxicillin 250mg", timing: "Three times a day", price: "$12" },
        { name: "Ibuprofen 400mg", timing: "As needed for pain", price: "$6" }
      ],
      notes: "Complete full course of antibiotics.",
      isActive: false
    },
  ];

  // Mock upcoming appointments
  const appointments = [
    { doctor: "Dr. Jane Smith", specialty: "General Physician", date: "2023-07-05", time: "10:00 AM" },
    { doctor: "Dr. Robert Johnson", specialty: "Cardiologist", date: "2023-07-15", time: "2:30 PM" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">
            Your patient dashboard
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Prescriptions</CardTitle>
                <CardDescription>Your active medication plans</CardDescription>
              </CardHeader>
              <CardContent>
                {prescriptions.filter(p => p.isActive).map(prescription => (
                  <div key={prescription.id} className="mb-6 border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{prescription.doctor}</h3>
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Prescribed on {prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-3 w-3" /> Download
                      </Button>
                    </div>
                    
                    <div className="space-y-3 mb-3">
                      {prescription.medications.map((med, idx) => (
                        <div key={idx} className="flex justify-between bg-slate-50 p-3 rounded-md">
                          <div>
                            <p className="font-medium">{med.name}</p>
                            <p className="text-sm text-muted-foreground">{med.timing}</p>
                          </div>
                          <p className="text-sm font-medium">{med.price}</p>
                        </div>
                      ))}
                    </div>
                    
                    {prescription.notes && (
                      <div className="mt-3 text-sm border-t pt-2">
                        <span className="font-medium">Notes: </span>
                        {prescription.notes}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointments.map((apt, index) => (
                    <div key={index} className="flex flex-col p-3 border rounded-lg">
                      <p className="font-medium">{apt.doctor}</p>
                      <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {apt.date}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {apt.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Button variant="link">Schedule new appointment</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Past Prescriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.filter(p => !p.isActive).map((prescription) => (
                    <div key={prescription.id} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{prescription.doctor}</p>
                        <p className="text-xs text-muted-foreground">{prescription.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        <FileText className="h-3 w-3" />
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
