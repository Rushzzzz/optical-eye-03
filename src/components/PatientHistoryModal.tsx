import React from 'react';
import { Patient } from '../types';
import { X, Calendar, Activity, Eye, FileText, User } from 'lucide-react';

interface PatientHistoryModalProps {
  patient: Patient;
  isOpen: boolean;
  onClose: () => void;
}

export const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({ patient, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-start text-white shrink-0">
          <div>
            <h2 className="text-2xl font-bold flex items-center">
              <User className="w-6 h-6 mr-3 opacity-80" />
              {patient.full_name}
            </h2>
            <div className="mt-2 flex space-x-4 text-blue-100 text-sm">
              <span className="flex items-center"><span className="opacity-70 mr-1">ID:</span> #{patient.id}</span>
              <span className="flex items-center"><span className="opacity-70 mr-1">Phone:</span> {patient.phone}</span>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Info & Current Status */}
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Patient Details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Address</label>
                    <p className="text-gray-800 font-medium">{patient.address}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">First Visit</label>
                    <p className="text-gray-800 font-medium">{new Date(patient.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Current Prescription</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                    <span className="text-xs text-blue-600 font-bold block mb-1">Right Eye (OD)</span>
                    <span className="text-xl font-bold text-blue-900">{patient.right_eye_power || 'N/A'}</span>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center border border-blue-100">
                    <span className="text-xs text-blue-600 font-bold block mb-1">Left Eye (OS)</span>
                    <span className="text-xl font-bold text-blue-900">{patient.left_eye_power || 'N/A'}</span>
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Last Updated: {new Date(patient.visit_date).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Right Column: Timeline & History */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Medical History & Timeline
                </h3>

                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 pb-4">
                  {/* Current Visit */}
                  <div className="relative pl-8">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></span>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900">Latest Checkup</h4>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {new Date(patient.visit_date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3">
                      Routine eye examination. Updated prescription recorded.
                    </p>
                    
                    {patient.notes && (
                      <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-sm text-amber-800 flex items-start">
                        <FileText className="w-4 h-4 mr-2 shrink-0 mt-0.5" />
                        <p>{patient.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Mock Historical Data (For Demo) */}
                  <div className="relative pl-8 opacity-60">
                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 border-4 border-white"></span>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-700">Initial Registration</h4>
                      <span className="text-xs font-medium bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                        {new Date(patient.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Patient registered in the system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t flex justify-end space-x-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Close
          </button>
          <button className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors flex items-center shadow-lg shadow-primary/20">
            <Eye className="w-4 h-4 mr-2" />
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};
