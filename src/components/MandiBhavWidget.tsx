import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Minus, RefreshCw, MessageSquare, Send, Tractor, Sparkles, AlertCircle } from 'lucide-react';

interface MandiRate {
  commodity: string;
  commodityEn: string;
  pricePerQuintal: string;
  mandi: string;
  trend: 'up' | 'down' | 'stable';
}

interface MandiPost {
  id: string;
  user: string;
  location: string;
  message: string;
  time: string;
  verified: boolean;
}

export const MandiBhavWidget: React.FC = () => {
  const { language } = useApp();
  const [rates, setRates] = useState<MandiRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCommodity, setSelectedCommodity] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'rates' | 'forum'>('rates');

  // Community posts for Mandi Bhav Live Chat
  const [posts, setPosts] = useState<MandiPost[]>([
    {
      id: 'p1',
      user: 'रामप्रसाद यादव (आढ़ती)',
      location: 'कानपुर मंडी, UP',
      message: 'आज कानपुर मंडी में गेहूं का सूखा भूसा ₹950 से ₹1050/क्विंटल तक बिका। मांग बहुत तेज है!',
      time: '10 मिनट पहले',
      verified: true
    },
    {
      id: 'p2',
      user: 'गुरकीरत सिंह (किसान)',
      location: 'कर्नाल मंडी, पंजाब',
      message: 'बासमती धान 1509 का भाव आज ₹4,150 रहा। बढ़िया क्वालिटी का दाना आ रहा है।',
      time: '25 मिनट पहले',
      verified: true
    },
    {
      id: 'p3',
      user: 'महेन्द्र सिंह',
      location: 'सीहोर मंडी, MP',
      message: 'शरबाती गेहूं ₹2,700/क्विंटल पार कर गया है। किसानों को अच्छा भाव मिल रहा है।',
      time: '1 घंटे पहले',
      verified: false
    }
  ]);

  const [newMsg, setNewMsg] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderLoc, setSenderLoc] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/mandi-bhav');
      const data = await res.json();
      if (data.success) {
        setRates(data.rates);
      }
    } catch (err) {
      console.error('Error fetching mandi rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const newPostObj: MandiPost = {
      id: 'p-' + Date.now(),
      user: senderName.trim() || 'किसान मित्र',
      location: senderLoc.trim() || 'स्थानीय मंडी',
      message: newMsg.trim(),
      time: 'अभी-अभी',
      verified: true
    };

    setPosts([newPostObj, ...posts]);
    setNewMsg('');
  };

  const filteredRates = selectedCommodity === 'all'
    ? rates
    : rates.filter(r => r.commodityEn.toLowerCase().includes(selectedCommodity.toLowerCase()) || r.commodity.includes(selectedCommodity));

  return (
    <div className="bg-gradient-to-br from-sky-900 via-sky-850 to-indigo-950 text-white rounded-2xl p-4 sm:p-6 shadow-xl border border-sky-700/50 my-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-700/60 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-sky-950 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> LIVE UPDATE
            </span>
            <span className="text-xs text-sky-200 font-semibold">आज का लाइव मंडी भाव व चर्चा</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1 text-white flex items-center gap-2">
            <Tractor className="w-6 h-6 text-amber-300" />
            {language === 'hi' ? 'त्रिवेणी प्लस लाइव मंडी भाव (Mandi Rates)' : 'Triveni Plus Live Market Rates'}
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-sky-950/80 p-1 rounded-xl border border-sky-700/60">
          <button
            onClick={() => setActiveTab('rates')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
              activeTab === 'rates' ? 'bg-sky-500 text-white shadow-md' : 'text-sky-300 hover:text-white'
            }`}
          >
            📊 {language === 'hi' ? 'ताज़ा भाव लिस्ट' : 'Live Rates'}
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'forum' ? 'bg-sky-500 text-white shadow-md' : 'text-sky-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {language === 'hi' ? 'मंडी लाइव चैट' : 'Mandi Forum'}
          </button>
        </div>
      </div>

      {activeTab === 'rates' ? (
        <div className="mt-4">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedCommodity('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition ${
                  selectedCommodity === 'all' ? 'bg-amber-400 text-sky-950' : 'bg-sky-800/60 text-sky-200 hover:bg-sky-800'
                }`}
              >
                {language === 'hi' ? 'सब फसलें' : 'All Produce'}
              </button>
              <button
                onClick={() => setSelectedCommodity('Wheat')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition ${
                  selectedCommodity === 'Wheat' ? 'bg-amber-400 text-sky-950' : 'bg-sky-800/60 text-sky-200 hover:bg-sky-800'
                }`}
              >
                🌾 {language === 'hi' ? 'गेहूं' : 'Wheat'}
              </button>
              <button
                onClick={() => setSelectedCommodity('Bhusa')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition ${
                  selectedCommodity === 'Bhusa' ? 'bg-amber-400 text-sky-950' : 'bg-sky-800/60 text-sky-200 hover:bg-sky-800'
                }`}
              >
                🍂 {language === 'hi' ? 'भूसा व चारा' : 'Fodder/Bhusa'}
              </button>
              <button
                onClick={() => setSelectedCommodity('Mustard')}
                className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap transition ${
                  selectedCommodity === 'Mustard' ? 'bg-amber-400 text-sky-950' : 'bg-sky-800/60 text-sky-200 hover:bg-sky-800'
                }`}
              >
                🌻 {language === 'hi' ? 'सरसों/दलहन' : 'Mustard/Pulses'}
              </button>
            </div>

            <button
              onClick={fetchRates}
              className="text-xs text-sky-300 hover:text-white flex items-center gap-1 cursor-pointer font-bold shrink-0"
              title="Refresh Rates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{language === 'hi' ? 'ताज़ा करें' : 'Refresh'}</span>
            </button>
          </div>

          {/* Rates Table Grid */}
          {loading ? (
            <div className="py-8 text-center text-sky-200 text-sm animate-pulse">
              {language === 'hi' ? 'नवीनतम मंडी भाव लोड हो रहे हैं...' : 'Fetching live Mandi prices...'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {filteredRates.map((rate, idx) => (
                <div
                  key={idx}
                  className="bg-sky-950/70 border border-sky-700/60 rounded-xl p-3.5 hover:border-amber-400/80 transition shadow-inner"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-sky-100">{rate.commodity}</span>
                    {rate.trend === 'up' && (
                      <span className="flex items-center text-[10px] bg-emerald-950 text-emerald-400 font-black px-1.5 py-0.5 rounded border border-emerald-700">
                        <TrendingUp className="w-3 h-3 mr-0.5" /> +तेजी
                      </span>
                    )}
                    {rate.trend === 'down' && (
                      <span className="flex items-center text-[10px] bg-rose-950 text-rose-400 font-black px-1.5 py-0.5 rounded border border-rose-700">
                        <TrendingDown className="w-3 h-3 mr-0.5" /> -मंदी
                      </span>
                    )}
                    {rate.trend === 'stable' && (
                      <span className="flex items-center text-[10px] bg-sky-900 text-sky-300 font-black px-1.5 py-0.5 rounded border border-sky-700">
                        <Minus className="w-3 h-3 mr-0.5" /> सामान
                      </span>
                    )}
                  </div>

                  <div className="text-lg font-black text-amber-300 mt-2 tracking-tight">
                    {rate.pricePerQuintal}
                  </div>
                  <div className="text-[11px] text-sky-300/80 font-medium mt-1 flex items-center justify-between">
                    <span>📍 {rate.mandi}</span>
                    <span className="text-[10px] text-sky-400">प्रति क्विंटल</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Live Mandi Community Forum & Chat */
        <div className="mt-4 space-y-4">
          <div className="bg-sky-950/80 border border-sky-700/60 rounded-xl p-3.5">
            <h3 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              {language === 'hi' ? 'अपनी मंडी का भाव अपडेट करें:' : 'Share your local Mandi rate:'}
            </h3>
            <form onSubmit={handlePostSubmit} className="space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'आपका नाम (उदा. रामसिंह)' : 'Your Name'}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="bg-sky-900/80 text-xs text-white placeholder-sky-400 px-3 py-1.5 rounded-lg border border-sky-700 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'मंडी का नाम (उदा. बांदा मंडी)' : 'Mandi Location'}
                  value={senderLoc}
                  onChange={(e) => setSenderLoc(e.target.value)}
                  className="bg-sky-900/80 text-xs text-white placeholder-sky-400 px-3 py-1.5 rounded-lg border border-sky-700 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={language === 'hi' ? 'मंडी रेट या फसल/भूसा भाव जानकारी साझा करें...' : 'Post daily crop or fodder rate update...'}
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1 bg-sky-900/80 text-xs text-white placeholder-sky-400 px-3 py-2 rounded-lg border border-sky-700 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-sky-950 font-black px-4 py-2 rounded-lg text-xs transition cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'भेजें' : 'Post'}</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            {posts.map((p) => (
              <div key={p.id} className="bg-sky-950/60 border border-sky-800/80 rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between text-sky-300 mb-1">
                  <span className="font-bold text-amber-200">
                    {p.user} <span className="text-[10px] text-sky-400 font-normal">({p.location})</span>
                  </span>
                  <span className="text-[10px] text-sky-400">{p.time}</span>
                </div>
                <p className="text-sky-100 font-medium leading-snug">{p.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
