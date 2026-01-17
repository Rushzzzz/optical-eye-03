import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, Lock, Key, CheckCircle, ArrowLeft, User as UserIcon, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';
import { resetPassword, getUsers } from '../utils/userStorage';
import toast from 'react-hot-toast';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate network delay
     // await new Promise(resolve => setTimeout(resolve, 600));

      const users = await getUsers();
      const userExists = users.some(u => u.username === username);

      if (userExists) {
        setStep(2);
      } else {
        setError('Username not found');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
        setError('Password must be at least 6 characters');
        return;
    }

    setLoading(true);

    try {
      // Simulate network delay
      // await new Promise(resolve => setTimeout(resolve, 800));

      const success = await resetPassword(username, newPassword);

      if (success) {
        toast.success('Password reset successfully!');
        navigate('/login');
      } else {
        setError('Failed to reset password');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-primary to-secondary">
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        <div className="text-center mb-8">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Key className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            {step === 1 ? 'Forgot Password?' : 'Reset Password'}
          </h1>
          <p className="text-gray-500 mt-2">
            {step === 1 
              ? 'Enter your username to reset your password' 
              : `Create a new password for "${username}"`}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center border border-red-100 animate-pulse flex items-center justify-center">
             <AlertCircle className="w-4 h-4 mr-2" />
             {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleCheckUser} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Username</label>
              <div className="relative">
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Enter your username"
                  required
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all transform hover:-translate-y-0.5",
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary hover:shadow-xl active:scale-95"
              )}
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>
            
            <div className="text-center mt-4">
                <Link to="/login" className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
                </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">New Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="New password"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">Confirm Password</label>
              <div className="relative">
                <CheckCircle className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 rounded-lg font-semibold text-white shadow-lg transition-all transform hover:-translate-y-0.5",
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-primary to-secondary hover:shadow-xl active:scale-95"
              )}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center mt-4">
                <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-500 hover:text-gray-700 text-sm flex items-center justify-center mx-auto transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Simple icon component for error
const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

export default ForgotPassword;
