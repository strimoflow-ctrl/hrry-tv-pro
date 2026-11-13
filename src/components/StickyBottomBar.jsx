import React from 'react';
import { Download, Smartphone } from 'lucide-react';

export default function StickyBottomBar({ onDownloadClick }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 p-2 sm:hidden bg-gradient-to-t from-black via-black/95 to-transparent">
      <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-900/95 border border-red-500/30 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs text-white">HrryTV Pro v1.0.0</div>
            <div className="text-[10px] text-emerald-400 font-medium">900+ 4K Channels • Free APK</div>
          </div>
        </div>

        <button
          onClick={onDownloadClick}
          className="glow-btn inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>
      </div>
    </div>
  );
}
