import React, { useState } from 'react';
import { MANDI_RATES } from '../data/categories';
import { TrendingUp, TrendingDown, Minus, Search, Sparkles, MapPin, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MandiBhavWidget: React.FC = () => {
  const { openAIPriceModal } = useApp();
  const [mandiSearch, setMandiSearch] = useState('');
  const [selectedMandiState, setSelectedMandiState] = useState('All');

  const filteredRates = MANDI_RATES.filter(item => {
    const matchesSearch = item.cropHi.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                          item.crop.toLowerCase().includes(mandiSearch.toLowerCase()) ||
                          item.mandiHi.toLowerCase().includes(mandiSearch.toLowerCase());
    const matchesState = selectedMandiState === 'All' || item.state === selectedMandiState;
    return matchesSearch && matchesState;
  });

  return (
    <section id="mandi" className="my-8 bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-xl border border-emerald-700/50 relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>आज के लाइव मंडी भाव (Live Mandi Rates)</span>
            </div>
            <h2 className="text-2xl font-black text-white">देश की प्रमुख मंडियों के ताज़ा भाव</h2>
            <p className="text-xs text-emerald-200 mt-0.5">रोज़ाना अपडेट किए गए विश्वसनीय बाज़ार मूल्य</p>
          </div>

          {/* AI Mandi Predictor Button */}
          <button
            onClick={() => openAIPriceModal()}
            className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-4 py-2.5 rounded-2xl flex items-center space-x-2 shadow-lg shadow-amber-500/20 transition-all transform hover:scale-102 shrink-0"
          >
            <Sparkles className="w-5 h-5 text-emerald-950 fill-emerald-950" />
            <span>AI मंडी भाव भविष्यवाणी (AI Price Predictor)</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="फसल या मंडी खोजें (जैसे: गेहूं, इंदौर)..."
              value={mandiSearch}
              onChange={(e) => setMandiSearch(e.target.value)}
              className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-emerald-300/60 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <select
              value={selectedMandiState}
              onChange={(e) => setSelectedMandiState(e.target.value)}
              className="w-full bg-emerald-900/60 border border-emerald-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
            >
              <option value="All" className="bg-emerald-950">सभी राज्य</option>
              <option value="उत्तर प्रदेश" className="bg-emerald-950">उत्तर प्रदेश</option>
              <option value="मध्य प्रदेश" className="bg-emerald-950">मध्य प्रदेश</option>
              <option value="राजस्थान" className="bg-emerald-950">राजस्थान</option>
              <option value="हरियाणा" className="bg-emerald-950">हरियाणा</option>
              <option value="पंजाब" className="bg-emerald-950">पंजाब</option>
              <option value="महाराष्ट्र" className="bg-emerald-950">महाराष्ट्र</option>
            </select>
          </div>
        </div>

        {/* Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredRates.map((rate) => (
            <div 
              key={rate.id}
              className="bg-emerald-900/40 hover:bg-emerald-900/80 border border-emerald-700/60 rounded-2xl p-4 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-white text-base">{rate.cropHi}</h3>
                  <p className="text-[11px] text-emerald-300 flex items-center">
                    <MapPin className="w-3 h-3 text-amber-400 mr-1" />
                    {rate.mandiHi} ({rate.state})
                  </p>
                </div>
                
                {/* Trend Badge */}
                <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center space-x-0.5 ${
                  rate.trend === 'up' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : rate.trend === 'down' 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                    : 'bg-gray-500/20 text-gray-300 border border-gray-500/40'
                }`}>
                  {rate.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-400" />}
                  {rate.trend === 'down' && <TrendingDown className="w-3 h-3 text-red-400" />}
                  {rate.trend === 'stable' && <Minus className="w-3 h-3 text-gray-400" />}
                  <span>₹ {Math.abs(rate.change)}</span>
                </div>
              </div>

              {/* Price Details */}
              <div className="mt-3 pt-3 border-t border-emerald-800/80 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-emerald-300 block">मॉडल भाव (Model Price)</span>
                  <span className="text-lg font-black text-amber-400">₹ {rate.modalPrice}</span>
                  <span className="text-[10px] text-emerald-300"> / कुंतल</span>
                </div>
                
                <div className="text-right text-[10px] text-emerald-300">
                  <span>न्यूनतम: ₹{rate.minPrice}</span>
                  <span className="block">अधिकतम: ₹{rate.maxPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRates.length === 0 && (
          <div className="text-center py-8 text-emerald-200">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
            <p>आपकी खोज से संबंधित कोई मंडी भाव नहीं मिला।</p>
          </div>
        )}

      </div>
    </section>
  );
};
