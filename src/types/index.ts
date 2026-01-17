export interface User {
  id: number;
  username: string;
  role: 'staff' | 'admin';
}

export interface Patient {
  id: number;
  full_name: string;
  phone: string;
  address: string;
  visit_date: string;
  right_eye_power: string;
  left_eye_power: string;
  notes: string;
  registered_by: number;
  created_at: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  category: 'checkup' | 'frames' | 'lenses' | 'medicines' | 'other';
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  patient_id: number;
  date: string;
  items: InvoiceItem[];
  discount: number;
  tax: number;
  subtotal: number;
  total: number;
  status: 'paid' | 'pending' | 'cancelled';
  created_at: string;
}

export interface Reminder {
  id: string;
  patient_id: number;
  type: 'visit' | 'glass_change' | 'checkup';
  date: string;
  status: 'pending' | 'completed';
  created_at: string;
}
