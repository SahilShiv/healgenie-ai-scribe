
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-healgenie-900 border-t border-gray-200 dark:border-healgenie-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-healgenie-300 to-healgenie-500 bg-clip-text text-transparent">
                HealGenie
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400">
              Revolutionizing healthcare with AI-powered automation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19.7 3H4.3C3.582 3 3 3.582 3 4.3v15.4c0 .718.582 1.3 1.3 1.3h15.4c.718 0 1.3-.582 1.3-1.3V4.3c0-.718-.582-1.3-1.3-1.3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764h-2.669V14.16c0-.996-.018-2.277-1.388-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387 2.704 0 3.203 1.778 3.203 4.092v4.71z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Solutions</h3>
            <div className="mt-4 space-y-2">
              <a href="#features" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Voice-to-Prescription
              </a>
              <a href="#features" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Automated Medical Records
              </a>
              <a href="#features" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Patient-Centered Care
              </a>
              <a href="#features" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Secure Data Integration
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Support</h3>
            <div className="mt-4 space-y-2">
              <a href="#faq" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                FAQ
              </a>
              <a href="#contact" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Contact Us
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Documentation
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Privacy Policy
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Company</h3>
            <div className="mt-4 space-y-2">
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                About Us
              </a>
              <a href="#testimonials" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Testimonials
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Careers
              </a>
              <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300 block">
                Partners
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-healgenie-800 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-healgenie-500 dark:hover:text-healgenie-300">
              Cookies
            </a>
          </div>
          <p className="mt-8 text-base text-gray-500 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} HealGenie. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
