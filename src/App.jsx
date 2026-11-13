import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import CategoryBar from './components/CategoryBar';
import ChannelCard from './components/ChannelCard';
import PlayerModal from './components/PlayerModal';
import TelegramModal from './components/TelegramModal';
import DownloadModal from './components/DownloadModal';
import StickyBottomBar from './components/StickyBottomBar';
import { AlertCircle, RefreshCw, Send, Download } from 'lucide-react';

export default function App() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [activeChannel, setActiveChannel] = useState(null);
  const [showTelegramModal, setShowTelegramModal] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadPromptChannel, setDownloadPromptChannel] = useState(null);

  const channelSectionRef = useRef(null);

  // 1. Fetch channel list
  useEffect(() => {
    async function loadChannels() {
      setLoading(true);
      setError(null);
      try {
        let data = null;
        try {
          const localRes = await fetch('/channels.json');
          if (localRes.ok) {
            data = await localRes.json();
          }
        } catch (_) {}

        if (!data || !Array.isArray(data) || data.length === 0) {
          const apiRes = await fetch('https://api.npoint.io/9db02feba76eb297fc65');
          if (apiRes.ok) {
            data = await apiRes.json();
          }
        }

        if (Array.isArray(data)) {
          setChannels(data);
        } else {
          throw new Error('Invalid channels format');
        }
      } catch (err) {
        console.error('Failed to load channels:', err);
        setError('Failed to fetch channels. Please check network.');
      } finally {
        setLoading(false);
      }
    }

    loadChannels();
  }, []);

  // 2. Telegram Modal trigger: Show once per page session
  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hrry_tg_seen');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setShowTelegramModal(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseTelegram = () => {
    sessionStorage.setItem('hrry_tg_seen', '1');
    setShowTelegramModal(false);
  };

  // Categories with Sports #1
  const categories = useMemo(() => {
    const set = new Set();
    channels.forEach((c) => {
      const cat = c.channel_category || c.channel_genre;
      if (cat && cat.trim()) {
        set.add(cat.trim());
      }
    });

    const list = Array.from(set);
    const sportsIndex = list.findIndex(c => c.toLowerCase() === 'sports');
    let sportsItem = 'Sports';
    if (sportsIndex > -1) {
      sportsItem = list.splice(sportsIndex, 1)[0];
    }

    list.sort();
    return ['All', sportsItem, ...list];
  }, [channels]);

  // Filtered channels
  const filteredChannels = useMemo(() => {
    let list = channels;

    if (selectedCategory !== 'All') {
      list = list.filter((c) => {
        const cat = c.channel_category || c.channel_genre || '';
        return cat.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter((c) => {
        const name = c.channel_name || '';
        const cat = c.channel_category || c.channel_genre || '';
        const lang = c.channel_language || c.language || '';
        return name.toLowerCase().includes(q) || cat.toLowerCase().includes(q) || lang.toLowerCase().includes(q);
      });
    }

    return list;
  }, [channels, selectedCategory, searchTerm]);

  // Direct channel click -> opens player! No blocking download popup!
  const handlePlayChannel = (channel) => {
    setActiveChannel(channel);
  };

  const handleDownloadApp = () => {
    const link = document.createElement('a');
    link.href = '/Hrry_tv_pro.apk';
    link.setAttribute('download', 'Hrry_tv_pro.apk');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDownloadModal(false);
  };

  const scrollToChannels = () => {
    if (channelSectionRef.current) {
      channelSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white">
      {/* 1. Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onDownloadClick={() => {
          setDownloadPromptChannel(null);
          setShowDownloadModal(true);
        }}
      />

      {/* 2. Hero OTT Banner */}
      <HeroBanner
        onDownloadClick={() => {
          setDownloadPromptChannel(null);
          setShowDownloadModal(true);
        }}
        onExploreClick={scrollToChannels}
      />

      {/* 3. Sticky Categories Bar (Sports is #1) */}
      <CategoryBar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSearchTerm('');
        }}
      />

      {/* 4. Main Channels Grid Section */}
      <main ref={channelSectionRef} className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <span>{selectedCategory === 'All' ? 'All Live Channels' : `${selectedCategory} Channels`}</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {filteredChannels.length}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Select any live broadcast below to play
            </p>
          </div>

          {searchTerm && (
            <div className="text-xs text-slate-400">
              Results for <span className="text-red-400 font-bold">"{searchTerm}"</span>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-red-500 animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading live feeds...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-16 text-center space-y-3 bg-red-950/20 border border-red-500/30 rounded-2xl p-6 max-w-md mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
            <p className="text-sm text-slate-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white transition cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid List */}
        {!loading && !error && filteredChannels.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {filteredChannels.map((channel, idx) => (
              <ChannelCard
                key={channel.channel_id ? `${channel.channel_id}-${idx}` : idx}
                channel={channel}
                onPlay={handlePlayChannel}
              />
            ))}
          </div>
        )}

        {/* Empty Search */}
        {!loading && !error && filteredChannels.length === 0 && (
          <div className="py-20 text-center space-y-3">
            <p className="text-slate-400 text-sm">No channels matched your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-xs text-red-400 hover:text-red-300 font-semibold underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* 5. Footer */}
      <footer className="w-full bg-[#070a10] border-t border-white/5 py-8 mt-12 pb-24 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                HRRY<span className="text-red-500">TV</span> PRO
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Web Portal</span>
            </div>
            <p className="text-xs text-slate-400">
              900+ Live Channels • Live Sports • 4K OTT Hub
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-400">
            <a
              href="https://t.me/hrryfilms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" /> Telegram (@hrryfilms)
            </a>
            <a
              href="https://t.me/cryvex4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-200 transition"
            >
              Developer (@cryvex4)
            </a>
            <button
              onClick={() => {
                setDownloadPromptChannel(null);
                setShowDownloadModal(true);
              }}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Download App
            </button>
          </div>
        </div>
      </footer>

      {/* 6. Mobile Bottom Bar */}
      <StickyBottomBar
        onDownloadClick={() => {
          setDownloadPromptChannel(null);
          setShowDownloadModal(true);
        }}
      />

      {/* 7. Telegram Modal */}
      <TelegramModal
        isOpen={showTelegramModal}
        onClose={handleCloseTelegram}
      />

      {/* 8. Download Modal */}
      <DownloadModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        channelName={downloadPromptChannel}
      />

      {/* 9. Video Player Modal */}
      <PlayerModal
        channel={activeChannel}
        onClose={() => setActiveChannel(null)}
        onDownloadApp={() => {
          setActiveChannel(null);
          handleDownloadApp();
        }}
      />
    </div>
  );
}
