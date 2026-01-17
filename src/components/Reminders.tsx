import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Trash2, Calendar, User, Plus } from 'lucide-react';
import { Reminder, Patient } from '../types';
import { getReminders, completeReminder, deleteReminder, createReminder } from '../utils/reminderStorage';
import { getPatients } from '../utils/storage';
import toast from 'react-hot-toast';

export const Reminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Reminder Form
  const [selectedPatientId, setSelectedPatientId] = useState<number | ''>('');
  const [reminderType, setReminderType] = useState<'visit' | 'glass_change' | 'checkup'>('visit');
  const [reminderDate, setReminderDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const loadedReminders = await getReminders();
    const loadedPatients = await getPatients();
    // Sort by date (soonest first)
    loadedReminders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setReminders(loadedReminders);
    setPatients(loadedPatients);
    setLoading(false);
  };

  const getPatientName = (id: number) => {
    return patients.find(p => p.id === id)?.full_name || 'Unknown Patient';
  };

  const handleComplete = async (id: string) => {
    if (await completeReminder(id)) {
      toast.success('Reminder marked as complete');
      loadData();
    }
  };

  const handleDelete = async (id: string) => {
    if (await deleteReminder(id)) {
      toast.success('Reminder deleted');
      loadData();
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;

    await createReminder(Number(selectedPatientId), reminderType, reminderDate);
    toast.success('Reminder created successfully');
    setIsAdding(false);
    loadData();
  };

  const pendingReminders = reminders.filter(r => r.status === 'pending');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary" />
          Upcoming Reminders
        </h2>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center"
        >
          <Plus className="w-4 h-4 mr-1" /> Add
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleCreate} className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 animate-fade-in-down">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">Patient</label>
              <select 
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(Number(e.target.value))}
                className="w-full mt-1 p-2 rounded border border-gray-200 text-sm"
                required
              >
                <option value="">Select Patient...</option>
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.full_name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Type</label>
                <select 
                  value={reminderType}
                  onChange={(e) => setReminderType(e.target.value as any)}
                  className="w-full mt-1 p-2 rounded border border-gray-200 text-sm"
                >
                  <option value="visit">Visit</option>
                  <option value="glass_change">Glass Change</option>
                  <option value="checkup">Eye Checkup</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Date</label>
                <input 
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full mt-1 p-2 rounded border border-gray-200 text-sm"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Set Reminder
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {pendingReminders.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No upcoming reminders
          </div>
        ) : (
          pendingReminders.map(reminder => (
            <div key={reminder.id} className="flex items-start justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group">
              <div>
                <div className="flex items-center font-medium text-gray-900 text-sm">
                  <User className="w-3 h-3 mr-1.5 text-gray-400" />
                  {getPatientName(reminder.patient_id)}
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    reminder.type === 'visit' ? 'bg-blue-400' :
                    reminder.type === 'glass_change' ? 'bg-purple-400' : 'bg-green-400'
                  }`}></span>
                  {reminder.type.replace('_', ' ')} • {new Date(reminder.date).toLocaleDateString()}
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleComplete(reminder.id)}
                  className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                  title="Mark Complete"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(reminder.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
