import React from 'react';

const WEEKDAYS = [
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
  { full: 'Sunday', short: 'Sun' }
];

export default function DaySelector({
  selectedDay,
  onSelectDay,
  dayGroups = [],
  todayName
}) {
  // Find which group matches a day
  const getGroupForDay = (dayName) => {
    return dayGroups.find(g =>
      g.days.some(d => d.toLowerCase() === dayName.toLowerCase())
    );
  };

  const activeGroup = getGroupForDay(selectedDay);
  const isToday = selectedDay.toLowerCase() === todayName.toLowerCase();

  return (
    <div className="w-full bg-slate-900/60 backdrop-blur-md rounded-2xl p-4 border border-slate-800 shadow-xl mb-6">
      {/* Top row: Status header */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Day Schedule
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1">
            <span>✨</span> Active: <strong className="text-white">{selectedDay}</strong>
            {activeGroup && (
              <span className="text-slate-400 font-normal">
                ({activeGroup.groupName})
              </span>
            )}
          </span>
        </div>

        {!isToday && (
          <button
            onClick={() => onSelectDay(todayName)}
            className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/40 transition flex items-center gap-1.5"
          >
            <span>🎯</span> Jump to Today ({todayName})
          </button>
        )}
      </div>

      {/* 7-day pill button strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {WEEKDAYS.map(({ full, short }) => {
          const isSelected = selectedDay.toLowerCase() === full.toLowerCase();
          const isDayToday = todayName.toLowerCase() === full.toLowerCase();
          const group = getGroupForDay(full);

          return (
            <button
              key={full}
              onClick={() => onSelectDay(full)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 border text-left ${
                isSelected
                  ? 'bg-gradient-to-b from-orange-500/20 via-slate-800 to-slate-900 border-orange-500 text-white shadow-lg shadow-orange-500/10 scale-[1.02] ring-1 ring-orange-500/50'
                  : 'bg-slate-800/60 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {/* Today Badge */}
              {isDayToday && (
                <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md ring-1 ring-orange-400 animate-pulse">
                  Today
                </span>
              )}

              <span className="text-xs font-semibold text-slate-400">
                {short}
              </span>
              <span className="text-sm font-bold tracking-tight">
                {full}
              </span>

              {/* Group indicator subtitle */}
              <span className="text-[10px] mt-1 text-slate-400 truncate max-w-full px-1 text-center font-medium">
                {group ? (
                  group.days.length > 1 ? (
                    <span className="text-slate-500">{group.days.map(d => d.slice(0, 3)).join('/')}</span>
                  ) : (
                    <span className="text-slate-500">Solo Menu</span>
                  )
                ) : (
                  'Menu'
                )}
              </span>

              {/* Selection bottom bar */}
              {isSelected && (
                <div className="w-8 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mt-2"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

