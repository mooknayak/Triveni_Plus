import React from 'react';
import { Listing } from '../types';
import { MapPin, Calendar, CheckCircle2, ChevronRight, Eye } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onSelect: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(listing)}
      className="bg-white rounded-2xl border border-slate-200/80 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden cursor-pointer group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img 
          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-800 rounded-full shadow-sm border border-white/50">
            {listing.category}
          </span>
          {listing.isVerified && (
            <span className="px-2.5 py-1 bg-emerald-500/90 backdrop-blur-md text-xs font-medium text-white rounded-full shadow-sm flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Verified
            </span>
          )}
        </div>
        
        {listing.urgency && listing.urgency !== 'Low' && (
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full shadow-sm ${
              listing.urgency === 'High' 
                ? 'bg-rose-500 text-white' 
                : 'bg-amber-500 text-white'
            }`}>
              {listing.urgency} Priority
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <span className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-md text-white text-sm font-bold rounded-xl shadow-lg border border-white/10">
            ₹{listing.price.toLocaleString('en-IN')} {listing.unit ? `/${listing.unit}` : ''}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="font-semibold text-slate-800 text-base line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {listing.title}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-2 mt-1 font-normal">
            {listing.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1 font-medium text-slate-600 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{listing.location.city}, {listing.location.state}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span>{new Date(listing.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
