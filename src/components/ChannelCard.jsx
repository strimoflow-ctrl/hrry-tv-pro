import React from 'react';
import { Play, Tv, Sparkles, Trophy } from 'lucide-react';

export default function ChannelCard({ channel, onPlay }) {
  const isSports = channel.channel_category?.toLowerCase() === 'sports';

  return (
    <div
      onClick={() => onPlay(channel)}
      className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 hover:border-red-500/50 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-red-950/30 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
    >
      {/* Top badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          LIVE
        </span>

        {isSports ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <Trophy className="w-2.5 h-2.5" /> Sports
          </span>
        ) : (
          <span className="text-[10px] font-medium text-slate-400 truncate max-w-[100px]">
            {channel.channel_category || 'General'}
          </span>
        )}
      </div>

      {/* Channel Logo Image Box */}
      <div className="relative aspect-video w-full rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center p-3 overflow-hidden group-hover:bg-slate-950 transition-colors">
        <img
          src={channel.channel_logo}
          alt={channel.channel_name}
          loading="lazy"
          className="max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/app_logo.jpg';
          }}
        />

        {/* Hover Play Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-0.5 fill-white" />
          </div>
        </div>
      </div>

      {/* Channel Info */}
      <div className="mt-3.5 space-y-1">
        <h3 className="font-bold text-sm text-slate-100 group-hover:text-red-400 transition-colors line-clamp-1">
          {channel.channel_name}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate">{channel.channel_language || 'Hindi'}</span>
          <span className="font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.2 rounded text-[10px]">
            HD
          </span>
        </div>
      </div>
    </div>
  );
}

