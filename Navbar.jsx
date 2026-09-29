import React, { useState, useEffect } from 'react';

export default function Navbar({
  selectedSheet,
  onSelectSheet,
  sheetOptions,
  onOpenUpload,
  onOpenInstructions,
  onOpenWeekly
}) {
  const [timeStr, setTimeStr] = useState('');
  const [activeMealBadge, setActiveMealBadge] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );

      const hours = now.getHours();
      const mins = now.getMinutes();
      const currentMin = hours * 60 + mins;

      // Meal times:
      // Breakfast: 7:00 - 10:00 (420 - 600)
      // Lunch: 12:00 - 15:00 (720 - 900)
      // Snacks: 16:30 - 18:30 (990 - 1110)
      // Dinner: 19:30 - 22:00 (1170 - 1320)
      if (currentMin >= 420 && currentMin < 600) {
        setActiveMealBadge('Serving: Breakfast');
      } else if (currentMin >= 600 && currentMin < 720) {
        setActiveMealBadge('Next: Lunch (12:00 PM)');
      } else if (currentMin >= 720 && currentMin < 900) {
        setActiveMealBadge('Serving: Lunch');
      } else if (currentMin >= 900 && currentMin < 990) {
        setActiveMealBadge('Next: Snacks (4:30 PM)');
      } else if (currentMin >= 990 && currentMin < 1110) {
        setActiveMealBadge('Serving: Snacks');
      } else if (currentMin >= 1110 && currentMin < 1170) {
        setActiveMealBadge('Next: Dinner (7:30 PM)');
      } else if (currentMin >= 1170 && currentMin < 1320) {
        setActiveMealBadge('Serving: Dinner');
      } else {
        setActiveMealBadge('Next: Breakfast (7:00 AM)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-slate-900/80 border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-lg shadow-orange-500/25 ring-2 ring-orange-400/30">
              <span className="text-2xl">🍽️</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  VIT-AP
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Cafeteria
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight">
                Campus Mess Menu
              </h1>
            </div>
          </div>

          {/* Center: Live Clock & Status Badge */}
          <div className="hidden md:flex flex-col items-center">
            <div className="text-sm font-semibold tracking-wider font-mono text-amber-300 flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans">Local Time:</span> {timeStr}
            </div>
            <div className="mt-0.5 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
              {activeMealBadge}
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Sheet Switcher */}
            <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center text-xs font-medium">
              {sheetOptions.map((sheet) => {
                const isSelected = selectedSheet === sheet;
                const isSpecial = sheet.toLowerCase().includes('special');
                return (
                  <button
                    key={sheet}
                    onClick={() => onSelectSheet(sheet)}
                    className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? isSpecial
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{isSpecial ? '✨' : '🥗'}</span>
                    <span className="hidden sm:inline">{sheet.replace('_', ' ')}</span>
                    <span className="sm:hidden">{isSpecial ? 'Special' : 'Regular'}</span>
                  </button>
                );
              })}
            </div>

            {/* Weekly Schedule Button */}
            <button
              onClick={onOpenWeekly}
              title="View Complete Week Schedule"
              className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <span>📅</span>
              <span className="hidden lg:inline">Week Grid</span>
            </button>

            {/* Instructions Button */}
            <button
              onClick={onOpenInstructions}
              title="Mess Service Instructions (13 Rules)"
              className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <span>📋</span>
              <span className="hidden lg:inline">Rules & Portions</span>
            </button>

            {/* Upload Excel Button */}
            <button
              onClick={onOpenUpload}
              title="Upload / Replace mess.xlsx"
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 font-bold shadow-md shadow-orange-500/20 transition flex items-center gap-1.5 text-xs"
            >
              <span>📤</span>
              <span className="hidden sm:inline">Upload Excel</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

