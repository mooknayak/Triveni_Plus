import React, { useState, useMemo } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { CategoryNav } from './components/CategoryNav';
import { MandiBhavWidget } from './components/MandiBhavWidget';
import { ListingCard } from './components/ListingCard';
import { ListingDetailModal } from './components/ListingDetailModal';
import { SellItemModal } from './components/SellItemModal';
import { AuthModal } from './components/AuthModal';
import { AIPriceModal } from './components/AIPriceModal';
import { ChatModal } from './components/ChatModal';
import { CATEGORIES } from './data/categories';
import { Listing } from './types';
import { Sparkles, Tractor, ShieldCheck, Phone, Filter, ArrowUpDown, Tag, Heart, MessageCircle } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    language,
    listings,
    filterState,
    setFilterState,
    selectedCity,
    isSellModalOpen,
    setIsSellModalOpen,
    isAuthModalOpen,
    setIsAuthModalOpen,
    isAIValuationOpen,
    setIsAIValuationOpen,
    isChatModalOpen,
    setIsChatModalOpen
  } = useApp();

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [sortOption, setSortOption] = useState<'latest' | 'priceLow' | 'priceHigh'>('latest');

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (filterState.category && item.category !== filterState.category) {
        return false;
      }
      if (filterState.subcategory && item.subcategory !== filterState.subcategory) {
        return false;
      }
      if (filterState.condition === 'new' && !item.isNewItem) return false;
      if (filterState.condition === 'used' && item.isNewItem) return false;

      if (selectedCity && selectedCity !== 'All India') {
        if (
          !item.location.city.toLowerCase().includes(selectedCity.toLowerCase()) &&
          !item.location.state.toLowerCase().includes(selectedCity.toLowerCase())
        ) {
          return false;
        }
      }

      if (filterState.search.trim()) {
        const query = filterState.search.toLowerCase();
        const matchTitle = (item.titleHi || item.title).toLowerCase().includes(query);
        const matchDesc = (item.descriptionHi || item.description).toLowerCase().includes(query);
        const matchCat = (item.categoryHi || item.category).toLowerCase().includes(query);
        const matchLoc = item.location.city.toLowerCase().includes(query);
        return matchTitle || matchDesc || matchCat || matchLoc;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'priceLow') return a.price - b.price;
      if (sortOption === 'priceHigh') return b.price - a.price;
      return 0;
    });
  }, [listings, filterState, selectedCity, sortOption]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === filterState.category);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-sky-500 selection:text-white">
      <Navbar />
      <CategoryNav />

      <main className="max-w-7xl mx-auto px-4 py-4 flex-1 w-full space-y-6">
        <MandiBhavWidget />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-sky-200 shadow-2xs">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-sky-950 flex items-center gap-2">
              <span>
                {filterState.category
                  ? (language === 'hi' ? activeCategoryObj?.nameHi : activeCategoryObj?.name)
                  : (language === 'hi' ? 'सभी ताज़ा विज्ञापन व उत्पाद' : 'All Recent Listings')}
              </span>
              <span className="text-xs bg-sky-100 text-sky-800 font-bold px-2.5 py-0.5 rounded-full border border-sky-300">
                {filteredListings.length} {language === 'hi' ? 'उपलब्ध' : 'Items'}
              </span>
            </h2>
            <p className="text-xs text-sky-700 font-medium mt-0.5">
              {selectedCity === 'All India' ? '🇮🇳 पूरे भारत से सीधे किसानों व विक्रेताओं के विज्ञापन' : `📍 ${selectedCity} एवं आसपास के क्षेत्र`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center bg-sky-50 p-1 rounded-xl border border-sky-200">
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, condition: 'all' }))}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  filterState.condition === 'all' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-900 hover:text-sky-600'
                }`}
              >
                {language === 'hi' ? 'सब' : 'All'}
              </button>
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, condition: 'used' }))}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  filterState.condition === 'used' ? 'bg-amber-500 text-gray-950 shadow-xs' : 'text-sky-900 hover:text-sky-600'
                }`}
              >
                {language === 'hi' ? 'पुराना सामान' : 'Used'}
              </button>
              <button
                onClick={() => setFilterState((prev) => ({ ...prev, condition: 'new' }))}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                  filterState.condition === 'new' ? 'bg-sky-600 text-white shadow-xs' : 'text-sky-900 hover:text-sky-600'
                }`}
              >
                {language === 'hi' ? 'नया सामान' : 'New'}
              </button>
            </div>

            <div className="flex items-center gap-1 bg-sky-50 border border-sky-200 rounded-xl px-2.5 py-1 text-xs font-bold text-sky-900">
              <ArrowUpDown className="w-3.5 h-3.5 text-sky-600" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent border-none text-xs font-bold focus:outline-none cursor-pointer"
              >
                <option value="latest">{language === 'hi' ? 'नवीनतम (Latest)' : 'Latest'}</option>
                <option value="priceLow">{language === 'hi' ? 'कम से ज्यादा दाम' : 'Price: Low to High'}</option>
                <option value="priceHigh">{language === 'hi' ? 'ज्यादा से कम दाम' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>
        </div>

        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onSelect={(item) => setSelectedListing(item)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-sky-200 p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto text-2xl font-black">
              🔍
            </div>
            <h3 className="text-lg font-bold text-sky-950">
              {language === 'hi' ? 'कोई विज्ञापन नहीं मिला' : 'No listings found'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {language === 'hi'
                ? 'आपकी खोज के अनुसार कोई सामान या फसल उपलब्ध नहीं है। कृपया फ़िल्टर बदलें या नया विज्ञापन जोड़ें।'
                : 'Try adjusting your search criteria or post a new ad.'}
            </p>
            <button
              onClick={() => {
                setFilterState({ category: '', subcategory: '', search: '', condition: 'all' });
              }}
              className="bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-sky-700 transition"
            >
              {language === 'hi' ? 'सभी फ़िल्टर हटाएं' : 'Clear All Filters'}
            </button>
          </div>
        )}
      </main>

      <footer className="bg-sky-950 text-sky-200 border-t border-sky-800 mt-12 pt-10 pb-6 text-xs">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 font-black text-white flex items-center justify-center text-base">
                T+
              </div>
              <span className="font-black text-xl text-white tracking-tight">Triveni Plus</span>
            </div>
            <p className="text-sky-300/80 leading-relaxed font-medium">
              {language === 'hi'
                ? 'त्रिवेणी प्लस - भारत का अपना भरोसेमंद नया व पुराना बाज़ार। पशुधन, भूसा, अनाज, गाड़ियां व घरेलू सामान सीधे खरीदें और बेचें।'
                : 'India\'s leading marketplace for new & used goods, cattle, fodder, crops, and vehicles.'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              🌾 {language === 'hi' ? 'किसान व कृषि मंडी' : 'Farmer Mandi'}
            </h4>
            <ul className="space-y-2 text-sky-300/80 font-medium">
              <li>• पशुधन (गाय / भैंस / बकरी)</li>
              <li>• पशु चारा व सूखा भूसा (Bhusa / Fodder)</li>
              <li>• अनाज व दलहन (गेहूं / धान / सरसों)</li>
              <li>• ट्रैक्टर व कृषि यंत्र</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">
              🚗 {language === 'hi' ? 'गाड़ियां व घरेलू सामान' : 'Vehicles & Home'}
            </h4>
            <ul className="space-y-2 text-sky-300/80 font-medium">
              <li>• पुरानी व नई गाड़ियां (कार/बाइक)</li>
              <li>• मोबाइल व लैपटॉप</li>
              <li>• टीवी, फ्रिज व इलेक्ट्रॉनिक</li>
              <li>• मकान व जमीन (Property)</li>
            </ul>
          </div>

          <div className="bg-sky-900/80 border border-sky-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>AI रेट कैलकुलेटर</span>
            </div>
            <p className="text-sky-200 text-xs leading-normal">
              {language === 'hi'
                ? 'अपने पशुधन, फसल या गाड़ी का सटीक मंडी भाव AI से तुरंत प्राप्त करें।'
                : 'Get instantaneous market price estimation for livestock, crops, and vehicles.'}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-4 border-t border-sky-900 text-center text-sky-400 text-[11px] font-medium">
          © 2026 Triveni Plus Marketplace. सर्वाधिकार सुरक्षित। (Made for India's Farmers & Citizens)
        </div>
      </footer>

      <ListingDetailModal
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
      />

      <SellItemModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <AIPriceModal
        isOpen={isAIValuationOpen}
        onClose={() => setIsAIValuationOpen(false)}
      />

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
