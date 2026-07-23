import { Listing, MandiBhav } from '../types';

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'मुर्रा नस्ल की दुधारू भैंस (14 लीटर दूध क्षमता)',
    titleHi: 'मुर्रा नस्ल की दुधारू भैंस (14 लीटर दूध क्षमता)',
    category: 'pashudhan_fodder',
    subcategory: 'pashu_buffalo',
    price: 85000,
    priceType: 'fixed',
    location: 'Lucknow',
    state: 'Uttar Pradesh',
    pincode: '226001',
    images: [
      'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=800'
    ],
    sellerName: 'राम सिंह यादव',
    sellerPhone: '9876543210',
    sellerAddress: 'गांव बक्शी का तालाब, लखनऊ',
    description: 'दूसरा ब्यात, बच्चा साथ में है। शांत स्वभाव, प्रतिदिन 14 लीटर गाढ़ा दूध देती है। टीकाकरण पूर्ण हो चुका है।',
    condition: 'used',
    verifiedSeller: true,
    featured: true,
    viewsCount: 412,
    createdAt: '2025-05-10T10:00:00Z',
    specifications: {
      'दूध क्षमता': '14 लीटर/दिन',
      'ब्यात': 'दूसरा ब्यात',
      'उम्र': '5 वर्ष',
      'बच्चा': 'कटड़ा (Male)'
    }
  },
  {
    id: '2',
    title: 'महिंद्रा 575 DI ट्रैक्टर (2022 मॉडल) - बेहतरीन स्थिति',
    titleHi: 'महिंद्रा 575 DI ट्रैक्टर (2022 मॉडल) - बेहतरीन स्थिति',
    category: 'krishi_machinery',
    subcategory: 'tractors',
    price: 495000,
    priceType: 'negotiable',
    location: 'Kanpur',
    state: 'Uttar Pradesh',
    pincode: '208001',
    images: [
      'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1530267981608-bc70a00e57c6?auto=format&fit=crop&q=80&w=800'
    ],
    sellerName: 'सुरेश चौधरी',
    sellerPhone: '9812345678',
    sellerAddress: 'अकबरपुर रोड, कानपुर देहात',
    description: '45 HP इंजन, पावर स्टीयरिंग, मात्र 1200 घंटे चला हुआ। नए अपोलो टायर लगे हैं, तुरंत काम शुरू करने योग्य।',
    condition: 'used',
    verifiedSeller: true,
    featured: true,
    viewsCount: 890,
    createdAt: '2025-05-11T14:30:00Z',
    specifications: {
      'HP Class': '45 HP',
      'वर्ष': '2022',
      'चलने के घंटे': '1200 hrs',
      'आरसी कागजात': 'पूर्ण व वैध'
    }
  },
  {
    id: '3',
    title: 'शुद्ध शरबाती गेहूं (ताजा फसल) - 50 क्विंटल थोक',
    titleHi: 'शुद्ध शरबाती गेहूं (ताजा फसल) - 50 क्विंटल थोक',
    category: 'anaaj_crops',
    subcategory: 'wheat_gehun',
    price: 2450,
    priceType: 'fixed',
    location: 'Bhopal',
    state: 'Madhya Pradesh',
    pincode: '462001',
    images: [
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800'
    ],
    sellerName: 'दिनेश पाटीदार',
    sellerPhone: '9926011223',
    sellerAddress: 'विदिशा रोड, भोपाल',
    description: 'ऑर्गेनिक तरीके से उगाया गया प्रीमियम शरबाती गेहूं। पूरी तरह साफ एवं सुखाया हुआ। रेट प्रति क्विंटल में दर्शाया गया है।',
    condition: 'new',
    verifiedSeller: true,
    featured: false,
    viewsCount: 230,
    createdAt: '2025-05-12T09:15:00Z',
    specifications: {
      'कुल मात्रा': '50 क्विंटल उपलब्ध',
      'वैरायटी': 'एमपी शरबाती 1544',
      'पैकिंग': '50kg बोरी'
    }
  },
  {
    id: '4',
    title: 'टाटा नेक्सॉन EV मैक्स 2023 (इलेक्ट्रिक SUV)',
    titleHi: 'टाटा नेक्सॉन EV मैक्स 2023 (इलेक्ट्रिक SUV)',
    category: 'vehicles',
    subcategory: 'electric_ev',
    price: 1350000,
    priceType: 'negotiable',
    location: 'New Delhi',
    state: 'Delhi NCR',
    pincode: '110001',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800'
    ],
    sellerName: 'अमित मेहरा',
    sellerPhone: '9811223344',
    sellerAddress: 'जनकपुरी, नई दिल्ली',
    description: 'सिंगल ओनर, केवल 18,000 KM चली। 400+ KM की रियल ड्राइविंग रेंज। होम चार्जर व फास्ट चार्जर साथ उपलब्ध।',
    condition: 'used',
    verifiedSeller: true,
    featured: true,
    viewsCount: 1120,
    createdAt: '2025-05-13T11:20:00Z',
    specifications: {
      'ड्राइविंग रेंज': '453 KM (ARAI)',
      'बैटरी वारंटी': '8 साल वैध',
      'ओनर': '1st Owner'
    }
  },
  {
    id: '5',
    title: 'सूखा गेहूं भूसा (Wheat Straw) - 100 क्विंटल थोक बिक्री',
    titleHi: 'सूखा गेहूं भूसा (Wheat Straw) - 100 क्विंटल थोक बिक्री',
    category: 'pashudhan_fodder',
    subcategory: 'chara_bhusa',
    price: 750,
    priceType: 'fixed',
    location: 'Patna',
    state: 'Bihar',
    pincode: '800001',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
    ],
    sellerName: 'मनोज गुप्ता',
    sellerPhone: '9431012345',
    sellerAddress: 'बिहटा, पटना',
    description: 'उच्च गुणवत्ता वाला बिना बारिश का सूखा भूसा। पशुओं के लिए अत्यंत स्वास्थ्यवर्धक। परिवहन की सुविधा अलग शुल्क पर।',
    condition: 'new',
    verifiedSeller: false,
    featured: false,
    viewsCount: 175,
    createdAt: '2025-05-14T08:00:00Z',
    specifications: {
      'मात्रा': '100 क्विंटल',
      'पैकिंग': 'खुला व बंडल'
    }
  }
];

