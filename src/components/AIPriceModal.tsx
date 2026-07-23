import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Sparkles, Tractor, CheckCircle2, AlertCircle } from 'lucide-react';

interface AIPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPriceModal: React.FC<AIPriceModalProps> = ({ isOpen, onClose }) => {
  const { language } = useApp();

  const [itemType, setItemType] = useState('livestock');
  const [details, setDetails] = useState('');
  const [condition, setCondition] = useState('Good');
  const [location, setLocation] = useState('Uttar Pradesh');

  const [loading, setLoading] = useState(false);
  const [valuation, setValuation] = useState<{
    estimatedPriceRange: string;
    confidenceScore: number;
    recommendedAskingPrice: string;
    marketDemand: string;
    aiAdvice: string;
    keyFactors: string[];
  } | null>(null);

  if (!isOpen) return null;

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) {
      alert(language === 'hi' ? 'कृपया सामान या पशुधन का विवरण दर्ज करें' : 'Please provide details');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai-valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType,
          details,
          condition,
          location,
          language
        })
      });

      const data = await res.json();
      if (data.success && data.valuation) {
        setValuation(data.valuation);
      }
    } catch (err) {
      console.error('Valuation Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="bg-gradient-to-r from-sky-900 via-sky-850 to-indigo-950 text-white p-5 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-sky-950 font-black text-xs flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-sky-950" />
            </div>
            <div>
              <h2 className="font-extrabold text-base">
                {language === 'hi' ? 'AI उचित मूल्य व मंडी रेट कैलकुलेटर' : 'AI Market Price Estimator'}
              </h2>
              <p className="text-[11px] text-sky-200">
                {language === 'hi' ? 'पशुधन, फसल, चारा, गाड़ी या सामान का सटीक दाम जानें' : 'Get instant fair market value powered by AI'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-sky-200 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {!valuation ? (
            <form onSubmit={handleCalculate} className="space-y-4">
              <div>
                <label className="block font-bold text-sky-950 mb-1">
                  {language === 'hi' ? 'सामान का प्रकार' : 'Item Category'}
                </label>
                <select
                  value={itemType}
                  onChange={(e) => setItemType(e.target.value)}
                  className="w-full bg-sky-50 border border-sky-300 rounded-xl px-3 py-2 font-bold text-sky-950"
                >
                  <option value="livestock">🐄 पशुधन (गाय / भैंस / बकरी / बैल)</option>
                  <option value="fodder">🍂 भूसा व पशु चारा (Wheat Straw / Green Fodder)</option>
                  <option value="grains">🌾 अनाज व फसल (गेहूं / धान / सरसों)</option>
                  <option value="tractor">🚜 ट्रैक्टर व कृषि उपकरण</option>
                  <option value="vehicle">🚗 पुरानी गाड़ी (कार / बाइक / ई-रिक्शा)</option>
                  <option value="mobile">📱 मोबाइल व इलेक्ट्रॉनिक्स</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-sky-950 mb-1">
                  {language === 'hi' ? 'विवरण (Details: जैसे दूध लीटर/मात्रा/मॉडल)' : 'Item Details'}
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder={
                    language === 'hi'
                      ? 'उदा. मुर्रा भैंस 14 लीटर दूध रोज, दूसरा ब्यांत, शांत स्वभाव या 50 क्विंटल गेहूं का सूखा भूसा'
                      : 'e.g. Murrah Buffalo 14L daily milk or 50 quintals dry wheat straw'
                  }
                  className="w-full bg-white border border-slate-300 rounded-xl p-3 font-medium text-slate-900 focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-sky-950 mb-1">
                    {language === 'hi' ? 'स्थिति' : 'Condition'}
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full bg-sky-50 border border-sky-300 rounded-xl px-3 py-2 font-bold text-sky-950"
                  >
                    <option value="Excellent">उत्तम (Super Top)</option>
                    <option value="Good">अच्छा (Good)</option>
                    <option value="Average">सामान्य (Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-sky-950 mb-1">
                    {language === 'hi' ? 'राज्य / मंडी' : 'State / Region'}
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-sky-50 border border-sky-300 rounded-xl px-3 py-2 font-bold text-sky-950"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-sky-950 font-black py-3 rounded-2xl shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-sky-950 animate-bounce" />
                <span>{loading ? 'AI गणना कर रहा है...' : 'AI से सही कीमत का अनुमान लगाएं'}</span>
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-sky-900 to-indigo-950 text-white rounded-2xl p-4 text-center border border-sky-700">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">AI अनुशंसित मंडी/बाजार दर</div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                  {valuation.estimatedPriceRange}
                </div>
                <div className="mt-2 text-xs text-sky-200">
                  मांग स्तर: <span className="text-emerald-400 font-bold">{valuation.marketDemand}</span> • विश्वसनीयता: {valuation.confidenceScore}%
                </div>
              </div>

              <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-sky-950 text-xs sm:text-sm flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI विक्रेता सलाह:
                </div>
                <p className="text-xs text-sky-900 leading-relaxed font-medium">
                  {valuation.aiAdvice}
                </p>
              </div>

              <div>
                <div className="font-bold text-slate-700 text-xs mb-1">मुख्य कारक (Key Valuation Factors):</div>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5 font-medium">
                  {valuation.keyFactors?.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setValuation(null)}
                className="w-full bg-sky-800 text-white font-bold py-2.5 rounded-xl hover:bg-sky-900 transition text-xs"
              >
                🔄 दूसरी वस्तु का दाम जांचें
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
