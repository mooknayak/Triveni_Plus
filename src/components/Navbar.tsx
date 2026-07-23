import React, { useState } from 'react';
import { 
  Search, 
  PlusCircle, 
  User, 
  MessageSquare, 
  Heart, 
  Menu, 
  X, 
  MapPin, 
  Sparkles, 
  TrendingUp,
  Store,
  ShieldCheck,
  LogOut,
  Bell,
  Languages,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedState, 
    setSelectedState,
    states,
    currentUser,
    logout,
    openAuthModal,
    openSellModal,
    unreadMessagesCount,
    savedListings,
    language,
    setLanguage
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md">
      {/* Top micro bar */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>भारत का विश्वसनीय कृषि बाज़ार (Bharat Ka Agro Marketplace)</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1 hover:text-white transition-colors"
              >
                <Languages className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'हिंदी' : 'English'}</span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white text-gray-800 rounded shadow-lg py-1 z-50">
                  <button
                    onClick={() => { setLanguage('hi'); setIsLangDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span>हिंदी</span>
                    {language === 'hi' && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => { setLanguage('en'); setIsLangDropdownOpen(false); }}
                    className="w-full text-left px-3 py-1.5 text-xs hover:bg-emerald-50 flex items-center justify-between"
                  >
                    <span>English</span>
                    {language === 'en' && <Check className="w-3 h-3 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>
            <a href="#mandi" className="hover:text-white flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              <span>मंडी भाव (Mandi Rates)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 shrink-0">
            <div className="bg-amber-500 text-emerald-950 p-2 rounded-xl font-bold flex items-center justify-center">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white block leading-none">
                त्रिवेणी<span className="text-amber-400">प्लस</span>
              </span>
              <span className="text-[10px] text-emerald-200 tracking-wider font-medium uppercase block">
                किसान मेला & बाज़ार
              </span>
            </div>
          </a>

          {/* Location Selector & Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl bg-emerald-900/60 p-1.5 rounded-xl border border-emerald-700/50">
            {/* Location dropdown */}
            <div className="flex items-center pl-2 pr-3 border-r border-emerald-700/60 shrink-0 text-emerald-100 text-sm">
              <MapPin className="w-4 h-4 text-amber-400 mr-1.5" />
              <select 
                value={selectedState} 
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent border-none text-emerald-100 text-sm focus:ring-0 cursor-pointer font-medium pr-2"
              >
                <option value="All" className="bg-emerald-900 text-white">सभी राज्य (All States)</option>
                {states.map((st) => (
                  <option key={st} value={st} className="bg-emerald-900 text-white">{st}</option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex items-center flex-1 pl-3 pr-2">
              <Search className="w-4 h-4 text-emerald-300 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="ट्रैक्टर, गाय, थ्रेशर, बीज या उपकरण खोजें..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white placeholder-emerald-300/70 text-sm focus:outline-none focus:ring-0"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-300 hover:text-white text-xs px-1.5 py-0.5 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Sell Button */}
            <button
              onClick={openSellModal}
              className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5" />
              <span>सामान बेचें (Sell)</span>
            </button>

            {/* Auth/Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-emerald-700/60 hover:bg-emerald-700 p-1.5 pr-3 rounded-xl border border-emerald-600/50"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="text-left text-xs">
                    <span className="block font-semibold text-white leading-tight">{currentUser.name}</span>
                    <span className="block text-emerald-300 text-[10px]">{currentUser.phone}</span>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 text-gray-800 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">साइन इन किया हुआ है</p>
                      <p className="text-sm font-bold text-gray-800 truncate">{currentUser.name}</p>
                    </div>
                    <button
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>लॉगआउट (Logout)</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="bg-emerald-700/80 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl flex items-center space-x-2 border border-emerald-600/50 transition-colors"
              >
                <User className="w-4 h-4 text-emerald-300" />
                <span>लॉगिन / रजिस्टर</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={openSellModal}
              className="bg-amber-500 text-emerald-950 font-bold p-2 rounded-xl text-xs flex items-center space-x-1"
            >
              <PlusCircle className="w-4 h-4" />
              <span>बेचें</span>
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-emerald-700/60 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="flex items-center bg-emerald-900/80 p-2 rounded-xl border border-emerald-700">
            <Search className="w-4 h-4 text-emerald-300 mr-2 shrink-0" />
            <input
              type="text"
              placeholder="ट्रैक्टर, गाय, बीज खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none text-white placeholder-emerald-300/70 text-sm focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-emerald-900 border-t border-emerald-800 px-4 py-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs text-emerald-300 font-medium">राज्य चुनें (Select State)</label>
            <select 
              value={selectedState} 
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-emerald-950 text-white p-2.5 rounded-xl border border-emerald-700 text-sm"
            >
              <option value="All">सभी राज्य (All States)</option>
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-emerald-800 flex flex-col space-y-2">
            {currentUser ? (
              <div className="flex items-center justify-between bg-emerald-950 p-3 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-lg" />
                  <div>
                    <p className="font-bold text-sm text-white">{currentUser.name}</p>
                    <p className="text-xs text-emerald-400">{currentUser.phone}</p>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="text-xs bg-red-950/80 text-red-300 border border-red-800 px-3 py-1.5 rounded-lg"
                >
                  लॉगआउट
                </button>
              </div>
            ) : (
              <button
                onClick={() => { openAuthModal(); setIsMobileMenuOpen(false); }}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl flex items-center justify-center space-x-2"
              >
                <User className="w-5 h-5" />
                <span>लॉगिन / रजिस्ट्रेशन करें</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
