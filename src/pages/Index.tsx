
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, CheckCircle, Heart, UserPlus, Calendar, Shield, Award } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-16"> {/* Padding for navbar */}
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-healgenie-50 dark:from-healgenie-900 dark:to-healgenie-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                  <span className="block">Modern Healthcare,</span>
                  <span className="block text-healgenie-400">Powered by AI</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                  HealGenie connects patients with healthcare providers through our secure platform with AI-assisted diagnosis and treatment recommendations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg" className="bg-healgenie-300 hover:bg-healgenie-400 text-white">
                      Join Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="border-healgenie-300 text-healgenie-500">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white dark:bg-healgenie-800 rounded-lg shadow-xl p-6 border border-gray-100 dark:border-healgenie-700 overflow-hidden">
                  <img 
                    src="/placeholder.svg" 
                    alt="HealGenie Platform"
                    className="w-full h-auto rounded" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white dark:bg-healgenie-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features for Modern Healthcare
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with medical expertise to provide the best care possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-healgenie-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-healgenie-700">
                <div className="bg-healgenie-100 dark:bg-healgenie-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <UserPlus className="text-healgenie-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Easy Patient Registration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Simple onboarding process for patients with secure profile management.
                </p>
              </div>
              
              <div className="bg-white dark:bg-healgenie-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-healgenie-700">
                <div className="bg-healgenie-100 dark:bg-healgenie-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="text-healgenie-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Smart Scheduling</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  AI-powered appointment scheduling that works with your availability.
                </p>
              </div>
              
              <div className="bg-white dark:bg-healgenie-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-healgenie-700">
                <div className="bg-healgenie-100 dark:bg-healgenie-700 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Heart className="text-healgenie-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">AI Treatment Recommendations</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get AI-powered treatment suggestions backed by medical professionals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-16 bg-gray-50 dark:bg-healgenie-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Benefits for Patients and Doctors
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our platform creates value for both healthcare providers and their patients.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-healgenie-500 mb-6">For Patients</h3>
                <ul className="space-y-4">
                  {[
                    "Easy access to qualified healthcare providers",
                    "Secure storage of medical records",
                    "AI-assisted diagnosis suggestions",
                    "Quick prescription refills",
                    "Telemedicine appointment options"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-healgenie-400 mr-3 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-healgenie-500 mb-6">For Doctors</h3>
                <ul className="space-y-4">
                  {[
                    "Streamlined patient management",
                    "AI-powered diagnostic assistance",
                    "Automated appointment scheduling",
                    "Secure messaging with patients",
                    "Easy medical record access and updates"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-healgenie-400 mr-3 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-16 bg-white dark:bg-healgenie-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                See HealGenie in Action
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Watch how our platform streamlines healthcare delivery and improves patient outcomes.
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-healgenie-800 rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <div className="w-full h-96 bg-gray-200 dark:bg-healgenie-700 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400">Demo Video Coming Soon</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 bg-gray-50 dark:bg-healgenie-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Trusted by Healthcare Professionals
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Hear what doctors and patients have to say about their experience with HealGenie.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote: "HealGenie has transformed how I manage my practice. The AI recommendations save me hours of research.",
                  author: "Dr. Michael Chen",
                  role: "Cardiologist"
                },
                {
                  quote: "As a patient with a chronic condition, having all my medical records in one secure place has been life-changing.",
                  author: "Sarah Johnson",
                  role: "Patient"
                },
                {
                  quote: "The diagnostic assistance tools help me confirm my assessments and provide better care for my patients.",
                  author: "Dr. Aisha Patel",
                  role: "Family Physician"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white dark:bg-healgenie-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-healgenie-700">
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-healgenie-100 dark:bg-healgenie-700 rounded-full w-10 h-10 mr-3"></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{testimonial.author}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white dark:bg-healgenie-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Find answers to common questions about the HealGenie platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  question: "Is my medical data secure on HealGenie?",
                  answer: "Yes, we use end-to-end encryption and comply with all healthcare data protection regulations to ensure your information remains private and secure."
                },
                {
                  question: "How accurate are the AI diagnostic suggestions?",
                  answer: "Our AI provides assistance based on the latest medical research, but all suggestions are reviewed by licensed medical professionals before any diagnosis is confirmed."
                },
                {
                  question: "Can I use HealGenie with my existing electronic health records?",
                  answer: "Yes, HealGenie is designed to integrate with most major EHR systems, making the transition smooth for healthcare providers."
                },
                {
                  question: "Is there a mobile app available?",
                  answer: "Yes, HealGenie is available on iOS and Android devices, allowing you to access your healthcare information on the go."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-healgenie-800 p-6 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-gray-50 dark:bg-healgenie-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Have questions about HealGenie? Our team is here to help.
              </p>
            </div>
            
            <div className="bg-white dark:bg-healgenie-900 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 md:p-8 bg-healgenie-300 text-white">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Shield className="h-5 w-5 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Data Security</p>
                        <p className="text-white/80">HIPAA Compliant Platform</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-3 mt-1" />
                      <div>
                        <p className="font-medium">Trusted by Professionals</p>
                        <p className="text-white/80">5000+ Healthcare Providers</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-lg font-medium mb-2">Join Us</p>
                    <div className="flex gap-4">
                      <Link to="/register">
                        <Button className="bg-white text-healgenie-500 hover:bg-gray-100">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Send us a Message</h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-healgenie-800 text-gray-900 dark:text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-healgenie-800 text-gray-900 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-healgenie-800 text-gray-900 dark:text-white"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <div>
                      <Button type="submit" className="w-full bg-healgenie-300 hover:bg-healgenie-400 text-white">
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
