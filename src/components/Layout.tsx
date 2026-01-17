import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Menu, X, User, Moon, Sun, Eye } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/home' },
    { label: 'Records', path: '/records' },
    { label: 'Billing', path: '/billing' },
    { label: 'Admin', path: '/admin', adminOnly: true },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-main)] transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-[var(--card-bg)] shadow-sm border-b border-[var(--border-color)] sticky top-0 z-40 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group" 
              onClick={() => navigate('/home')}
            >
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Eye className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Optical Eye
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-1">
                {navItems.map((item) => (
                  (!item.adminOnly || user?.role === 'admin') && (
                    <button
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        location.pathname.startsWith(item.path)
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-500 hover:text-[var(--text-main)] hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>

              <div className="h-6 w-px bg-[var(--border-color)] mx-2"></div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-[var(--border-color)]">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-semibold text-[var(--text-main)]">{user?.username}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--card-bg)] absolute w-full shadow-lg animate-fade-in-down">
            <div className="p-4 space-y-2">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--text-main)]">{user?.username}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              
              {navItems.map((item) => (
                (!item.adminOnly || user?.role === 'admin') && (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      location.pathname.startsWith(item.path)
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    {item.label}
                  </button>
                )
              ))}
              
              <div className="border-t border-[var(--border-color)] my-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[var(--card-bg)] border-t border-[var(--border-color)] py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Optical Eye Clinic Management System. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs mt-1">
            Version 2.0.0 • Professional Edition
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
