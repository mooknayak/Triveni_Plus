import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, Phone, MessageCircle, ShieldCheck, Tractor, Sparkles } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const { language, activeChat, sendMessage, user } = useApp();
  const [msgText, setMsgText] = useState('');

  if (!isOpen || !activeChat) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgText.trim()) return;
    sendMessage(activeChat.chatId, msgText.trim());
    setMsgText('');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते! मैं Triveni Plus पर आपकी लिस्टिंग "${activeChat.listingTitle}" के संबंध में संदेश भेज रहा हूँ।`
    );
    window.open(`https://wa.me/${activeChat.sellerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${activeChat.sellerPhone}`, '_self');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-sky-200 overflow-hidden flex flex-col h-[85vh]">
        <div className="bg-sky-900 text-white p-4 flex items-center justify-between border-b border-sky-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-sky-950 font-black text-base flex items-center justify-center">
              {activeChat.sellerName.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1">
                {activeChat.sellerName}
                <ShieldCheck className="w-3.5 h-3.5 text-sky-300" />
              </div>
              <div className="text-[11px] text-sky-200 truncate max-w-[200px]">
                {activeChat.listingTitle}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              className="p-2 bg-sky-800 hover:bg-sky-700 text-sky-200 hover:text-white rounded-xl transition cursor-pointer"
              title="Call"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsApp}
              className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer"
              title="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button onClick={onClose} className="p-1.5 text-sky-200 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1 bg-slate-50">
          <div className="bg-sky-100 border border-sky-200 rounded-xl p-2.5 text-center text-xs text-sky-900">
            💬 <strong>सुरक्षित चैट:</strong> आप सीधे विक्रेता से Triveni Plus ऐप पर चैट कर रहे हैं।
          </div>

          {activeChat.messages.map((m) => {
            const isMe = m.senderId === user.id || m.senderId === 'user-1';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm font-medium ${
                    isMe
                      ? 'bg-sky-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white border-t border-sky-200 flex gap-2 shrink-0">
          <input
            type="text"
            value={msgText}
            onChange={(e) => setMsgText(e.target.value)}
            placeholder={language === 'hi' ? 'संदेश लिखें (उदा. क्या कीमत में छूट मिल सकती है?)...' : 'Type message...'}
            className="flex-1 bg-sky-50 border border-sky-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-sky-950 font-medium focus:outline-none"
          />
          <button
            type="submit"
            className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'hi' ? 'भेजें' : 'Send'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
