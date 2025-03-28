
export interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  user_type: 'doctor' | 'patient';
  profile_symbol_id: number | null;
  created_at: string;
  updated_at: string;
}

export interface DoctorProfile {
  id: string;
  designation: string;
  specialty: string;
  experience: number;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile {
  id: string;
  date_of_birth: string;
  age: number;
  allergies: string[] | null;
  medical_history: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileSymbol {
  id: number;
  name: string;
  icon_url: string;
  created_at: string;
}

export interface Prescription {
  id: string;
  doctor_id: string;
  patient_id: string;
  disease: string | null;
  symptoms: string[] | null;
  is_active: boolean;
  special_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PrescriptionMedicine {
  id: string;
  prescription_id: string;
  name: string;
  timing: string;
  price: number | null;
  created_at: string;
}

export interface DoctorPatient {
  id: string;
  doctor_id: string;
  patient_id: string;
  last_visit: string | null;
  created_at: string;
}
