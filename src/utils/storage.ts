import { Patient } from '../types';
import { apiClient } from '../api/client';

export const getPatients = async (): Promise<Patient[]> => {
  try {
    return await apiClient.get('/patients');
  } catch (error) {
    console.error('Error fetching patients:', error);
    return [];
  }
};

export const addPatient = async (patientData: Omit<Patient, 'id' | 'created_at' | 'registered_by'>): Promise<Patient | null> => {
  try {
    return await apiClient.post('/patients', patientData);
  } catch (error) {
    console.error('Error adding patient:', error);
    return null;
  }
};

export const updatePatient = async (id: number, updates: Partial<Patient>): Promise<boolean> => {
  try {
    await apiClient.put(`/patients/${id}`, updates);
    return true;
  } catch (error) {
    console.error('Error updating patient:', error);
    return false;
  }
};

export const deletePatient = async (id: number): Promise<boolean> => {
  try {
    await apiClient.delete(`/patients/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting patient:', error);
    return false;
  }
};

// Legacy stubs to prevent immediate crashes before full refactor (optional, but good practice)
export const savePatients = () => {}; 
