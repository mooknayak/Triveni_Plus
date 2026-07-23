import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, STATES_DISTRICTS } from '../data/categories';
import { X, Sparkles, Upload, Tractor, CheckCircle2, AlertCircle } from 'lucide-react';

interface SellItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SellItemModal: React.FC<SellItemModalProps> = ({ isOpen, onClose }) => {
  const { language, addListing, user } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<'New' | 'Used'>('Used');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState(user.location || 'Lucknow');
  const [state, setState] = useState('Uttar Pradesh');
  const [phone, setPhone] = useState(user.phone || '');
  const [isFarmer, setIsFarmer] = useState(user.verifiedFarmer || false);

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800'
  ]);

  if (!isOpen) return null;

  const handleCategoryChange = (catId: string) => {
    setCategory(catId);
    const found = CATEGORIES.find(c => c.id === catId);
    if (found && found.subcategories.length > 0) {
      setSubcategory(found.subcategories[0].id);
    } else {
      setSubcategory('');
    }
  };

  const handleAIGenerate = async () => {
    if (!title.trim()) {
      alert(language === 'hi' ? 'कृपया पहले सामान या फसल का नाम लिखें' : 'Please enter title first');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const selectedCatObj = CATEGORIES.find(c => c.id === category);
      const res = await fetch('/api/ai-describe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category: selectedCatObj?.name || 'General',
          condition,
          details: 'Farmer & Marketplace Direct Listing',
          language
        })
      });

      const data = await res.json();
      if (data.success && data.description) {
        setDescription(data.description);
      }
    } catch (err) {
      console.error('AI Error:', err);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleAddImage = () => {
    if (images.length >= 10) {
      alert(language === 'hi' ? 'अधिकतम 10 फोटो ही अपलोड किए जा सकते हैं' : 'Maximum 10 photos allowed per listing');
      return;
    }
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !price) {
      alert(language === 'hi' ? 'कृपया सभी ज़रूरी जानकारी भरें' : 'Please fill all required fields');
      return;
    }

    const selectedCatObj = CATEGORIES.find(c => c.id === category);
    const selectedSubObj = selectedCatObj?.subcategories.find(s => s.id === subcategory);

    addListing({
      title,
      titleHi: title,
      price: Number(price),
      negotiable: true,
      condition,
      isNewItem: condition === 'New',
      category,
      categoryHi: selectedCatObj?.nameHi || 'सामान्य',
      subcategory,
      subcategoryHi: selectedSubObj?.nameHi || 'सामान्य',
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800'],
      videoUrl: videoUrl.trim() || undefined,
      location: {
        city,
        state,
        district: city
      },
      seller: {
        id: user.id || 'sel-user-1',
        name: user.name || 'रामसिंह किसान',
        phone: phone || '+91 98765 43210',
        whatsapp: phone ? phone.replace(/\D/g, '') : '919876543210',
        verified: true,
        verifiedFarmer: isFarmer,
        userType: isFarmer ? 'Farmer' : 'Seller',
        memberSince: '2026',
        rating: 5.0,
        totalListings: 1,
        location: `${city}, ${state}`
      },
      specifications: [
        { label: 'Condition', labelHi: 'स्थिति', value: condition },
        { label: 'Location', labelHi: 'स्थान', value: city }
      ],
      description: description || title,
      descriptionHi: description || title
    });

    alert(language === 'hi' ? '🎉 आपकी लिस्टिंग सफ़लतापूर्वक पोस्ट हो गई!' : '🎉 Listing posted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-sky-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="bg-sky-900 text-white px-5 py-4 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-sky-950 font-black text-sm flex items-center justify-center">
              +
            </div>
            <div>
              <h2 className="font-extrabold text-base sm:text-lg">
                {language === 'hi' ? 'त्रिवेणी प्लस पर नया विज्ञापन पोस्ट करें' : 'Post New Ad on Triveni Plus'}
              </h2>
              <p className="text-xs text-sky-200">
                {language === 'hi' ? 'पशुधन, चारा, अनाज, गाड़ियां व नया/पुराना सामान तुरंत बेचें' : 'Sell Cattle, Fodder, Grains, Vehicles & Goods'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-sky-200 hover:text-white hover:bg-sky-800 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold text-sky-950 mb-1">
              {language === 'hi' ? 'श्रेणी चुनें (Category) *' : 'Select Category *'}
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-sky-50 border border-sky-300 rounded-xl px-3 py-2.5 font-bold text-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">{language === 'hi' ? '-- श्रेणी चुनें --' : '-- Choose Category --'}</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'hi' ? c.nameHi : c.name}
                </option>
              ))}
            </select>
          </div>

          {category && (
            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'उप-श्रेणी (Subcategory) *' : 'Subcategory *'}
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full bg-sky-50 border border-sky-300 rounded-xl px-3 py-2.5 font-bold text-sky-950 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              >
                {CATEGORIES.find(c => c.id === category)?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {language === 'hi' ? sub.nameHi : sub.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block font-bold text-sky-950 mb-1">
              {language === 'hi' ? 'विज्ञापन का शीर्षक (Item Title) *' : 'Item Title *'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'उदा. गेहूं का सूखा भूसा (100 क्विंटल) या साहीवाल गाय 14 लीटर दूध'
                  : 'e.g. Sahiwal Cow 14L Milk or Dry Wheat Straw Fodder'
              }
              className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-medium text-slate-900 focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'कीमत / रेट (Price in ₹) *' : 'Price (in ₹) *'}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="₹ 950"
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-sky-950 focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'सामान की स्थिति (Condition)' : 'Condition'}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCondition('Used')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    condition === 'Used' ? 'bg-amber-400 text-sky-950 border-amber-500' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {language === 'hi' ? 'पुराना (Used)' : 'Used Item'}
                </button>
                <button
                  type="button"
                  onClick={() => setCondition('New')}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    condition === 'New' ? 'bg-sky-600 text-white border-sky-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {language === 'hi' ? 'नया (New)' : 'New Item'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tractor className="w-5 h-5 text-emerald-600" />
              <div>
                <div className="font-bold text-emerald-950 text-xs">
                  {language === 'hi' ? 'क्या आप किसान हैं? (Farmer Badge)' : 'Are you a verified farmer?'}
                </div>
                <div className="text-[10px] text-emerald-700">
                  {language === 'hi' ? 'प्रोफ़ाइल पर हरा किसान बैज दिखेगा' : 'Displays Verified Farmer badge'}
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFarmer}
              onChange={(e) => setIsFarmer(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block font-bold text-sky-950">
                {language === 'hi' ? 'विज्ञापन विवरण (Description)' : 'Description'}
              </label>
              <button
                type="button"
                onClick={handleAIGenerate}
                disabled={isGeneratingAI}
                className="bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-pulse" />
                <span>{isGeneratingAI ? 'AI लिख रहा है...' : 'AI से विवरण लिखवाएं'}</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={language === 'hi' ? 'सामान, पशुधन या फसल की खासियत लिखें...' : 'Describe item details, quality, quantity...'}
              className="w-full bg-white border border-slate-300 rounded-xl p-3 font-normal text-slate-900 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3 space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-sky-950">
                  {language === 'hi' ? 'सामान/पशु की फोटो अपलोड करें (10 फोटो तक)' : 'Upload Photos (Up to 10 photos)'}
                </label>
                <span className="text-[10px] font-bold text-sky-700">{images.length}/10 {language === 'hi' ? 'फोटो जोड़े गए' : 'photos added'}</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="bg-sky-800 hover:bg-sky-900 text-white px-3 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  + {language === 'hi' ? 'फोटो जोड़ें' : 'Add'}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, i) => (
                  <div key={i} className="w-14 h-14 rounded-xl overflow-hidden border-2 border-sky-400 relative group shadow-sm">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="absolute top-0 right-0 bg-red-600 text-white w-4 h-4 rounded-bl flex items-center justify-center text-[10px] font-black"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'वीडियो लिंक (YouTube/Direct Video URL)' : 'Video Demo Link (YouTube/Direct URL)'}
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'शहर / मंडी (City)' : 'City'}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-sky-950 mb-1">
                {language === 'hi' ? 'फ़ोन नंबर (Phone)' : 'Phone Number'}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-sky-950 font-black py-3 rounded-2xl shadow-md text-sm transition cursor-pointer mt-4"
          >
            🚀 {language === 'hi' ? 'विज्ञापन तुरंत लाइव करें' : 'Post Listing Now'}
          </button>
        </form>
      </div>
    </div>
  );
};
