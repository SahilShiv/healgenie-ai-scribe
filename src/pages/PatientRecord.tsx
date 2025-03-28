
import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, FileText, Calendar, Activity, Pill } from 'lucide-react';

const PatientRecord = () => {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [generating, setGenerating] = useState(false);
  const [prescription, setPrescription] = useState<string | null>(null);

  // Mock patient data - in a real app, this would be fetched from an API using the ID
  const patientData = {
    id: id,
    name: "John Doe",
    age: 35,
    dob: "1989-05-12",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    allergies: ["Penicillin", "Peanuts"],
    bloodType: "O+",
    lastVisit: "2023-05-15",
    medicalHistory: [
      { date: "2023-05-15", diagnosis: "Common Cold", doctor: "Dr. Jane Smith" },
      { date: "2023-02-22", diagnosis: "Sprained Ankle", doctor: "Dr. Mark Johnson" },
      { date: "2022-11-10", diagnosis: "Annual Checkup", doctor: "Dr. Jane Smith" },
    ],
    prescriptions: [
      { 
        id: "RX123456", 
        date: "2023-05-15", 
        medications: [
          { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", duration: "7 days" }
        ],
        doctor: "Dr. Jane Smith",
        notes: "Take with food. Complete full course."
      },
      { 
        id: "RX123123", 
        date: "2022-11-10", 
        medications: [
          { name: "Vitamin D", dosage: "2000 IU", frequency: "Once daily", duration: "30 days" }
        ],
        doctor: "Dr. Jane Smith",
        notes: "Supplement for deficiency."
      },
    ]
  };

  if (!isAuthenticated || (user?.userType !== 'doctor' && user?.userType !== 'patient')) {
    return <Navigate to="/login" />;
  }

  // Only the patient with matching ID or a doctor can view this page
  if (user?.userType === 'patient' && user.id !== id) {
    return <Navigate to="/patient-dashboard" />;
  }

  const handleGeneratePrescription = () => {
    setGenerating(true);
    // Simulate AI processing time
    setTimeout(() => {
      const generatedPrescription = `
<med>
  <nm>Ibuprofen 400mg</nm>
  <time>Three times daily</time>
  <price>$8</price>
</med>
<med>
  <nm>Pseudoephedrine 60mg</nm>
  <time>Every 12 hours</time>
  <price>$12</price>
</med>
<note>Take with food. Avoid alcohol while on this medication.</note>`;
      setPrescription(generatedPrescription);
      setGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Patient Info Card */}
          <Card className="md:w-1/3">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl font-bold flex items-center">
                <div className="h-12 w-12 rounded-full bg-healgenie-100 flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-healgenie-500" />
                </div>
                {patientData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Age</span>
                  <span className="font-medium">{patientData.age}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Date of Birth</span>
                  <span className="font-medium">{patientData.dob}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{patientData.phone}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{patientData.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b">
                  <span className="text-muted-foreground">Blood Type</span>
                  <span className="font-medium">{patientData.bloodType}</span>
                </div>
                <div className="flex flex-col py-1">
                  <span className="text-muted-foreground mb-1">Allergies</span>
                  <div className="flex flex-wrap gap-1">
                    {patientData.allergies.map((allergy, i) => (
                      <span key={i} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Content */}
          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">Medical History</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Last Visit</p>
                                <p className="text-xl font-bold">{patientData.lastVisit}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-muted-foreground mr-2" />
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Total Visits</p>
                                <p className="text-xl font-bold">{patientData.medicalHistory.length}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Show AI assistant only for doctors */}
                      {user?.userType === 'doctor' && (
                        <Card className="bg-healgenie-50">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">AI Assistant</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4 text-sm">
                              Use AI to help generate a prescription based on patient's history, allergies, and symptoms.
                            </p>
                            {!prescription ? (
                              <Button 
                                onClick={handleGeneratePrescription} 
                                disabled={generating}
                                className="bg-healgenie-500 hover:bg-healgenie-600"
                              >
                                {generating ? 'Processing...' : 'Generate Prescription'}
                              </Button>
                            ) : (
                              <div className="bg-white p-3 rounded-md border font-mono text-sm">
                                <pre>{prescription}</pre>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="history" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientData.medicalHistory.map((entry, i) => (
                        <div key={i} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                          <div className="h-10 w-10 rounded-full bg-healgenie-100 flex items-center justify-center mr-4">
                            <Activity className="h-5 w-5 text-healgenie-500" />
                          </div>
                          <div>
                            <h4 className="font-medium">{entry.diagnosis}</h4>
                            <p className="text-sm text-muted-foreground">Date: {entry.date}</p>
                            <p className="text-sm text-muted-foreground">Doctor: {entry.doctor}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="prescriptions" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Prescriptions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patientData.prescriptions.map((prescription, i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <div className="h-8 w-8 rounded-full bg-healgenie-100 flex items-center justify-center mr-3">
                              <Pill className="h-4 w-4 text-healgenie-500" />
                            </div>
                            <div>
                              <h4 className="font-medium">Prescription #{prescription.id}</h4>
                              <p className="text-sm text-muted-foreground">Date: {prescription.date}</p>
                            </div>
                          </div>
                          
                          <div className="ml-11 mt-2">
                            <h5 className="text-sm font-medium mb-1">Medications:</h5>
                            <ul className="space-y-2 mb-2">
                              {prescription.medications.map((med, j) => (
                                <li key={j} className="text-sm bg-slate-50 p-2 rounded">
                                  <span className="font-medium">{med.name}</span> - {med.dosage}, {med.frequency}, for {med.duration}
                                </li>
                              ))}
                            </ul>
                            {prescription.notes && (
                              <div className="text-sm">
                                <span className="font-medium">Notes: </span>
                                {prescription.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Download All Prescriptions
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecord;
