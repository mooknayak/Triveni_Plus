import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, TrendingDown, Minus, RefreshCw, MessageSquare, Send, Tractor, Sparkles, AlertCircle } from 'lucide-react';

interface MandiRate {
  commodity: string;
  commodityEn: string;
  pricePerQuintal: string;
  mandi: string;
  trend: 'up' | 'down' | 'stable';
}

interface MandiPost {
  id: string;
  user: string;
  location: string;
  message: string;
  time: string;
  verified: boolean;
}

export const MandiBhavWidget: React.FC = () => {
  const { language } = useApp();
  const [rates, setRates] = useState<MandiRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // ... बाकी कोड
