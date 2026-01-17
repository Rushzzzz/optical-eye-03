import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft, User, DollarSign, Calculator } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Invoice, InvoiceItem, Patient } from '../types';
import { createInvoice } from '../utils/invoiceStorage';
import { getPatients } from '../utils/storage';
import toast from 'react-hot-toast';

const NewInvoice: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | ''>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [status, setStatus] = useState<'paid' | 'pending'>('pending');

  useEffect(() => {
    const loadData = async () => {
      const loadedPatients = await getPatients();
      setPatients(loadedPatients);
    };
    loadData();
  }, []);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      category: 'checkup',
      quantity: 1,
      price: 0
    };
    setItems([...items, newItem]);
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * taxRate) / 100;
    return subtotal - discountAmount + taxAmount;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) {
      toast.error('Please select a patient');
      return;
    }
    if (items.length === 0) {
      toast.error('Please add at least one item');
      return;
    }

    const invoice: Invoice = {
      id: Date.now().toString().slice(-6), // Simple short ID
      patient_id: Number(selectedPatientId),
      date,
      items,
      discount,
      tax: taxRate,
      subtotal: calculateSubtotal(),
      total: calculateTotal(),
      status,
      created_at: new Date().toISOString()
    };

    createInvoice(invoice);
    toast.success('Invoice created successfully');
    navigate('/billing');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/billing')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Patient & Date Selection */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Patient</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none appearance-none bg-white"
                  required
                >
                  <option value="">Choose a patient...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.full_name} - {p.phone}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                required
              />
            </div>
          </div>

          {/* Invoice Items */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">Items</h2>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center text-primary hover:text-primary-dark font-medium"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-start bg-gray-50 p-4 rounded-lg">
                  <div className="col-span-12 md:col-span-5">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <select
                      value={item.category}
                      onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary outline-none"
                    >
                      <option value="checkup">Checkup</option>
                      <option value="frames">Frames</option>
                      <option value="lenses">Lenses</option>
                      <option value="medicines">Medicines</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {items.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  No items added yet. Click "Add Item" to start.
                </div>
              )}
            </div>
          </div>

          {/* Summary & Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStatus('pending')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    status === 'pending' 
                      ? 'border-yellow-400 bg-yellow-50 text-yellow-800' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  Pending
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('paid')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-medium transition-all ${
                    status === 'paid' 
                      ? 'border-green-400 bg-green-50 text-green-800' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-600'
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex justify-between items-center text-gray-600">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value))}
                  className="w-20 px-2 py-1 rounded border border-gray-200 text-right outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (%)</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-20 px-2 py-1 rounded border border-gray-200 text-right outline-none focus:border-primary"
                />
              </div>
              <div className="border-t pt-4 flex justify-between items-center text-xl font-bold text-gray-900">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInvoice;
