import React from 'react';
import { X, Download, Smartphone } from 'lucide-react';

export default function DownloadModal({ isOpen, onClose, channelName }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Hrry_tv_pro.apk';
    link.setAttribute('download', 'Hrry_tv_pro.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0f172a] border border-red-500/30 shadow-2xl p-5 text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center shadow-lg shadow-red-600/25 mx-auto text-white">
          <Smartphone className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Download HrryTV Pro App</h3>
          <p className="text-xs text-slate-400">
            900+ channels 4K Ultra HD me bina kisi lag ya buffering ke dekhein.
          </p>
        </div>

        <div className="space-y-2 pt-1">
          <button
            onClick={handleDownload}
            className="w-full glow-btn inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 transition cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK (27 MB)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-1.5 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
