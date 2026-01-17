import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, FileText, Settings, Phone, DollarSign, Users, Activity, TrendingUp, Calendar, Clock } from 'lucide-react';
import { getPatients } from '../utils/storage';
import { getInvoices } from '../utils/invoiceStorage';
import { getReminders } from '../utils/reminderStorage';
import { Reminders } from '../components/Reminders';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalRevenue: 0,
    pendingInvoices: 0,
    todaysVisits: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const patients = await getPatients();
      const invoices = await getInvoices();
      const reminders = await getReminders();

      const today = new Date().toISOString().split('T')[0];
      
      setStats({
        totalPatients: patients.length,
        totalRevenue: invoices.reduce((acc, inv) => acc + (inv.status === 'paid' ? inv.total : 0), 0),
        pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
        todaysVisits: reminders.filter(r => r.date === today && r.type === 'visit').length
      });
    };
    fetchData();
  }, []);

  const cards = [
    {
      title: 'Register Patient',
      description: 'Add new patient records',
      icon: UserPlus,
      color: 'bg-blue-500',
      action: () => navigate('/register'),
    },
    {
      title: 'View Records',
      description: 'Manage patient history',
      icon: FileText,
      color: 'bg-teal-500',
      action: () => navigate('/records'),
    },
    {
      title: 'Billing & Invoices',
      description: 'Manage payments',
      icon: DollarSign,
      color: 'bg-emerald-500',
      action: () => navigate('/billing'),
    },
    {
      title: 'Admin Panel',
      description: 'System settings',
      icon: Settings,
      color: 'bg-purple-500',
      action: () => navigate('/admin'),
      adminOnly: true,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-secondary text-white py-12 px-4 shadow-lg mb-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-2 animate-fade-in-up">
            Welcome back, {user?.username}
          </h1>
          <p className="text-blue-100 text-lg opacity-90">
            Here's what's happening in your clinic today.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-50 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalPatients}</h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-500 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-50 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">${stats.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-emerald-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-green-500 font-medium">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-50 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingInvoices}</h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div className="mt-4 text-xs text-orange-500 font-medium">
              Needs attention
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-50 transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Visits</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.todaysVisits}</h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 text-xs text-blue-500 font-medium">
              Check schedule
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                (!card.adminOnly || user?.role === 'admin') && (
                  <div
                    key={card.title}
                    onClick={card.action}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 cursor-pointer group flex items-center"
                  >
                    <div className={`${card.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mr-4`}>
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {card.description}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Reminders Section */}
          <div className="lg:col-span-1 h-full">
             <Reminders />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
