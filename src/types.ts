export type Language = 'hi' | 'en';

export type ListingCondition = 'New' | 'Like New' | 'Used' | 'Refurbished';

export type UserType = 'Farmer' | 'Individual' | 'Dealer' | 'Verified Seller';

export interface Seller {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  verified: boolean;
  verifiedFarmer: boolean;
  userType: UserType;
  memberSince: string;
  rating: number;
  totalListings: number;
  avatarUrl?: string;
  location: string;
}

export interface Specification {
  label: string;
  labelHi: string;
  value: string;
}

export interface ListingOffer {
  id: string;
  buyerName: string;
  buyerPhone: string;
  offerPrice: number;
  date: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

export interface Listing {
  id: string;
  title: string;
  titleHi: string;
  price: number;
  originalPrice?: number;
  negotiable: boolean;
  condition: ListingCondition;
  isNewItem: boolean;
  category: string;
  categoryHi: string;
  subcategory: string;
  subcategoryHi: string;
  images: string[];
  videoUrl?: string; // YouTube or direct video link for product/cattle demo
  location: {
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  seller: Seller;
  specifications: Specification[];
  // Special category fields
  livestockDetails?: {
    breed: string;
    milkCapacityLitersPerDay?: number;
    ageMonths?: number;
    lactationCycle?: number;
    isVaccinated?: boolean;
    animalType: 'Cow' | 'Buffalo' | 'Goat' | 'Tractor' | 'Bull' | 'Poultry';
  };
  cropDetails?: {
    quantity: number;
    unit: 'Kg' | 'Quintal' | 'Ton' | 'Acre';
    harvestDate: string;
    isOrganic: boolean;
    bulkRateAvailable: boolean;
  };
  vehicleDetails?: {
    brand: string;
    model: string;
    year: number;
    kmDriven: number;
    fuelType: 'Petrol' | 'Diesel' | 'EV' | 'CNG' | 'Hybrid';
    transmission: 'Manual' | 'Automatic';
    ownersCount: number;
  };
  mobileDetails?: {
    brand: string;
    model: string;
    storage: string;
    ram: string;
    hasWarranty: boolean;
  };
  propertyDetails?: {
    propertyType: 'House' | 'Plot/Land' | 'Shop/Office' | 'Agricultural Land';
    areaSqFt: number;
    bedrooms?: number;
    pricePerSqFt?: number;
  };
  description: string;
  descriptionHi: string;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isPromoted?: boolean; // Paid Push / Promoted listing
  promotedBadgeText?: string;
  viewsCount: number;
  postedAt: string;
  isAuctionAvailable?: boolean;
  offers?: ListingOffer[];
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  iconName: string;
  bannerColor: string;
  subcategories: { id: string; name: string; nameHi: string }[];
}

export interface FilterState {
  search: string;
  category: string;
  subcategory: string;
  condition: 'all' | 'new' | 'used' | 'farmer';
  state: string;
  district: string;
  minPrice: number | null;
  maxPrice: number | null;
  verifiedOnly: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  userType: UserType;
  verified: boolean;
  location: string;
  wishlist: string[]; // array of listing IDs
  myListings: Listing[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isSeller: boolean;
}

export interface ChatThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  sellerName: string;
  sellerPhone: string;
  messages: ChatMessage[];
  unreadCount: number;
}
