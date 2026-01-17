import { Reminder } from '../types';
import { apiClient } from '../api/client';

export const getReminders = async (): Promise<Reminder[]> => {
  try {
    return await apiClient.get('/reminders');
  } catch (error) {
    console.error('Error fetching reminders:', error);
    return [];
  }
};

export const createReminder = async (patientId: number, type: 'visit' | 'glass_change' | 'checkup', date: string): Promise<Reminder | null> => {
  try {
    return await apiClient.post('/reminders', { patient_id: patientId, type, date });
  } catch (error) {
    console.error('Error creating reminder:', error);
    return null;
  }
};

export const completeReminder = async (id: string): Promise<boolean> => {
  try {
    await apiClient.put(`/reminders/${id}/complete`, {});
    return true;
  } catch (error) {
    console.error('Error completing reminder:', error);
    return false;
  }
};

export const deleteReminder = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/reminders/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting reminder:', error);
    return false;
  }
};
