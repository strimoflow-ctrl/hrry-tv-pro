import React from 'react';
import { Trophy, Film, Newspaper, Music, Sparkles, Tv, Flame } from 'lucide-react';

const CATEGORY_CONFIG = [
  { id: 'All', label: 'All Channels', icon: Flame },
  { id: 'Sports', label: 'Sports', icon: Trophy, isSports: true },
  { id: 'Entertainment', label: 'Entertainment', icon: Tv },
  { id: 'Movies', label: 'Movies', icon: Film },
  { id: 'News', label: 'News', icon: Newspaper },
  { id: 'Music', label: 'Music', icon: Music },
  { id: 'Infotainment', label: 'Infotainment', icon: Sparkles },
  { id: 'Kids', label: 'Kids', icon: Sparkles },
];

export default function CategoryBar({ categories, selectedCategory, onSelectCategory }) {
  // Ensure Sports is directly after All
  const displayCategories = categories.length > 0 
    ? categories 
    : CATEGORY_CONFIG.map(c => c.id);

  return (
    <div className="sticky top-18 z-30 w-full bg-[#0b0f17]/95 backdrop-blur-md border-b border-white/5 py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {displayCategories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const isSports = cat.toLowerCase() === 'sports';

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? isSports
                      ? 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-red-600 text-white shadow-lg shadow-red-600/30 scale-105'
                    : isSports
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 hover:text-white'
                    : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {isSports && <Trophy className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
                {cat === 'All' && <Flame className="w-3.5 h-3.5 text-red-400" />}
                <span>{cat}</span>
                {isSports && (
                  <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider font-extrabold">
                    HOT
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

