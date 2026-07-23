import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone, ShieldCheck, User, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, setCurrentUser, states } = useApp();
  
  const [step, setStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState('उत्तर प्रदेश');
  const [district, setDistrict] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
    } else {
      alert('कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setStep('details');
    } else {
      alert('कृपया 4 अंकों का OTP दर्ज करें (Demo: 1234)');
    }
  };

  const handleCompleteRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !district) {
      alert('कृपया सभी जानकारी भरें');
      return;
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      phone: `+91 ${phone}`,
      state,
      district,
      verified: true,
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200`
    };

    setCurrentUser(newUser);
    closeAuthModal();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">त्रिवेणी प्लस पर साइन इन करें</h2>
          <p className="text-xs text-gray-500 mt-1">खरीदने और बेचने के लिए अपना खाता बनाएं</p>
        </div>

        {/* Step 1: Phone */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">मोबाइल नंबर दर्ज करें</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-sm font-semibold text-gray-500">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-300 text-gray-900 font-semibold focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors shadow-md shadow-emerald-800/10"
            >
              <span>OTP भेजें</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: OTP */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <p className="text-xs text-center text-gray-600 mb-3">
                <span className="font-semibold text-gray-800">+91 {phone}</span> पर भेजा गया OTP दर्ज करें
              </p>
              <input
                type="text"
                maxLength={4}
                placeholder="1234"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full text-center tracking-[1em] text-2xl font-black py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-emerald-600"
                required
              />
              <p className="text-[10px] text-emerald-600 text-center mt-1">डेमो OTP: 1234</p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
            >
              <span>सत्यापित करें (Verify)</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 3: User Details */}
        {step === 'details' && (
          <form onSubmit={handleCompleteRegistration} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">आपका नाम</label>
              <input
                type="text"
                placeholder="राम कुमार"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">राज्य (State)</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-emerald-600"
              >
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">जिला (District)</label>
              <input
                type="text"
                placeholder="जैसे: लखनऊ, इंदौर"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-emerald-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors mt-2"
            >
              <span>प्रोफाइल बनाएं & शुरू करें</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
