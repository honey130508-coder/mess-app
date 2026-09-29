import React from 'react';

const MEALS = [
  {
    id: 'Breakfast',
    label: 'Breakfast',
    time: '7:30 AM – 9:30 AM',
    icon: '🥞',
    color: 'from-amber-500 to-orange-500',
    borderColor: 'border-amber-500',
    glowColor: 'shadow-amber-500/20'
  },
  {
    id: 'Lunch',
    label: 'Lunch',
    time: '12:00 PM – 2:30 PM',
    icon: '🍛',
    color: 'from-emerald-500 to-teal-500',
    borderColor: 'border-emerald-500',
    glowColor: 'shadow-emerald-500/20'
  },
  {
    id: 'Snacks',
    label: 'Evening Snacks',
    time: '4:30 PM – 5:45 PM',
    icon: '☕',
    color: 'from-purple-500 to-indigo-500',
    borderColor: 'border-purple-500',
    glowColor: 'shadow-purple-500/20'
  },
  {
    id: 'Dinner',
    label: 'Dinner',
    time: '7:30 PM – 9:30 PM',
    icon: '🍲',
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500',
    glowColor: 'shadow-blue-500/20'
  }
];

export default function MealTabs({
  activeMeal,
  onSelectMeal,
  viewMode,
  onToggleViewMode
}) {
  return (
    <div className="w-full mb-6">
      {/* Primary Breakfast & Lunch segmented toggle row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        {/* Toggle/Tabs container */}
        <div className="w-full sm:w-auto p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 backdrop-blur-md shadow-lg flex flex-wrap gap-1.5">
          {MEALS.map((meal) => {
            const isActive = activeMeal === meal.id && viewMode !== 'compare';
            return (
              <button
                key={meal.id}
                onClick={() => onSelectMeal(meal.id)}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 ${
                  isActive
                    ? `bg-gradient-to-r ${meal.color} text-slate-950 shadow-lg ${meal.glowColor} scale-[1.02]`
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span className="text-base">{meal.icon}</span>
                <span className="tracking-tight">{meal.label}</span>
                <span className={`text-[10px] hidden md:inline px-1.5 py-0.5 rounded-full font-mono font-medium ${
                  isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                }`}>
                  {meal.time.split('–')[0].trim()}
                </span>
              </button>
            );
          })}
        </div>

        {/* View Mode: Single vs Split Breakfast & Lunch Compare */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => onToggleViewMode('single')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'single'
                ? 'bg-orange-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>📄</span> Single Meal
          </button>
          <button
            onClick={() => onToggleViewMode('compare')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              viewMode === 'compare'
                ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
            title="View Breakfast & Lunch side-by-side"
          >
            <span>⚡</span> Breakfast vs Lunch
          </button>
        </div>
      </div>
    </div>
  );
}

