import React, { useState } from 'react';
import { Search, MapPin, PlusCircle, Sparkles, User, Heart, MessageSquare, Menu, X, LogOut, Calculator } from 'lucide-react';
import { UserProfile } from '../types';
import { STATES_DISTRICTS } from '../data/categories';

interface NavbarProps {
  user: UserProfile | null;
  selectedState: string;
  selectedCity: string;
  searchQuery: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  onSearchChange: (query: string) => void;
  onOpenSellModal: () => void;
  onOpenAuthModal: () => void;
  onOpenAIValuation: () => void;
  onOpenAIPriceModal: () => void;
  onOpenChatModal: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  selectedState,
  selectedCity,
  searchQuery,
  onStateChange,
  onCityChange,
  onSearchChange,
  onOpenSellModal,
  onOpenAuthModal,
  onOpenAIValuation,
  onOpenAIPriceModal,
  onOpenChatModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const availableCities = STATES_DISTRICTS.find(s => s.state === selectedState)?.cities || [];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top AI Bar Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">AI Powered</span>
            <span>भारत का पहला स्मार्ट कृषि व ग्रामीण मार्केटप्लेस</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenAIValuation}
              className="flex items-center space-x-1 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>पशु AI मूल्य आंकलन</span>
            </button>
            <span>|</span>
            <button
              onClick={onOpenAIPriceModal}
              className="flex items-center space-x-1 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>ट्रैक्टर/गाड़ी AI वैल्यू</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 shrink-0">
            <a href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                त्र
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Triveni<span className="text-emerald-600">Plus</span>
                </span>
                <span className="block text-[10px] text-emerald-700 font-bold -mt-1 tracking-wider uppercase">
                  किसान व पशु बाजार
                </span>
              </div>
            </a>
          </div>

          {/* Location & Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4 space-x-2">
            {/* Location Selectors */}
            <div className="flex items-center border border-slate-300 rounded-lg bg-slate-50 px-2 py-1.5 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 shrink-0">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mr-1" />
              <select
                value={selectedState}
                onChange={(e) => {
                  onStateChange(e.target.value);
                  onCityChange('All');
                }}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer pr-1"
              >
                {STATES_DISTRICTS.map((st) => (
                  <option key={st.state} value={st.state}>
                    {st.state}
                  </option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="bg-transparent text-xs text-slate-600 focus:outline-none cursor-pointer border-l border-slate-300 pl-1"
              >
                <option value="All">सभी जिले</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="खोजें: गाय, मुर्रा भैंस, ट्रैक्टर, गेहूं, आलू, कार..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={onOpenChatModal}
                  className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-full transition-colors relative"
                  title="संदेश / चैट"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">{user.name}</p>
                    <p className="text-[10px] text-slate-500">{user.phone}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="लॉगआउट"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-1 text-sm font-semibold text-slate-700 hover:text-emerald-600 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>लॉगिन / रजिस्ट्रेशन</span>
              </button>
            )}

            {/* Sell Button */}
            <button
              onClick={onOpenSellModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5" />
              <span>फसल/सामान बेचें</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={onOpenSellModal}
              className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-xs flex items-center space-x-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>बेचें</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="गाय, भैंस, ट्रैक्टर, आलू, कार खोजें..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500">राज्य व जिला चुनें:</label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedState}
                onChange={(e) => onStateChange(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs p-2 rounded-lg text-slate-800 font-medium"
              >
                {STATES_DISTRICTS.map((st) => (
                  <option key={st.state} value={st.state}>{st.state}</option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => onCityChange(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs p-2 rounded-lg text-slate-800"
              >
                <option value="All">सभी जिले</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <button
              onClick={() => { onOpenAIValuation(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-semibold text-xs"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>पशु AI मूल्य आंकलन तंत्र</span>
              </span>
              <span className="text-[10px] bg-amber-200 px-1.5 py-0.5 rounded">मुफ्त</span>
            </button>

            <button
              onClick={() => { onOpenAIPriceModal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 font-semibold text-xs"
            >
              <span className="flex items-center space-x-2">
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>ट्रैक्टर व वाहन मूल्य कैलकुलेटर</span>
              </span>
              <span className="text-[10px] bg-blue-200 px-1.5 py-0.5 rounded">AI</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100">
            {user ? (
              <div className="flex items-center justify-between p-2">
                <div>
                  <p className="text-sm font-bold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-500">{user.phone}</p>
                </div>
                <button onClick={onLogout} className="text-xs text-rose-600 font-bold border border-rose-200 px-3 py-1.5 rounded-lg">
                  लॉगआउट
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAuthModal(); setMobileMenuOpen(false); }}
                className="w-full bg-slate-900 text-white font-bold py-2.5 rounded-lg text-sm"
              >
                लॉगिन / रजिस्टर करें
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
