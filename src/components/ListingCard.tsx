  );
};
import React from 'react';
import { Listing } from '../types';
import { MapPin, Calendar, CheckCircle2, Phone, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { 
    setSelectedListing, 
    savedListings, 
    toggleSaveListing, 
    openChatModal, 
    openAIValuationModal 
  } = useApp();

  const isSaved = savedListings.includes(listing.id);

  const formatPrice = (price: number) => {
    if (price >= 100000) {
      return `₹ ${(price / 100000).toFixed(2)} लाख`;
    }
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      
      {/* Image & Badges */}
      <div 
        className="relative aspect-4/3 overflow-hidden bg-gray-100 cursor-pointer"
        onClick={() => setSelectedListing(listing)}
      >
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Saved/Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveListing(listing.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:text-red-500 shadow-sm transition-colors"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Verified Seller Badge */}
        {listing.seller.verified && (
          <div className="absolute top-3 left-3 bg-emerald-800/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center space-x-1 shadow-sm">
            <CheckCircle2 className="w-3 h-3 text-amber-400" />
            <span>सत्यापित (Verified)</span>
          </div>
        )}

        {/* Category Tag */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-0.5 rounded-full">
          {listing.subcategory.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price & Location */}
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-xl font-black text-emerald-900 tracking-tight">
              {formatPrice(listing.price)}
              {listing.priceUnit && listing.priceUnit !== 'total' && (
                <span className="text-xs font-normal text-gray-500 ml-1">/{listing.priceUnit}</span>
              )}
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 text-emerald-600 mr-0.5" />
              {listing.location.district}
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => setSelectedListing(listing)}
            className="font-bold text-gray-800 text-sm line-clamp-2 hover:text-emerald-800 cursor-pointer mb-2"
          >
            {listing.titleHi || listing.title}
          </h3>

          {/* Specs pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.specs.year && (
              <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">
                {listing.specs.year} मॉडल
              </span>
            )}
            {listing.specs.condition && (
              <span className="bg-amber-50 text-amber-800 text-[10px] px-2 py-0.5 rounded font-medium">
                {listing.specs.condition === 'new' ? 'नया' : listing.specs.condition === 'like-new' ? 'बहुत अच्छा' : 'इस्तेमाल किया हुआ'}
              </span>
            )}
            {listing.specs.breed && (
              <span className="bg-emerald-50 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-medium">
                नस्ल: {listing.specs.breed}
              </span>
            )}
            {listing.specs.quantity && (
              <span className="bg-blue-50 text-blue-800 text-[10px] px-2 py-0.5 rounded font-medium">
                मात्रा: {listing.specs.quantity} {listing.specs.quantityUnit}
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          {/* AI Valuation button */}
          <button
            onClick={() => openAIValuationModal(listing)}
            className="flex items-center space-x-1 text-[11px] text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1.5 rounded-lg border border-amber-200 transition-colors font-medium"
            title="AI सही मूल्य जांचें"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">AI भाव जांचें</span>
          </button>

          <div className="flex items-center space-x-1.5">
            {/* Chat button */}
            <button
              onClick={() => openChatModal(listing)}
              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg transition-colors border border-emerald-200"
              title="चैट करें"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Call button */}
            <a
              href={`tel:${listing.seller.phone}`}
              className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>कॉल करें</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
