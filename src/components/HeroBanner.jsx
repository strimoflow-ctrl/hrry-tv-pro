import React from 'react';
import { Download, Radio, Trophy, Zap, ShieldCheck } from 'lucide-react';

export default function HeroBanner({ onDownloadClick, onExploreClick }) {
  return (
    <div className="relative overflow-hidden pt-4 pb-6 md:pt-8 md:pb-10 bg-gradient-to-b from-red-950/20 via-[#0b0f17] to-[#0b0f17]">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Live Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span>LIVE TV & 4K SPORTS STREAMING</span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Stream 900+ Channels. <br />
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-amber-400 bg-clip-text text-transparent">
              Zero Ads, 4K Ultra HD.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Watch Live Cricket, Sports, Movies & TV Shows without any subscriptions.
            Enjoy 100% lag-free playback on HrryTV Pro Android App.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
              <Trophy className="w-3 h-3 text-amber-400" /> Live Cricket & Sports
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
              <Zap className="w-3 h-3 text-red-400" /> Zero Buffering
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Free Forever
            </span>
          </div>

          {/* Action CTAs with REAL version v1.0.0 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onDownloadClick}
              className="w-full sm:w-auto glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 transition shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Android APK (v1.0.0)</span>
            </button>

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-300 bg-slate-850 hover:bg-slate-800 border border-slate-700 transition cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-red-400" />
              <span>Browse Live Channels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