export const INITIAL_MANDI_RATES: MandiBhav[] = [
  { id: 'mb-1', crop: 'गेहूं (Wheat)', cropHi: 'गेहूं', state: 'Uttar Pradesh', mandi: 'लखनऊ मंडी', price: 2380, minPrice: 2320, maxPrice: 2420, change: 15, updatedDate: 'आज' },
  { id: 'mb-2', crop: 'सरसों (Mustard)', cropHi: 'सरसों', state: 'Rajasthan', mandi: 'जयपुर मंडी', price: 5450, minPrice: 5300, maxPrice: 5600, change: -30, updatedDate: 'आज' },
  { id: 'mb-3', crop: 'आलू (Potato)', cropHi: 'आलू', state: 'Uttar Pradesh', mandi: 'फर्रूखाबाद मंडी', price: 1450, minPrice: 1380, maxPrice: 1520, change: 40, updatedDate: 'आज' },
  { id: 'mb-4', crop: 'धान (Paddy)', cropHi: 'धान', state: 'Punjab & Haryana', mandi: 'करनाल मंडी', price: 2280, minPrice: 2200, maxPrice: 2350, change: 0, updatedDate: 'आज' },
  { id: 'mb-5', crop: 'चना (Gram)', cropHi: 'चना', state: 'Madhya Pradesh', mandi: 'इन्दौर मंडी', price: 5800, minPrice: 5650, maxPrice: 5950, change: 65, updatedDate: 'आज' },
  { id: 'mb-6', crop: 'टमाटर (Tomato)', cropHi: 'टमाटर', state: 'Bihar', mandi: 'पटना मंडी', price: 1800, minPrice: 1600, maxPrice: 2000, change: -100, updatedDate: 'आज' },
];
