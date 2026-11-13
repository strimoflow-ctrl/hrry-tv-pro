import React from 'react';
import { X, Send, Check } from 'lucide-react';

export default function TelegramModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0f172a] border border-sky-500/20 shadow-2xl p-5 text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 mx-auto">
          <Send className="w-7 h-7 text-white -rotate-12 translate-x-0.5" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Join Telegram Channel</h3>
          <p className="text-xs text-slate-400">
            IPL live links, match updates aur new APK version sabse pehle yahan milenge.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href="https://t.me/hrryfilms"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-sky-500 hover:bg-sky-400 transition cursor-pointer shadow-md"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join @hrryfilms</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
