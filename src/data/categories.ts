import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cattle',
    name: 'Cattle & Livestock',
    nameHi: 'पशुधन (गाय, भैंस, बकरी)',
    icon: 'Cow',
    subcategories: [
      { id: 'cow', name: 'Cows (गाय)', nameHi: 'गाय' },
      { id: 'buffalo', name: 'Buffaloes (भैंस)', nameHi: 'भैंस' },
      { id: 'goat', name: 'Goats (बकरी)', nameHi: 'बकरी' },
      { id: 'sheep', name: 'Sheep (भेड़)', nameHi: 'भेड़' },
      { id: 'bull', name: 'Bulls & Oxen (बैल/सांड)', nameHi: 'बैल/सांड' },
      { id: 'poultry', name: 'Poultry & Birds (मुर्गी/पक्षी)', nameHi: 'मुर्गी/पक्षी' }
    ]
  },
  {
    id: 'tractors',
    name: 'Tractors & Machinery',
    nameHi: 'ट्रैक्टर एवं कृषि मशीनें',
    icon: 'Tractor',
    subcategories: [
      { id: 'tractor', name: 'Tractors (ट्रैक्टर)', nameHi: 'ट्रैक्टर' },
      { id: 'harvester', name: 'Harvesters & Combines (हार्वेस्टर)', nameHi: 'हार्वेस्टर' },
      { id: 'rotavator', name: 'Rotavators & Tillers (रोटावेटर)', nameHi: 'रोटावेटर' },
      { id: 'trolley', name: 'Tractor Trolley & Trailers (ट्रॉली)', nameHi: 'ट्रॉली' },
      { id: 'thresher', name: 'Threshers (थ्रेशर)', nameHi: 'थ्रेशर' },
      { id: 'seeder', name: 'Seeders & Drills (सीडर/बुआई मशीन)', nameHi: 'सीडर' }
    ]
  },
  {
    id: 'implements',
    name: 'Farming Implements & Tools',
    nameHi: 'कृषि औजार एवं उपकरण',
    icon: 'Wrench',
    subcategories: [
      { id: 'plough', name: 'Ploughs & Cultivators (हल/कल्टीवेटर)', nameHi: 'हल/कल्टीवेटर' },
      { id: 'sprayer', name: 'Pesticide Sprayers (स्प्रेयर मशीन)', nameHi: 'स्प्रेयर मशीन' },
      { id: 'water-pump', name: 'Water Pumps & Motors (वाटर पंप/मोटर)', nameHi: 'वाटर पंप/मोटर' },
      { id: 'pipe-irrigation', name: 'Irrigation Pipes & Drip (सिंचाई पाइप)', nameHi: 'सिंचाई पाइप' },
      { id: 'chaff-cutter', name: 'Chaff Cutters (कुट्टी काटने की मशीन)', nameHi: 'कुट्टी काटने की मशीन' }
    ]
  },
  {
    id: 'produce',
    name: 'Crops & Agri Produce',
    nameHi: 'फसल, अनाज एवं उपज',
    icon: 'Wheat',
    subcategories: [
      { id: 'wheat-rice', name: 'Grains (गेहूं, धान, मक्का)', nameHi: 'गेहूं, धान, मक्का' },
      { id: 'pulses', name: 'Pulses & Dal (दालें/दलहन)', nameHi: 'दालें/दलहन' },
      { id: 'oilseeds', name: 'Oilseeds (सरसों, मूंगफली)', nameHi: 'सरसों, मूंगफली' },
      { id: 'sugarcane', name: 'Sugarcane & Jaggery (गन्ना/गुड़)', nameHi: 'गन्ना/गुड़' },
      { id: 'fodder', name: 'Animal Fodder & Straw (भूसा/चारा)', nameHi: 'भूसा/चारा' },
      { id: 'fruits-veg', name: 'Fruits & Vegetables (फल-सब्जियां)', nameHi: 'फल-सब्जियां' }
    ]
  },
  {
    id: 'seeds-fertilizers',
    name: 'Seeds, Fertilizers & Pesticides',
    nameHi: 'बीज, खाद एवं कीटनाशक',
    icon: 'Sprout',
    subcategories: [
      { id: 'seeds', name: 'Certified Seeds (प्रमाणित बीज)', nameHi: 'प्रमाणित बीज' },
      { id: 'organic-fertilizer', name: 'Organic Fertilizers & Compost (जैविक खाद)', nameHi: 'जैविक खाद' },
      { id: 'vermicompost', name: 'Vermicompost (वर्मीकंपोस्ट)', nameHi: 'वर्मीकंपोस्ट' },
      { id: 'pesticides', name: 'Bio-Pesticides & Tonics (जैविक कीटनाशक)', nameHi: 'जैविक कीटनाशक' }
    ]
  },
  {
    id: 'solar-energy',
    name: 'Solar & Farm Infrastructure',
    nameHi: 'सोलर पंप एवं फार्म ढांचा',
    icon: 'Sun',
    subcategories: [
      { id: 'solar-pump', name: 'Solar Water Pumps (सोलर वाटर पंप)', nameHi: 'सोलर वाटर पंप' },
      { id: 'solar-panels', name: 'Solar Panels & Inverters (सोलर पैनल)', nameHi: 'सोलर पैनल' },
      { id: 'fencing', name: 'Solar Fencing & Wires (झटका मशीन/तार)', nameHi: 'झटका मशीन/तार' },
      { id: 'greenhouse', name: 'Greenhouse & Polyhouse Nets (पॉलीहाउस नेट)', nameHi: 'पॉलीहाउस नेट' }
    ]
  },
  {
    id: 'land-rental',
    name: 'Agri Land & Equipment Rental',
    nameHi: 'कृषि जमीन एवं उपकरण किराए पर',
    icon: 'Landmark',
    subcategories: [
      { id: 'land-sale', name: 'Agricultural Land for Sale (कृषि भूमि बिक्री)', nameHi: 'कृषि भूमि बिक्री' },
      { id: 'land-lease', name: 'Land for Lease/Batai (बटाई/लीज़ पर जमीन)', nameHi: 'बटाई/लीज़ पर जमीन' },
      { id: 'tractor-rent', name: 'Tractor/Harvester Rental (किराए पर ट्रैक्टर)', nameHi: 'किराए पर ट्रैक्टर' }
    ]
  }
];

export const STATES_AND_DISTRICTS: Record<string, string[]> = {
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Gorakhpur', 'Prayagraj', 'Bareilly', 'Meerut', 'Ayodhya'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Ujjain', 'Gwalior', 'Jabalpur', 'Sagar', 'Satna', 'Rewa'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bikaner', 'Ajmer', 'Alwar', 'Sriganganagar'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Sangrur'],
  'Haryana': ['Karnal', 'Hisar', 'Rohtak', 'Ambala', 'Kurukshetra', 'Sirsa'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Rohtas'],
  'Maharashtra': ['Pune', 'Nashik', 'Nagpur', 'Aurangabad', 'Solapur', 'Kolhapur']
};
