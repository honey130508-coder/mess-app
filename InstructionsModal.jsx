import React from 'react';

export default function InstructionsModal({ isOpen, onClose, instructions = [] }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-amber-500/10 via-slate-900 to-orange-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl border border-amber-500/30">
              📋
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                MESS SERVICE INSTRUCTIONS
              </h2>
              <p className="text-xs text-slate-400">
                Official caterer guidelines, portion sizes, and service standards
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3.5 divide-y divide-slate-800">
          {instructions.length === 0 ? (
            <p className="text-slate-400 text-sm py-4 text-center">
              No instructions loaded.
            </p>
          ) : (
            instructions.map((item, idx) => {
              // Highlight key measurements (150 g, 75 g, 250 ml, etc.)
              return (
                <div key={idx} className="pt-3 first:pt-0 flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 text-amber-400 text-xs font-mono font-bold flex items-center justify-center border border-slate-700">
                    {idx + 1}
                  </span>
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {item.replace(/^\d+\.\s*/, '')}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            VIT-AP Mess Quality Assurance Standards
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-slate-950 font-bold text-xs transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}

