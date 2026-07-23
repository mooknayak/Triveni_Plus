import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'pashudhan_fodder',
    name: 'Livestock & Fodder',
    nameHi: 'पशुधन व पशु चारा (गाय/भैंस/भूसा)',
    iconName: 'Sparkles',
    bannerColor: 'bg-amber-600',
    subcategories: [
      { id: 'pashu_cow', name: 'Cows (गाय - साहीवाल/एचएफ/गिर)', nameHi: 'गाय (साहीवाल/एचएफ/गिर)' },
      { id: 'pashu_buffalo', name: 'Buffaloes (भैंस - मुर्रा/जाफराबादी)', nameHi: 'भैंस (मुर्रा/जाफराबादी)' },
      { id: 'pashu_goat_bull', name: 'Goats, Sheep & Bulls (बकरी/भेड़/बैल)', nameHi: 'बकरी, भेड़, बैल व पोल्ट्री' },
      { id: 'chara_bhusa', name: 'Fodder & Straw (सूखा भूसा/पुआल/हरा चारा)', nameHi: 'गेहूं का भूसा, पुआल व हरा चारा' },
      { id: 'pashu_aahaar', name: 'Cattle Feed & Khali (पशु आहार/खली)', nameHi: 'पशु आहार, खली व चोकर' },
    ]
  },
  {
    id: 'anaaj_crops',
    name: 'Grains & Crop Harvest',
    nameHi: 'किसान अनाज व फसल (गेहूं/धान/सरसों)',
    iconName: 'Tractor',
    bannerColor: 'bg-emerald-600',
    subcategories: [
      { id: 'wheat_gehun', name: 'Wheat Grains (गेहूं फसल)', nameHi: 'गेहूं अनाज (शरबाती/देशी)' },
      { id: 'paddy_rice', name: 'Paddy & Rice (धान व चावल)', nameHi: 'धान व बासमती चावल' },
      { id: 'mustard_pulses', name: 'Mustard & Pulses (सरसों व दालें)', nameHi: 'सरसों, चना, अरहर व दालें' },
      { id: 'seeds_fertilizers', name: 'Certified Seeds & Bio-Fertilizer (बीज व खाद)', nameHi: 'प्रमाणित बीज व जैविक खाद' },
    ]
  },
  {
    id: 'sabji_fruits',
    name: 'Fresh Produce & Veggies',
    nameHi: 'ताजा सब्जियां व फल (आलू/टमाटर/प्याज)',
    iconName: 'Shirt',
    bannerColor: 'bg-rose-600',
    subcategories: [
      { id: 'potato_onion', name: 'Potato, Onion & Garlic (आलू/प्याज/लहसुन)', nameHi: 'आलू, प्याज व लहसुन थोक' },
      { id: 'tomato_green', name: 'Tomato & Green Veggies (टमाटर व हरी सब्जियां)', nameHi: 'टमाटर व हरी सब्जियां' },
      { id: 'farm_fruits', name: 'Fresh Farm Fruits (ताजा फल व बागवानी)', nameHi: 'ताजा फल (आम/केला/अमरूद)' },
    ]
  },
  {
    id: 'krishi_machinery',
    name: 'Tractor & Farm Tools',
    nameHi: 'ट्रैक्टर व कृषि उपकरण',
    iconName: 'Tractor',
    bannerColor: 'bg-sky-600',
    subcategories: [
      { id: 'tractors', name: 'Tractors (महिंद्रा/स्वराज/जॉन डियर)', nameHi: 'ट्रैक्टर (महिंद्रा/स्वराज/मैसी)' },
      { id: 'implements', name: 'Harvester, Cultivator & Thresher (थ्रेशर)', nameHi: 'थ्रेशर, कल्टीवेटर व रोटावेटर' },
      { id: 'agri_land', name: 'Agricultural Land & Farmhouses (खेती जमीन)', nameHi: 'खेती की जमीन व फार्महाउस' },
    ]
  },
  {
    id: 'vehicles',
    name: 'Vehicles & Electric EVs',
    nameHi: 'गाड़ियां व इलेक्ट्रिक वाहन',
    iconName: 'Car',
    bannerColor: 'bg-blue-600',
    subcategories: [
      { id: 'electric_ev', name: 'Electric Vehicles (EV Cars & Scooters)', nameHi: 'इलेक्ट्रिक गाड़ियां (EV)' },
      { id: 'cars', name: 'Cars & SUVs (फोर-व्हीलर)', nameHi: 'कार व फोर-व्हीलर' },
      { id: 'bikes', name: 'Bikes & Scooters (बाइक/स्कूटी)', nameHi: 'बाइक व स्कूटी' },
      { id: 'commercial', name: 'Commercial & Pickup Trucks (पिकअप)', nameHi: 'कमर्शियल व पिकअप' },
      { id: 'auto_parts', name: 'Spare Parts & Accessories (स्पेयर पार्ट्स)', nameHi: 'स्पेयर पार्ट्स व टायर' },
    ]
  },
  {
    id: 'electronics',
    name: 'Mobiles & Electronics',
    nameHi: 'मोबाइल व इलेक्ट्रॉनिक्स',
    iconName: 'Smartphone',
    bannerColor: 'bg-indigo-600',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones & iPhones (स्मार्टफोन)', nameHi: 'स्मार्टफोन व आईफोन' },
      { id: 'laptops', name: 'Laptops & Computers (लैपटॉप/कंप्यूटर)', nameHi: 'लैपटॉप व कंप्यूटर' },
      { id: 'tv_audio', name: 'Smart TV & Refrigerators (टीवी/फ्रिज)', nameHi: 'स्मार्ट टीवी व फ्रिज' },
      { id: 'ac_coolers', name: 'Air Conditioners & Coolers (एसी/कूलर)', nameHi: 'एसी व एयर कूलर' },
    ]
  },
  {
    id: 'property',
    name: 'Property & Real Estate',
    nameHi: 'प्रॉपर्टी, जमीन व मकान',
    iconName: 'Building2',
    bannerColor: 'bg-amber-600',
    subcategories: [
      { id: 'residential_house', name: 'House & Flats for Sale (मकान/फ्लैट)', nameHi: 'मकान व फ्लैट बिकऊ' },
      { id: 'plots_land', name: 'Plots & Land (प्लॉट/जमीन)', nameHi: 'प्लॉट व जमीन' },
      { id: 'rentals', name: 'House & Rooms for Rent (किराए का मकान)', nameHi: 'किराए के मकान व दुकान' },
    ]
  },
  {
    id: 'jobs_services',
    name: 'Jobs & Local Services',
    nameHi: 'रोजगार व स्थानीय सेवाएं',
    iconName: 'Briefcase',
    bannerColor: 'bg-teal-600',
    subcategories: [
      { id: 'farm_workers', name: 'Agriculture & Farm Workers (खेती मजदूर)', nameHi: 'खेती-किसानी मजदूर' },
      { id: 'driver_mechanic', name: 'Drivers & Technicians (ड्राइवर/मैकेनिक)', nameHi: 'ड्राइवर व मैकेनिक' },
      { id: 'home_repair', name: 'Electrician & Plumber Services (इलेक्ट्रीशियन)', nameHi: 'इलेक्ट्रीशियन व प्लंबर' },
    ]
  }
];

export const STATES_DISTRICTS = [
  { state: 'Uttar Pradesh', cities: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Gorakhpur', 'Meerut', 'Ayodhya', 'Bareilly'] },
  { state: 'Bihar', cities: ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Purnia', 'Darbhanga', 'Arrah'] },
  { state: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'] },
  { state: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'] },
  { state: 'Delhi NCR', cities: ['New Delhi', 'Noida', 'Gurugram', 'Ghaziabad', 'Faridabad'] },
  { state: 'Punjab & Haryana', cities: ['Ludhiana', 'Amritsar', 'Chandigarh', 'Karnal', 'Hisar', 'Patiala'] },
];
