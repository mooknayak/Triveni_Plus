import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, STATES_DISTRICTS } from '../data/categories';
import { ListingCondition, Listing } from '../types';
import { 
  X, 
  Upload, 
  Sparkles, 
  Tractor, 
  Phone, 
  Check, 
  AlertCircle, 
  Camera, 
  FileText, 
  Plus, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export const SellModal: React.FC = () => {
  const { language, isSellModalOpen, setIsSellModalOpen, addListing, user, addToast } = useApp();

  const [itemType, setItemType] = useState<'new' | 'used'>('used');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [subcategory, setSubcategory] = useState(CATEGORIES[0].subcategories[0].id);
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [negotiable, setNegotiable] = useState(true);
  const [condition, setCondition] = useState<ListingCondition>('Used');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState(user.location || 'Lucknow');
  const [state, setState] = useState('Uttar Pradesh');
  const [phone, setPhone] = useState(user.phone || '');
  const [isFarmerListing, setIsFarmerListing] = useState(user.userType === 'Farmer');

  // Animal / Cattle fields
  const [breed, setBreed] = useState('');
  const [milkCapacity, setMilkCapacity] = useState('');
  const [animalType, setAnimalType] = useState<'Cow' | 'Buffalo' | 'Goat' | 'Tractor' | 'Bull' | 'Poultry'>('Cow');

  // Crop / Fodder fields
  const [cropQuantity, setCropQuantity] = useState('');
  const [cropUnit, setCropUnit] = useState<'Quintal' | 'Kg' | 'Ton' | 'Acre'>('Quintal');

  // Images state
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800'
  ]);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  if (!isSellModalOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          newImages.push(uploadEvent.target.result as string);
          if (newImages.length === files.length) {
            setImages((prev) => [...prev, ...newImages]);
            addToast(language === 'hi' ? 'फ़ोटो सफलतापूर्वक अपलोड हुई!' : 'Images uploaded!', 'success');
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleGenerateAIDescription = async () => {
    if (!title.trim()) {
      addToast(language === 'hi' ? 'कृपया पहले सामान/फसल का नाम लिखें' : 'Please enter item title first', 'error');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/ai-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          condition: itemType === 'new' ? 'New' : condition,
          details: `Quantity/Milk: ${milkCapacity || cropQuantity}, Breed: ${breed}, City: ${city}`,
          language
        })
      });

      const json = await res.json();
      if (json.success && json.data) {
        if (json.data.optimizedTitle) {
          setTitle(json.data.optimizedTitle);
        }
        if (json.data.description) {
          setDescription(json.data.description);
        }
        addToast(language === 'hi' ? 'AI ने शीर्षक व विवरण तैयार कर दिया!' : 'AI generated description!', 'success');
      } else {
        throw new Error('AI response failed');
      }
    } catch (err) {
      console.error('Error generating AI description:', err);
      setDescription(
        language === 'hi'
          ? `${title} बिक्री के लिए उपलब्ध है। एकदम बढ़िया स्थिति में। ${city} क्षेत्र में संपर्क करें।`
          : `${title} available for sale in excellent condition near ${city}. Contact for best price.`
      );
      addToast(language === 'hi' ? 'विवरण ऑटो-तैयार हो गया है' : 'Auto description added', 'info');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price || parseFloat(price) <= 0) {
      addToast(language === 'hi' ? 'कृपया नाम और सही कीमत भरें' : 'Please enter title and valid price', 'error');
      return;
    }

    const newListingObj: Listing = {
      id: 'usr-' + Date.now(),
      title,
      titleHi: title,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      negotiable,
      condition: itemType === 'new' ? 'New' : condition,
      isNewItem: itemType === 'new',
      category,
      categoryHi: CATEGORIES.find(c => c.id === category)?.nameHi || category,
      subcategory,
      subcategoryHi: subcategory,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800'],
      location: {
        city,
        district: city,
        state,
        pincode: '226001'
      },
      seller: {
        id: user.id,
        name: user.name,
        phone: phone || user.phone,
        whatsapp: phone || user.phone,
        verified: true,
        verifiedFarmer: isFarmerListing,
        userType: isFarmerListing ? 'Farmer' : 'Individual',
        memberSince: '2026',
        rating: 5.0,
        totalListings: 1,
        location: city
      },
      specifications: [
        { label: 'Condition', labelHi: 'स्थिति', value: itemType === 'new' ? 'Brand New (नया)' : condition },
        { label: 'Location', labelHi: 'स्थान', value: `${city}, ${state}` },
        ...(breed ? [{ label: 'Breed', labelHi: 'नस्ल', value: breed }] : []),
        ...(cropQuantity ? [{ label: 'Quantity', labelHi: 'मात्रा', value: `${cropQuantity} ${cropUnit}` }] : [])
      ],
      livestockDetails: breed || milkCapacity ? {
        breed: breed || 'Desi',
        milkCapacityLitersPerDay: milkCapacity ? parseFloat(milkCapacity) : 10,
        ageMonths: 36,
        lactationCycle: 2,
        isVaccinated: true,
        animalType
      } : undefined,
      cropDetails: cropQuantity ? {
        quantity: parseFloat(cropQuantity),
        unit: cropUnit,
        harvestDate: 'Fresh',
        isOrganic: true,
        bulkRateAvailable: true
      } : undefined,
      description: description || title,
      descriptionHi: description || title,
      isFeatured: true,
      viewsCount: 1,
      postedAt: 'Just now'
    };

    addListing(newListingObj);
    setIsSellModalOpen(false);
    addToast(language === 'hi' ? 'आपकी लिस्टिंग Triveni Plus पर लाइव पोस्ट हो गई!' : 'Your listing is live on Triveni Plus!', 'success');
  };

  const selectedCatObj = CATEGORIES.find(c => c.id === category);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-sky-300 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        <div className="bg-sky-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-sky-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-sky-950 font-black flex items-center justify-center text-sm">
              +
            </div>
            <div>
              <h3 className="font-black text-base text-white leading-none">
                {language === 'hi' ? 'त्रिवेणी प्लस - नया या पुराना सामान बेचें' : 'Triveni Plus - Sell New or Used Item'}
              </h3>
              <p className="text-[10px] text-sky-200 mt-0.5">
                {language === 'hi' ? 'फोन से फ़ोटो अपलोड करें व मुफ़्त लिस्टिंग बनाएं' : 'Upload photos from phone & create free post'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSellModalOpen(false)}
            className="w-8 h-8 rounded-full bg-sky-800 hover:bg-sky-700 flex items-center justify-center text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="bg-sky-50 p-1.5 rounded-2xl border border-sky-200 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setItemType('used');
                setCondition('Used');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                itemType === 'used'
                  ? 'bg-amber-400 text-sky-950 shadow-sm'
                  : 'text-sky-900 hover:bg-sky-100'
              }`}
            >
              🔄 {language === 'hi' ? 'पुराना सामान (Second-Hand / Used)' : 'Used / Second-Hand'}
            </button>
            <button
              type="button"
              onClick={() => {
                setItemType('new');
                setCondition('New');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-black transition cursor-pointer flex items-center justify-center gap-1.5 ${
                itemType === 'new'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-sky-900 hover:bg-sky-100'
              }`}
            >
              ✨ {language === 'hi' ? 'नया सामान (Brand New Item)' : 'Brand New Item'}
            </button>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tractor className="w-5 h-5 text-emerald-700" />
              <div>
                <span className="text-xs font-bold text-emerald-950 block">
                  {language === 'hi' ? 'क्या यह किसान/कृषि संबंधित उत्पाद है?' : 'Is this Farmer / Agricultural item?'}
                </span>
                <span className="text-[10px] text-emerald-700">
                  {language === 'hi' ? 'पशुधन, चारा, भूसा, गेहूं, थ्रेशर या ट्रैक्टर लिस्टिंग' : 'Cattle, Fodder, Grains, Machinery'}
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isFarmerListing}
              onChange={(e) => setIsFarmerListing(e.target.checked)}
              className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-sky-900 mb-1">
              {language === 'hi' ? 'सामान या फसल/पशु का नाम (Title) *' : 'Item / Produce Name *'}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder={
                  language === 'hi'
                    ? 'उदा. साहीवाल गाय, गेहूं का सूखा भूसा 50 क्विंटल, टाटा पंच ईवी...'
                    : 'e.g. Pure Sahiwal Cow, Wheat Straw Bhusa 50 Quintals, iPhone 15...'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1 bg-white border border-sky-300 text-xs sm:text-sm font-semibold text-gray-900 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-600"
              />
              <button
                type="button"
                onClick={handleGenerateAIDescription}
                disabled={isGeneratingAI}
                className="bg-sky-800 hover:bg-sky-900 text-amber-300 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer border border-sky-600 shrink-0"
              >
                <Sparkles className={`w-4 h-4 text-amber-300 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{language === 'hi' ? 'AI जादू विवरण' : 'AI Generate'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'मुख्य श्रेणी (Category)' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const catObj = CATEGORIES.find(c => c.id === e.target.value);
                  if (catObj && catObj.subcategories[0]) {
                    setSubcategory(catObj.subcategories[0].id);
                  }
                }}
                className="w-full bg-white border border-sky-300 text-xs font-bold text-gray-900 rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-600"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {language === 'hi' ? c.nameHi : c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'उप-श्रेणी (Subcategory)' : 'Subcategory'}
              </label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full bg-white border border-sky-300 text-xs font-bold text-gray-900 rounded-xl px-3 py-2.5 focus:outline-none focus:border-sky-600"
              >
                {selectedCatObj?.subcategories.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {language === 'hi' ? sub.nameHi : sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(subcategory === 'pashu' || category === 'farmer_kisan') && (
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3.5 space-y-3">
              <h4 className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-1">
                <Tractor className="w-4 h-4 text-sky-600" />
                {language === 'hi' ? 'पशुधन या फसल विवरण (Special Details)' : 'Special Details'}
              </h4>

              <div className="grid grid-cols-2 gap-3">
                {subcategory === 'pashu' ? (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-sky-800 mb-0.5">नस्ल (Breed)</label>
                      <input
                        type="text"
                        placeholder="उदा. साहीवाल / मुर्रा / गिर"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="w-full bg-white border border-sky-200 text-xs p-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-sky-800 mb-0.5">दूध क्षमता (Liters/Day)</label>
                      <input
                        type="number"
                        placeholder="उदा. 16"
                        value={milkCapacity}
                        onChange={(e) => setMilkCapacity(e.target.value)}
                        className="w-full bg-white border border-sky-200 text-xs p-2 rounded-lg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-[11px] font-bold text-sky-800 mb-0.5">उपलब्ध मात्रा (Quantity)</label>
                      <input
                        type="number"
                        placeholder="उदा. 100"
                        value={cropQuantity}
                        onChange={(e) => setCropQuantity(e.target.value)}
                        className="w-full bg-white border border-sky-200 text-xs p-2 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-sky-800 mb-0.5">इकाई (Unit)</label>
                      <select
                        value={cropUnit}
                        onChange={(e) => setCropUnit(e.target.value as any)}
                        className="w-full bg-white border border-sky-200 text-xs p-2 rounded-lg font-bold"
                      >
                        <option value="Quintal">क्विंटल (Quintal)</option>
                        <option value="Kg">किलोग्राम (Kg)</option>
                        <option value="Ton">टन (Ton)</option>
                        <option value="Acre">एकड़ (Acre)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'बिक्री की कीमत (₹) *' : 'Selling Price (₹) *'}
              </label>
              <input
                type="number"
                required
                placeholder="उदा. 65000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-white border border-sky-300 text-sm font-black text-sky-950 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'मूल कीमत/MRP (ऑप्शनल)' : 'Original MRP (Optional)'}
              </label>
              <input
                type="number"
                placeholder="उदा. 75000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-white border border-sky-300 text-sm font-semibold text-gray-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-sky-900 mb-1 flex items-center justify-between">
              <span>{language === 'hi' ? 'मोबाइल या कैमरा से फ़ोटो अपलोड करें' : 'Upload Photos from Phone / Camera'}</span>
              <span className="text-[10px] text-sky-600 font-semibold">फोन गैलरी सपोर्ट</span>
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <label className="w-20 h-20 rounded-2xl border-2 border-dashed border-sky-400 bg-sky-50 hover:bg-sky-100 flex flex-col items-center justify-center text-sky-700 cursor-pointer transition shrink-0">
                <Camera className="w-6 h-6 text-sky-600" />
                <span className="text-[10px] font-bold mt-1">+ फ़ोटो</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {images.map((img, idx) => (
                <div key={idx} className="w-20 h-20 rounded-2xl overflow-hidden border border-sky-300 relative shrink-0">
                  <img src={img} alt="upload" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute top-1 right-1 bg-rose-600 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-sky-900 mb-1">
              {language === 'hi' ? 'विस्तृत विवरण (Description)' : 'Detailed Description'}
            </label>
            <textarea
              rows={3}
              placeholder={language === 'hi' ? 'सामान/पशु/फसल की पूरी जानकारी, उम्र, स्थिति और क्यों खरीदें लिखे...' : 'Enter details about condition, usage, features...'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-sky-300 text-xs sm:text-sm text-gray-800 rounded-xl p-3 focus:outline-none focus:border-sky-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'शहर/ज़िला (Location)' : 'City/District'}
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-white border border-sky-300 text-xs font-bold text-gray-900 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-sky-900 mb-1">
                {language === 'hi' ? 'संपर्क फोन नंबर *' : 'Contact Phone Number *'}
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white border border-sky-300 text-xs font-bold text-gray-900 rounded-xl px-3 py-2"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg transition cursor-pointer text-sm tracking-tight flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5 text-amber-300" />
              <span>{language === 'hi' ? 'मुफ़्त लिस्टिंग पोस्ट करें (Post Free Listing)' : 'Post Free Listing Now'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
