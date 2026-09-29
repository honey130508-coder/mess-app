import React from 'react';

// Diet badge indicator
function DietBadge({ diet }) {
  if (diet === 'non-veg') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
        <span className="w-2 h-2 rounded-sm bg-rose-500"></span>
        Non-Veg
      </span>
    );
  }
  if (diet === 'egg') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        Egg
      </span>
    );
  }
  if (diet === 'beverage') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
        <span>☕</span>
        Beverage
      </span>
    );
  }
  if (diet === 'sweet') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/30">
        <span>🍬</span>
        Sweet / Dessert
      </span>
    );
  }
  if (diet === 'soup') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-teal-500/10 text-teal-400 border border-teal-500/30">
        <span>🍲</span>
        Soup
      </span>
    );
  }
  // Pure Veg
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      Veg
    </span>
  );
}

// Rotation badge indicator
function RotationBadge({ rotation }) {
  if (rotation === 'week1_3') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
        <span>🔄</span> Week 1 & 3
      </span>
    );
  }
  if (rotation === 'week2_4') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/40">
        <span>🔄</span> Week 2 & 4
      </span>
    );
  }
  if (rotation === 'alt_weeks') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/40">
        <span>🔄</span> Alternate Weeks
      </span>
    );
  }
  return null;
}

export default function MenuCard({
  mealName,
  mealData,
  searchQuery = '',
  selectedRotation = 'all',
  selectedDiet = 'all'
}) {
  if (!mealData || !mealData.items) {
    return (
      <div className="bg-slate-900/60 rounded-2xl p-6 border border-slate-800 text-center text-slate-500">
        No menu items available for {mealName}.
      </div>
    );
  }

  // Filter items
  const filteredItems = mealData.items.filter((item) => {
    // Search query filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!item.text.toLowerCase().includes(q)) return false;
    }
    // Rotation filter
    if (selectedRotation !== 'all' && item.rotation !== 'all') {
      if (item.rotation !== selectedRotation) return false;
    }
    // Diet filter
    if (selectedDiet !== 'all') {
      if (selectedDiet === 'veg' && item.diet !== 'veg') return false;
      if (selectedDiet === 'non-veg' && item.diet !== 'non-veg') return false;
      if (selectedDiet === 'egg' && item.diet !== 'egg') return false;
      if (selectedDiet === 'beverage' && item.diet !== 'beverage') return false;
      if (selectedDiet === 'sweet' && item.diet !== 'sweet') return false;
    }
    return true;
  });

  const mealConfig = {
    Breakfast: {
      gradient: 'from-amber-500/20 to-orange-500/5',
      accentColor: 'text-amber-400',
      tagBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: '🥞',
      time: '7:30 AM – 9:30 AM'
    },
    Lunch: {
      gradient: 'from-emerald-500/20 to-teal-500/5',
      accentColor: 'text-emerald-400',
      tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      icon: '🍛',
      time: '12:00 PM – 2:30 PM'
    },
    Snacks: {
      gradient: 'from-purple-500/20 to-indigo-500/5',
      accentColor: 'text-purple-400',
      tagBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      icon: '☕',
      time: '4:30 PM – 5:45 PM'
    },
    Dinner: {
      gradient: 'from-blue-500/20 to-cyan-500/5',
      accentColor: 'text-blue-400',
      tagBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: '🍲',
      time: '7:30 PM – 9:30 PM'
    }
  }[mealName] || {
    gradient: 'from-slate-800 to-slate-900',
    accentColor: 'text-orange-400',
    tagBg: 'bg-slate-800 text-slate-300 border-slate-700',
    icon: '🍽️',
    time: 'Standard Cafeteria Hours'
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-full transition-all duration-300 hover:border-slate-700">
      {/* Card Header */}
      <div className={`p-5 bg-gradient-to-r ${mealConfig.gradient} border-b border-slate-800/80 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xl shadow-inner">
            {mealConfig.icon}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              {mealName}
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${mealConfig.tagBg}`}>
                {filteredItems.length} items
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Service Hours: {mealConfig.time}
            </p>
          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4 sm:p-5 flex-1 divide-y divide-slate-800/60">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center">
            <span className="text-3xl block mb-2">🔍</span>
            <p className="text-slate-400 text-sm">No items match your active filters.</p>
            <p className="text-slate-600 text-xs mt-1">Try resetting search or dietary filters.</p>
          </div>
        ) : (
          filteredItems.map((item, index) => {
            // Check if item text has alternative options (e.g. Set Dosa / Idli or Chicken Biryani / Paneer Biryani)
            const hasAlternates = item.text.includes('/') && !item.text.includes('(karam is made');
            const parts = hasAlternates ? item.text.split('/') : [item.text];

            return (
              <div
                key={index}
                className="py-3.5 first:pt-1 last:pb-1 group hover:bg-slate-800/30 px-3 rounded-xl transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  {/* Left Dish Details */}
                  <div className="flex-1 pr-2">
                    {hasAlternates && parts.length > 1 ? (
                      <div>
                        <span className="text-xs uppercase tracking-wider font-semibold text-amber-400/90 block mb-1">
                          Options / Alternates:
                        </span>
                        <div className="space-y-1">
                          {parts.map((p, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-sm text-slate-200">
                              <span className="text-xs text-orange-400">✦</span>
                              <span>{p.trim()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-slate-100 group-hover:text-white transition leading-relaxed">
                        {item.text}
                      </p>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-1.5 flex-shrink-0 self-start sm:self-center mt-1 sm:mt-0">
                    <RotationBadge rotation={item.rotation} />
                    <DietBadge diet={item.diet} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Card Footer: Mess Kitchen Note */}
      <div className="px-5 py-3 bg-slate-950/40 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <span>🌿</span> 100% Quality Atta & Sona Masuri Rice
        </span>
        <span className="text-slate-400">Unlimited Refills</span>
      </div>
    </div>
  );
}

