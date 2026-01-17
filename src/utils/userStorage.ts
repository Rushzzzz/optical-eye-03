import { User } from '../types';
import { apiClient } from '../api/client';

// We now use the API for authentication

export const verifyCredentials = async (username: string, password: string): Promise<User | null> => {
  try {
    const response = await apiClient.post('/auth/login', { username, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      return response.user;
    }
    return null;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export const getUsers = async (): Promise<User[]> => {
  // In a real app, this might be an admin-only API
  // For now, we mock it or if we had an endpoint
  // return await apiClient.get('/users');
  return []; 
};

export const addUser = async (username: string, password: string, role: 'admin' | 'staff'): Promise<User | null> => {
  // return await apiClient.post('/users', { username, password, role });
  return null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  // return await apiClient.delete(`/users/${id}`);
  return false;
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string): Promise<boolean> => {
  // return await apiClient.post('/auth/change-password', { currentPassword, newPassword });
  return false;
};

export const resetPassword = async (username: string, newPassword: string): Promise<boolean> => {
  // return await apiClient.post('/auth/reset-password', { username, newPassword });
  return false;
};
