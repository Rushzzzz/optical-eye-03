import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We are here to help you with your vision needs. Reach out to us through any of the channels below or visit our clinic.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Phone Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Phone className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-500 mb-4">Mon-Fri from 8am to 6pm</p>
          <a href="tel:+15551234567" className="text-primary font-semibold hover:underline">
            +1 (555) 123-4567
          </a>
        </div>

        {/* Email Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
          <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <Mail className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
          <p className="text-gray-500 mb-4">Our friendly team is here to help</p>
          <a href="mailto:contact@opticaleye.clinic" className="text-primary font-semibold hover:underline">
            contact@opticaleye.clinic
          </a>
        </div>

        {/* Location Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center group">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <MapPin className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Clinic</h3>
          <p className="text-gray-500 mb-4">Come say hello at our office</p>
          <p className="text-gray-900 font-medium">
            123 Vision Street<br />
            New York, NY 10001
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-start space-x-4">
          <div className="bg-orange-100 p-3 rounded-full text-orange-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Opening Hours</h3>
            <div className="space-y-1 text-gray-600">
              <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p>Saturday: 9:00 AM - 2:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
        
        <a 
          href="https://maps.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          <span>Get Directions</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default Contact;
