import React, { useState, useRef } from 'react';

export default function UploadModal({ isOpen, onClose, onFileLoaded, onResetDefault }) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = async (file) => {
    if (!file) return;
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      setError('Please select a valid Excel spreadsheet (.xlsx)');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const arrayBuffer = await file.arrayBuffer();
      await onFileLoaded(arrayBuffer, file.name);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Failed to parse the Excel file. Please ensure it follows the mess menu layout.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-xl border border-orange-500/30">
              📊
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Update Mess Menu Spreadsheet
              </h2>
              <p className="text-xs text-slate-400">
                Upload your updated mess.xlsx file to parse dynamically
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

        {/* Drag & Drop Area */}
        <div className="p-6">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-orange-500 bg-orange-500/10 scale-[1.01]'
                : 'border-slate-700 hover:border-slate-500 bg-slate-800/40'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              className="hidden"
              onChange={handleChange}
            />
            <div className="text-4xl mb-3">📁</div>
            <p className="text-sm font-semibold text-slate-200 mb-1">
              Drop your <span className="text-orange-400">mess.xlsx</span> file here, or click to browse
            </p>
            <p className="text-xs text-slate-500">
              Supports standard Excel formats (.xlsx, .xls)
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-medium">
              ⚠️ {error}
            </div>
          )}

          {loading && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-orange-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
              Parsing spreadsheet workbook...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              onResetDefault();
              onClose();
            }}
            className="text-xs text-slate-400 hover:text-amber-400 font-medium transition flex items-center gap-1"
          >
            <span>🔄</span> Reset to Default mess.xlsx
          </button>
          <a
            href="./mess.xlsx"
            download="mess.xlsx"
            className="text-xs text-slate-400 hover:text-white font-medium transition flex items-center gap-1"
          >
            <span>⬇️</span> Download Current Excel
          </a>
        </div>
      </div>
    </div>
  );
}

