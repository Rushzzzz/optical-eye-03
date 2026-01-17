import { Invoice } from '../types';
import { apiClient } from '../api/client';

export const getInvoices = async (): Promise<Invoice[]> => {
  try {
    return await apiClient.get('/invoices');
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }
};

export const createInvoice = async (invoice: Invoice): Promise<Invoice | null> => {
  try {
    return await apiClient.post('/invoices', invoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return null;
  }
};

export const updateInvoice = async (id: string, updates: Partial<Invoice>): Promise<boolean> => {
  // Not implemented in backend yet, but structure is here
  // await apiClient.put(`/invoices/${id}`, updates);
  return false;
};

export const deleteInvoice = async (id: string): Promise<boolean> => {
  try {
    await apiClient.delete(`/invoices/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting invoice:', error);
    return false;
  }
};
