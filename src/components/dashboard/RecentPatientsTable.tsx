
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  condition: string;
}

interface RecentPatientsTableProps {
  patients: Patient[];
}

const RecentPatientsTable = ({ patients }: RecentPatientsTableProps) => {
  const navigate = useNavigate();

  const handleViewPatient = (id: number) => {
    navigate(`/patient/${id}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient Name</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Last Visit</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell className="font-medium">{patient.name}</TableCell>
              <TableCell>{patient.age}</TableCell>
              <TableCell>{patient.lastVisit}</TableCell>
              <TableCell>{patient.condition}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleViewPatient(patient.id)}
                >
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentPatientsTable;
