import React, { useState } from 'react';
import { Listing } from '../types';
import { useApp } from '../context/AppContext';
import { X, MapPin, Phone, MessageCircle, Heart, Share2, ShieldCheck, Tractor, Calendar, Sparkles, CheckCircle2, User, ChevronLeft, ChevronRight } from 'lucide-react';

interface ListingDetailModalProps {
  listing: Listing | null;
  onClose: () => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose }) => {
  const { language, user, toggleWishlist, startChatWithSeller } = useApp();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);

  if (!listing) return null;

  const isWishlisted = user.wishlist.includes(listing.id);

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते! मैं आपकी Triveni Plus लिस्टिंग "${listing.titleHi || listing.title}" के बारे में बात करना चाहता हूँ।`
    );
    window.open(`https://wa.me/${listing.seller.whatsapp}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${listing.seller.phone}`, '_self');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing.title,
        text: listing.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(language === 'hi' ? 'लिंक कॉपी हो गया!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-sky-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        <div className="bg-sky-900 text-white px-4 py-3 flex items-center justify-between border-b border-sky-800">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-sky-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
              {listing.isNewItem ? (language === 'hi' ? 'नया सामान' : 'NEW') : (language === 'hi' ? 'पुराना सामान' : 'USED')}
            </span>
            <span className="text-xs text-sky-200 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {listing.categoryHi} • {listing.subcategoryHi}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-sky-200 hover:text-white hover:bg-sky-800 rounded-lg transition cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(listing.id)}
              className="p-1.5 text-sky-200 hover:text-white hover:bg-sky-800 rounded-lg transition cursor-pointer"
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-sky-200 hover:text-white hover:bg-sky-800 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-2xl bg-slate-100 overflow-hidden border border-sky-200 shadow-sm">
                <img
                  src={listing.images[selectedImgIdx] || listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImgIdx((prev) => (prev > 0 ? prev - 1 : listing.images.length - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImgIdx((prev) => (prev < listing.images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {listing.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                        selectedImgIdx === idx ? 'border-sky-600 scale-95 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sky-600 text-white font-black text-lg flex items-center justify-center shadow-xs">
                      {listing.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sky-950 text-sm flex items-center gap-1">
                        {listing.seller.name}
                        {listing.seller.verified && (
                          <ShieldCheck className="w-4 h-4 text-sky-600 fill-sky-100" />
                        )}
                      </div>
                      <div className="text-xs text-sky-700 font-medium">
                        {listing.seller.userType} • Member since {listing.seller.memberSince}
                      </div>
                    </div>
                  </div>

                  {listing.seller.verifiedFarmer && (
                    <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                      <Tractor className="w-3 h-3" /> VERIFIED FARMER
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 flex items-center gap-1 border-t border-sky-200/60 pt-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{listing.seller.location || `${listing.location.city}, ${listing.location.state}`}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={handleCall}
                    className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>कॉल करें</span>
                  </button>

                  <button
                    onClick={handleWhatsApp}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      startChatWithSeller(listing);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-gray-950 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>ऐप चैट</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-gray-950 leading-snug">
                  {language === 'hi' ? (listing.titleHi || listing.title) : listing.title}
                </h1>

                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-sky-950 tracking-tight">
                    ₹{listing.price.toLocaleString('en-IN')}
                  </span>
                  {listing.originalPrice && (
                    <span className="text-sm text-gray-400 line-through font-semibold">
                      ₹{listing.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {listing.negotiable && (
                    <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-md border border-amber-300 ml-2">
                      {language === 'hi' ? 'नेगोशिएबल (मोल-भाव संभव)' : 'Negotiable'}
                    </span>
                  )}
                </div>
              </div>

              {listing.videoUrl && (
                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-rose-600 text-white font-black flex items-center justify-center text-xs">
                      ▶
                    </span>
                    <div>
                      <div className="font-bold text-rose-950">वीडियो डेमो (Live Video Demo)</div>
                      <div className="text-[10px] text-rose-700">सामान / पशु का वीडियो देखें</div>
                    </div>
                  </div>
                  <a
                    href={listing.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition"
                  >
                    वीडियो खोलें ↗
                  </a>
                </div>
              )}

              {listing.livestockDetails && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl p-3 text-xs space-y-1">
                  <div className="font-bold text-sky-950 text-sm mb-1">🐄 पशुधन विवरण (Livestock Info)</div>
                  <div className="grid grid-cols-2 gap-2 text-sky-900">
                    <div>• दूध: <strong>{listing.livestockDetails.milkCapacityLitersPerDay} लीटर/दिन</strong></div>
                    <div>• नस्ल: <strong>{listing.livestockDetails.breed}</strong></div>
                    <div>• ब्यांत (Lactation): <strong>{listing.livestockDetails.lactationNo || 'दूसरा ब्यांत'}</strong></div>
                    <div>• गाभिन स्थिति: <strong>{listing.livestockDetails.isPregnant ? 'हां (Pregnant)' : 'नहीं'}</strong></div>
                  </div>
                </div>
              )}

              {listing.cropDetails && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
                  <div className="font-bold text-amber-950 text-sm mb-1">🌾 फसल व भूसा विवरण (Crop & Fodder)</div>
                  <div className="grid grid-cols-2 gap-2 text-amber-900">
                    <div>• उपलब्ध स्टॉक: <strong>{listing.cropDetails.quantity} {listing.cropDetails.unit}</strong></div>
                    <div>• कटाई/सीजन: <strong>{listing.cropDetails.harvestDate}</strong></div>
                    <div>• ऑर्गेनिक/जैविक: <strong>{listing.cropDetails.isOrganic ? 'हां (100% शुद्ध)' : 'सामान्य'}</strong></div>
                    <div>• थोक भाव: <strong>{listing.cropDetails.bulkRateAvailable ? 'उपलब्ध है' : 'फिक्स'}</strong></div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'विशेषताएं (Specifications)' : 'Specifications'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {listing.specifications.map((spec, i) => (
                    <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs">
                      <div className="text-gray-500 font-medium">{language === 'hi' ? spec.labelHi : spec.label}</div>
                      <div className="font-bold text-gray-900 mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {language === 'hi' ? 'विवरण (Description)' : 'Description'}
                </h3>
                <p className="text-sm text-gray-700 font-normal leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-xl whitespace-pre-line">
                  {language === 'hi' ? (listing.descriptionHi || listing.description) : listing.description}
                </p>
              </div>

              <div className="bg-sky-900/5 border border-sky-200 rounded-xl p-3 text-xs text-sky-900 flex items-start gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold">सुरक्षा सलाह (Triveni Plus Safety Note):</strong>
                  सामान या पशुधन देखने के बाद ही भुगतान करें। बिना जांचे एडवांस पैसे न भेजें।
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
