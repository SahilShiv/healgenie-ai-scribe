
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { User, Eye, EyeOff, Mail, Lock, Phone, Briefcase, Stethoscope, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ProfileSymbol } from '@/integrations/supabase/types.custom';
import { DatePicker } from '@/components/ui/date-picker';

const Register = () => {
  // Common form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState<'doctor' | 'patient'>('patient');
  const [profileSymbolId, setProfileSymbolId] = useState<number | null>(null);

  // Doctor-specific fields
  const [designation, setDesignation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [experience, setExperience] = useState<number>(0);

  // Patient-specific fields
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined);
  const [age, setAge] = useState<number>(0);
  const [allergies, setAllergies] = useState<string>('');

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileSymbols, setProfileSymbols] = useState<ProfileSymbol[]>([]);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch profile symbols on component mount
  useEffect(() => {
    const fetchProfileSymbols = async () => {
      const { data } = await supabase
        .from('profile_symbols')
        .select('*')
        .order('id', { ascending: true });
      
      if (data) {
        setProfileSymbols(data);
        if (data.length > 0) {
          setProfileSymbolId(data[0].id);
        }
      }
    };

    fetchProfileSymbols();
  }, []);

  // Calculate age from date of birth
  useEffect(() => {
    if (dateOfBirth) {
      const today = new Date();
      let calculatedAge = today.getFullYear() - dateOfBirth.getFullYear();
      const monthDiff = today.getMonth() - dateOfBirth.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
        calculatedAge--;
      }
      
      setAge(calculatedAge);
    }
  }, [dateOfBirth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Additional validations based on user type
    if (userType === 'doctor' && (!designation || !specialty)) {
      toast({
        title: "Error",
        description: "Please fill in all doctor-specific information",
        variant: "destructive",
      });
      return;
    }

    if (userType === 'patient' && !dateOfBirth) {
      toast({
        title: "Error",
        description: "Please provide your date of birth",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        user_type: userType,
        phone,
        profile_symbol_id: profileSymbolId || undefined,
        // Doctor-specific fields
        designation: userType === 'doctor' ? designation : undefined,
        specialty: userType === 'doctor' ? specialty : undefined,
        experience: userType === 'doctor' ? experience : undefined,
        // Patient-specific fields
        date_of_birth: userType === 'patient' && dateOfBirth ? dateOfBirth.toISOString() : undefined,
        age: userType === 'patient' ? age : undefined,
        allergies: userType === 'patient' && allergies ? allergies.split(',').map(a => a.trim()) : undefined,
      };
      
      const success = await register(userData);
      
      if (success) {
        toast({
          title: "Account created!",
          description: "Your account has been created successfully",
        });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex md:flex-row flex-col">
        {/* Left side - Form */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>Sign up to get started with HealGenie</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="patient" onValueChange={(value) => setUserType(value as 'doctor' | 'patient')}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="patient">Patient</TabsTrigger>
                  <TabsTrigger value="doctor">Doctor</TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name*</Label>
                      <Input 
                        id="firstName" 
                        placeholder="John" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name*</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Doe" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="(123) 456-7890" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <TabsContent value="doctor" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation*</Label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="designation" 
                          placeholder="Medical Doctor" 
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty*</Label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="specialty" 
                          placeholder="Cardiology" 
                          value={specialty}
                          onChange={(e) => setSpecialty(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input 
                        id="experience" 
                        type="number" 
                        min="0"
                        value={experience}
                        onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="patient" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth*</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <DatePicker 
                          date={dateOfBirth} 
                          setDate={setDateOfBirth} 
                          className="pl-10 w-full" 
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input 
                        id="age" 
                        type="number" 
                        min="0"
                        value={age}
                        onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                        readOnly
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                      <Input 
                        id="allergies" 
                        placeholder="Penicillin, Peanuts, etc." 
                        value={allergies}
                        onChange={(e) => setAllergies(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <div className="space-y-2">
                    <Label>Profile Symbol</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {profileSymbols.map((symbol) => (
                        <div 
                          key={symbol.id} 
                          className={`flex flex-col items-center p-2 rounded-md cursor-pointer ${
                            profileSymbolId === symbol.id ? 'bg-healgenie-100 border-2 border-healgenie-300' : 'border hover:bg-gray-50'
                          }`}
                          onClick={() => setProfileSymbolId(symbol.id)}
                        >
                          <Avatar className="h-12 w-12 mb-1">
                            <AvatarImage src={symbol.icon_url} alt={symbol.name} />
                            <AvatarFallback>{symbol.name.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-center truncate w-full">{symbol.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password*</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password*</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="confirmPassword" 
                        type={showConfirmPassword ? "text" : "password"} 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-healgenie-300 hover:bg-healgenie-400" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-healgenie-500 hover:text-healgenie-600 font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right side - Image */}
        <div className="flex-1 bg-cover bg-center hidden md:block" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}>
          <div className="w-full h-full bg-healgenie-900/30 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md text-white max-w-md">
              <h2 className="text-2xl font-bold mb-4">Join Our Healthcare Platform</h2>
              <p className="mb-4">Create your account to experience seamless healthcare management and patient care.</p>
              <div className="flex items-center space-x-2">
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <div className="h-1 w-1 rounded-full bg-white"></div>
                <div className="h-1 w-1 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
