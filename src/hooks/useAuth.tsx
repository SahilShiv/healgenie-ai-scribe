
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { Profile, DoctorProfile, PatientProfile, ProfileSymbol } from '@/integrations/supabase/types.custom';
import { useToast } from '@/hooks/use-toast';

// Define the auth context type
interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  doctorProfile: DoctorProfile | null;
  patientProfile: PatientProfile | null;
  profileSymbol: ProfileSymbol | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: 'doctor' | 'patient';
    phone?: string;
    profile_symbol_id?: number;
    designation?: string;
    specialty?: string;
    experience?: number;
    date_of_birth?: string;
    age?: number;
    allergies?: string[];
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  doctorProfile: null,
  patientProfile: null,
  profileSymbol: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: async () => {},
  refreshProfile: async () => {},
});

// Create the auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [profileSymbol, setProfileSymbol] = useState<ProfileSymbol | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Fetch user profile data
  const fetchProfileData = async (userId: string, userType?: string) => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch profile symbol if exists
      if (profileData.profile_symbol_id) {
        const { data: symbolData } = await supabase
          .from('profile_symbols')
          .select('*')
          .eq('id', profileData.profile_symbol_id)
          .single();
        setProfileSymbol(symbolData);
      }

      // Fetch specific profile based on user type
      const type = userType || profileData.user_type;
      if (type === 'doctor') {
        const { data: doctorData, error: doctorError } = await supabase
          .from('doctor_profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (doctorError) throw doctorError;
        setDoctorProfile(doctorData);
        setPatientProfile(null);
      } else if (type === 'patient') {
        const { data: patientData, error: patientError } = await supabase
          .from('patient_profiles')
          .select('*')
          .eq('id', userId)
          .single();
        
        if (patientError) throw patientError;
        setPatientProfile(patientData);
        setDoctorProfile(null);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Error fetching profile",
        description: "Your profile could not be loaded",
        variant: "destructive",
      });
    }
  };

  // Function to refresh the profile data
  const refreshProfile = async () => {
    if (user) {
      await fetchProfileData(user.id);
    }
  };

  // Initialize authentication
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use setTimeout to prevent deadlocks
          setTimeout(() => {
            fetchProfileData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setDoctorProfile(null);
          setPatientProfile(null);
          setProfileSymbol(null);
        }

        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchProfileData(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Login successful",
        description: "Welcome to HealGenie!",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Login error",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      });
      return false;
    }
  };

  // Register function
  const register = async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: 'doctor' | 'patient';
    phone?: string;
    profile_symbol_id?: number;
    designation?: string;
    specialty?: string;
    experience?: number;
    date_of_birth?: string;
    age?: number;
    allergies?: string[];
  }): Promise<boolean> => {
    try {
      // Prepare metadata based on user type
      const metadata: any = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone: userData.phone || '',
        user_type: userData.user_type,
      };

      // Add specific fields based on user type
      if (userData.user_type === 'doctor') {
        metadata.designation = userData.designation || 'Doctor';
        metadata.specialty = userData.specialty || 'General Medicine';
        metadata.experience = userData.experience || 0;
      } else if (userData.user_type === 'patient') {
        metadata.date_of_birth = userData.date_of_birth || new Date().toISOString();
        metadata.age = userData.age || 0;
        metadata.allergies = userData.allergies || [];
      }

      // Register the user
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: metadata,
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }

      // If the user was created successfully, update their profile with the profile symbol
      if (data.user && userData.profile_symbol_id) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ profile_symbol_id: userData.profile_symbol_id })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('Error updating profile symbol:', updateError);
        }
      }

      toast({
        title: "Registration successful",
        description: "Welcome to HealGenie!",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Registration error",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        doctorProfile,
        patientProfile,
        profileSymbol,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
