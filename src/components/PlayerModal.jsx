import React, { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player';
import { X, Download, AlertCircle, RefreshCw, Send, Play } from 'lucide-react';

export default function PlayerModal({ channel, onClose, onDownloadApp }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!channel) return;

    shaka.polyfill.installAll();
    let isMounted = true;
    let shakaPlayer = null;

    async function initStream() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const vid = channel.channel_id || '';
        // 1. Fetch dynamic token & DRM keys
        const res = await fetch(`https://eliteapiyash.streamxlive.workers.dev/?id=${vid}`);
        if (!res.ok) throw new Error('Security keys fetch error');
        
        const data = await res.json();
        const info = Array.isArray(data) ? data[0] : data;
        if (!info || !info.mpd_url) throw new Error('Stream URL missing');

        const video = videoRef.current;
        if (!video) return;

        // Initialize Shaka
        shakaPlayer = new shaka.Player(video);
        playerRef.current = shakaPlayer;

        // Build DRM ClearKeys
        const clearKeys = {};
        if (info.keyId && info.key) {
          clearKeys[info.keyId] = info.key;
        }
        if (info.all_keys) {
          info.all_keys.split(',').forEach((pair) => {
            const [kId, kVal] = pair.trim().split(':');
            if (kId && kVal) clearKeys[kId] = kVal;
          });
        }

        shakaPlayer.configure({
          drm: {
            clearKeys: clearKeys,
          },
          streaming: {
            bufferingGoal: 8,
            rebufferingGoal: 2,
            bufferBehind: 10,
          },
        });

        // Append cookie token to all media requests
        if (info.cookie) {
          shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
            if (request.uris && request.uris.length > 0) {
              const url = request.uris[0];
              const sep = url.includes('?') ? '&' : '?';
              request.uris[0] = `${url}${sep}${info.cookie}`;
            }
          });
        }

        shakaPlayer.addEventListener('error', (event) => {
          console.warn('Player Error Code:', event.detail ? event.detail.code : event);
          if (isMounted) {
            setLoading(false);
            setErrorMsg('DRM Protected');
          }
        });

        const manifestUrl = info.cookie ? `${info.mpd_url}?${info.cookie}` : info.mpd_url;
        await shakaPlayer.load(manifestUrl);

        if (isMounted) {
          setLoading(false);
          video.play().catch(() => {});
        }
      } catch (err) {
        console.warn('Init error:', err);
        if (isMounted) {
          setLoading(false);
          setErrorMsg('Stream Unavailable in Browser');
        }
      }
    }

    initStream();

    return () => {
      isMounted = false;
      if (shakaPlayer) {
        shakaPlayer.destroy();
      }
    };
  }, [channel]);

  if (!channel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c1017] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <img
              src={channel.channel_logo}
              alt=""
              className="w-7 h-7 object-contain rounded bg-black/50 p-0.5 border border-white/10"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/app_logo.jpg';
              }}
            />
            <span className="font-bold text-sm text-white">{channel.channel_name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-600/20 text-red-400 font-bold border border-red-500/30">
              LIVE
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            controls
            playsInline
            autoPlay
          />

          {/* Loading */}
          {loading && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center space-y-2.5 z-10">
              <RefreshCw className="w-7 h-7 text-red-500 animate-spin" />
              <p className="text-xs text-slate-300">Connecting stream...</p>
            </div>
          )}

          {/* Clean DRM Notification */}
          {errorMsg && !loading && (
            <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center space-y-3.5 z-10">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">4K Live Stream Available on App</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Browser security DRM streams allow nahi karta. App me 1 click me chalu ho jaata hai.
                </p>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  onClick={onDownloadApp}
                  className="glow-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download App (27 MB)</span>
                </button>

                <a
                  href="https://t.me/hrryfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-medium text-xs text-sky-400 bg-sky-500/10 border border-sky-500/20 hover:bg-sky-500/20 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
