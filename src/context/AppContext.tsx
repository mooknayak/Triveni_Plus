import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Listing, FilterState, Language, UserProfile, ChatThread, ChatMessage } from '../types';
import { INITIAL_LISTINGS } from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  listings: Listing[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isSellModalOpen: boolean;
  setIsSellModalOpen: (open: boolean) => void;
  isAIValuationOpen: boolean;
  setIsAIValuationOpen: (open: boolean) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  activeChatThread: ChatThread | null;
  setActiveChatThread: (thread: ChatThread | null) => void;
  chatThreads: ChatThread[];
  addListing: (newListing: Listing) => void;
  toggleWishlist: (listingId: string) => void;
  makeOffer: (listingId: string, offerPrice: number, buyerName: string, buyerPhone: string) => void;
  sendChatMessage: (threadId: string, text: string) => void;
  startChatWithSeller: (listing: Listing) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  resetFilters: () => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const defaultFilterState: FilterState = {
  search: '',
  category: '',
  subcategory: '',
  condition: 'all',
  state: '',
  district: '',
  minPrice: null,
  maxPrice: null,
  verifiedOnly: false,
  sortBy: 'newest'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hi'); // Default Hindi for user preference
  const [selectedCity, setSelectedCity] = useState<string>('All India');
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  
  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isSellModalOpen, setIsSellModalOpen] = useState<boolean>(false);
  const [isAIValuationOpen, setIsAIValuationOpen] = useState<boolean>(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState<boolean>(false);
  
  // Persistent listings from localStorage or fallback
  const [listings, setListings] = useState<Listing[]>(() => {
    try {
      const saved = localStorage.getItem('gs_fgs_listings');
      return saved ? JSON.parse(saved) : INITIAL_LISTINGS;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gs_fgs_listings', JSON.stringify(listings));
    } catch (e) {
      console.error('Failed to save listings to localStorage', e);
    }
  }, [listings]);

  // Persistent user state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem('gs_fgs_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch {}
    return {
      id: 'usr-999',
      name: 'रमेश कुमार (Ramesh Kumar)',
      phone: '+91 98765 43210',
      userType: 'Farmer',
      verified: true,
      location: 'Lucknow, Uttar Pradesh',
      wishlist: ['gs-001', 'gs-003'],
      myListings: []
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('gs_fgs_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }, [user]);

  // Chat Threads
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      id: 'chat-1',
      listingId: 'gs-001',
      listingTitle: 'शुद्ध साहीवाल नस्ल गाय (16L Milk)',
      listingImage: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800',
      listingPrice: 68000,
      sellerName: 'Ramkishore Verma (Farmer)',
      sellerPhone: '+91 98765 12345',
      unreadCount: 0,
      messages: [
        {
          id: 'm1',
          senderId: 'usr-999',
          senderName: 'Ramesh Kumar',
          text: 'नमस्कार भैया, क्या यह साहीवाल गाय अभी उपलब्ध है?',
          timestamp: '10:30 AM',
          isSeller: false
        },
        {
          id: 'm2',
          senderId: 'sel-farmer-1',
          senderName: 'Ramkishore Verma',
          text: 'हां भैया उपलब्ध है। आप आकर दोहन देखकर ले जा सकते हैं।',
          timestamp: '10:32 AM',
          isSeller: true
        }
      ]
    }
  ]);

  const [activeChatThread, setActiveChatThread] = useState<ChatThread | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addListing = (newListing: Listing) => {
    setListings((prev) => [newListing, ...prev]);
    setUser((prev) => ({
      ...prev,
      myListings: [newListing, ...prev.myListings]
    }));
    showToast(
      language === 'hi' 
        ? 'बधाई हो! आपका विज्ञापन सफलता पूर्वक पोस्ट हो गया है।' 
        : 'Congratulations! Your ad has been successfully posted.',
      'success'
    );
  };

  const toggleWishlist = (listingId: string) => {
    setUser((prev) => {
      const exists = prev.wishlist.includes(listingId);
      const updated = exists
        ? prev.wishlist.filter((id) => id !== listingId)
        : [...prev.wishlist, listingId];

      showToast(
        exists
          ? (language === 'hi' ? 'विशलिस्ट से हटाया गया' : 'Removed from Wishlist')
          : (language === 'hi' ? 'विशलिस्ट में जोड़ा गया ❤️' : 'Added to Wishlist ❤️'),
        'info'
      );

      return { ...prev, wishlist: updated };
    });
  };

  const makeOffer = (listingId: string, offerPrice: number, buyerName: string, buyerPhone: string) => {
    setListings((prev) =>
      prev.map((item) => {
        if (item.id === listingId) {
          const newOffer = {
            id: 'off-' + Date.now(),
            buyerName,
            buyerPhone,
            offerPrice,
            date: 'Just now',
            status: 'Pending' as const
          };
          return {
            ...item,
            offers: [...(item.offers || []), newOffer]
          };
        }
        return item;
      })
    );
    showToast(
      language === 'hi'
        ? `आपकी ₹${offerPrice.toLocaleString('en-IN')} की मूल्य बोली विक्रेता को भेज दी गई है!`
        : `Your price offer of ₹${offerPrice.toLocaleString('en-IN')} has been sent to the seller!`,
      'success'
    );
  };

  const startChatWithSeller = (listing: Listing) => {
    // Check if chat thread already exists
    let existing = chatThreads.find((t) => t.listingId === listing.id);
    if (!existing) {
      const newThread: ChatThread = {
        id: 'chat-' + Date.now(),
        listingId: listing.id,
        listingTitle: language === 'hi' ? listing.titleHi : listing.title,
        listingImage: listing.images[0],
        listingPrice: listing.price,
        sellerName: listing.seller.name,
        sellerPhone: listing.seller.phone,
        unreadCount: 0,
        messages: [
          {
            id: 'msg-init',
            senderId: listing.seller.id,
            senderName: listing.seller.name,
            text: language === 'hi' 
              ? `नमस्कार! "${listing.titleHi}" के संबंध में आप क्या पूछना चाहते हैं?` 
              : `Hello! How can I help you regarding "${listing.title}"?`,
            timestamp: 'Just now',
            isSeller: true
          }
        ]
      };
      setChatThreads((prev) => [newThread, ...prev]);
      existing = newThread;
    }
    setActiveChatThread(existing);
    setIsChatModalOpen(true);
  };

  const sendChatMessage = (threadId: string, text: string) => {
    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          const newMsg: ChatMessage = {
            id: 'msg-' + Date.now(),
            senderId: user.id,
            senderName: user.name,
            text,
            timestamp: 'Just now',
            isSeller: false
          };
          return {
            ...thread,
            messages: [...thread.messages, newMsg]
          };
        }
        return thread;
      })
    );
    if (activeChatThread && activeChatThread.id === threadId) {
      setActiveChatThread((prev) =>
        prev
          ? {
              ...prev,
              messages: [
                ...prev.messages,
                {
                  id: 'msg-' + Date.now(),
                  senderId: user.id,
                  senderName: user.name,
                  text,
                  timestamp: 'Just now',
                  isSeller: false
                }
              ]
            }
          : null
      );
    }
  };

  const resetFilters = () => {
    setFilterState(defaultFilterState);
    setSelectedCity('All India');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        listings,
        filterState,
        setFilterState,
        selectedListing,
        setSelectedListing,
        user,
        setUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSellModalOpen,
        setIsSellModalOpen,
        isAIValuationOpen,
        setIsAIValuationOpen,
        isChatModalOpen,
        setIsChatModalOpen,
        activeChatThread,
        setActiveChatThread,
        chatThreads,
        addListing,
        toggleWishlist,
        makeOffer,
        sendChatMessage,
        startChatWithSeller,
        toasts,
        showToast,
        resetFilters,
        selectedCity,
        setSelectedCity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
