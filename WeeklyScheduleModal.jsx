import React from 'react';

export default function WeeklyScheduleModal({ isOpen, onClose, dayGroups = [], sheetName = '' }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl border border-indigo-500/30">
              📅
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Full Weekly Schedule Overview
              </h2>
              <p className="text-xs text-slate-400">
                Complete meal rotation grid for {sheetName.replace('_', ' ')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 flex items-center justify-center text-sm transition"
          >
            ✕
          </button>
        </div>

        {/* Table Content */}
        <div className="p-5 overflow-auto flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800/60 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="p-3 w-40">Day Group</th>
                  <th className="p-3">🥞 Breakfast</th>
                  <th className="p-3">🍛 Lunch</th>
                  <th className="p-3">☕ Snacks</th>
                  <th className="p-3">🍲 Dinner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {dayGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-slate-800/30 transition">
                    <td className="p-3 font-bold text-amber-400 align-top bg-slate-900/40">
                      <div>{group.groupName}</div>
                      <div className="text-[10px] text-slate-500 font-normal mt-1">
                        {group.days.join(', ')}
                      </div>
                    </td>
                    <td className="p-3 align-top whitespace-pre-line text-slate-200 leading-relaxed max-w-xs">
                      {group.meals.Breakfast.raw || '—'}
                    </td>
                    <td className="p-3 align-top whitespace-pre-line text-slate-200 leading-relaxed max-w-xs">
                      {group.meals.Lunch.raw || '—'}
                    </td>
                    <td className="p-3 align-top whitespace-pre-line text-slate-200 leading-relaxed max-w-xs">
                      {group.meals.Snacks.raw || '—'}
                    </td>
                    <td className="p-3 align-top whitespace-pre-line text-slate-200 leading-relaxed max-w-xs">
                      {group.meals.Dinner.raw || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

