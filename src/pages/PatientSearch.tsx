
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Search, UserPlus, User } from 'lucide-react';

const PatientSearch = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.userType !== 'doctor') {
    return <Navigate to="/login" />;
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Search Error",
        description: "Please enter a patient name or ID",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);

    // Mock search results - in a real app, this would call an API
    setTimeout(() => {
      const mockResults = [
        { id: 1, name: "John Doe", age: 35, lastVisit: "2023-05-15" },
        { id: 2, name: "Jane Smith", age: 28, lastVisit: "2023-06-02" },
      ].filter(patient => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(mockResults);
      setIsSearching(false);
      
      if (mockResults.length === 0) {
        toast({
          title: "No patients found",
          description: "No patients match your search criteria",
        });
      }
    }, 1000);
  };

  const handlePatientSelect = (patientId: number) => {
    navigate(`/patient/${patientId}`);
  };

  const handleRegisterNew = () => {
    toast({
      title: "Feature coming soon",
      description: "Patient registration will be available in the next update",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Patient Search</h1>
          <p className="text-muted-foreground">
            Search for existing patients or register a new one
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search by patient name or ID" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" disabled={isSearching} className="bg-healgenie-300 hover:bg-healgenie-400">
                {isSearching ? "Searching..." : "Search"}
              </Button>
              <Button type="button" variant="outline" onClick={handleRegisterNew} className="border-healgenie-300 text-healgenie-500">
                <UserPlus className="mr-2 h-4 w-4" />
                Register New
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {searchResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {searchResults.map((patient) => (
                  <div 
                    key={patient.id} 
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-slate-50"
                    onClick={() => handlePatientSelect(patient.id)}
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-healgenie-100 flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-healgenie-500" />
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">Age: {patient.age} • Last Visit: {patient.lastVisit}</p>
                      </div>
                    </div>
                    <Button variant="ghost">View Records</Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Showing {searchResults.length} {searchResults.length === 1 ? 'patient' : 'patients'}
              </p>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;
