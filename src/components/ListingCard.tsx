import React from 'react';
import { Listing } from '../types';
import { MapPin, CheckCircle, Eye, PhoneCall, Sparkles } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
  onQuickCall: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  onSelect,
  onQuickCall,
}) => {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(listing.price);

  return (
    <div
      onClick={() => onSelect(listing)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <img
            src={listing.images[0] || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {listing.featured && (
              <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                <span>प्रीमियम</span>
              </span>
            )}
            {listing.verifiedSeller && (
              <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md flex items-center space-x-0.5">
                <CheckCircle className="w-3 h-3" />
                <span>सत्यापित</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-md flex items-center space-x-1">
            <Eye className="w-3 h-3" />
            <span>{listing.viewsCount}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3.5">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-lg font-black text-emerald-700">
              {formattedPrice}
            </span>
            {listing.priceType === 'negotiable' && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                मोल-भाव संभव
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug mb-2">
            {listing.titleHi || listing.title}
          </h3>

          {/* Key Specs Preview */}
          {listing.specifications && Object.keys(listing.specifications).length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {Object.entries(listing.specifications).slice(0, 2).map(([key, value]) => (
                <span key={key} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                  {key}: {value}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Details & Call Button */}
      <div className="px-3.5 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center text-xs text-slate-500 truncate max-w-[65%]">
          <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
          <span className="truncate">{listing.location}, {listing.state}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickCall(listing);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center space-x-1 text-xs font-bold"
          title="कॉल करें"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">कॉल</span>
        </button>
      </div>
    </div>
  );
};
