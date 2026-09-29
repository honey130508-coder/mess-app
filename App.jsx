import React, { useState, useMemo } from 'react';
import defaultMenuData from './data/defaultMenu.json';
import { parseMessWorkbook, getDayGroupForDay } from './utils/excelParser';
import Navbar from './components/Navbar';
import DaySelector from './components/DaySelector';
import MealTabs from './components/MealTabs';
import MenuCard from './components/MenuCard';
import InstructionsModal from './components/InstructionsModal';
import UploadModal from './components/UploadModal';
import WeeklyScheduleModal from './components/WeeklyScheduleModal';

const DAYS_LIST = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function App() {
  // Current real day of week
  const todayIndex = new Date().getDay();
  const todayName = DAYS_LIST[todayIndex]; // e.g., 'Friday'

  // Application State
  const [menuData, setMenuData] = useState(defaultMenuData);
  const [selectedSheet, setSelectedSheet] = useState('Veg_Non-Veg');
  const [selectedDay, setSelectedDay] = useState(todayName);
  const [activeMeal, setActiveMeal] = useState('Breakfast');
  const [viewMode, setViewMode] = useState('single'); // 'single' or 'compare'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('all');
  const [selectedRotation, setSelectedRotation] = useState('all');

  // Modals
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);

  // Available sheets
  const sheetOptions = useMemo(() => {
    return Object.keys(menuData.menus || {});
  }, [menuData]);

  // Current sheet object
  const currentSheetData = useMemo(() => {
    if (!menuData.menus) return null;
    return menuData.menus[selectedSheet] || Object.values(menuData.menus)[0];
  }, [menuData, selectedSheet]);

  // Current day group matched
  const currentDayGroup = useMemo(() => {
    if (!currentSheetData || !currentSheetData.dayGroups) return null;
    return getDayGroupForDay(currentSheetData.dayGroups, selectedDay);
  }, [currentSheetData, selectedDay]);

  // Handle uploaded Excel file (SheetJS)
  const handleFileLoaded = async (arrayBuffer, fileName) => {
    if (window.XLSX) {
      const parsed = parseMessWorkbook(window.XLSX, arrayBuffer);
      if (parsed && Object.keys(parsed.menus).length > 0) {
        parsed.metadata.sourceFile = fileName;
        setMenuData(parsed);
        const firstSheet = Object.keys(parsed.menus)[0];
        setSelectedSheet(firstSheet);
        return;
      }
    }
    throw new Error('Could not parse Excel workbook');
  };

  const handleResetDefault = () => {
    setMenuData(defaultMenuData);
    setSelectedSheet('Veg_Non-Veg');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-slate-950">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navigation */}
      <Navbar
        selectedSheet={selectedSheet}
        onSelectSheet={setSelectedSheet}
        sheetOptions={sheetOptions}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenInstructions={() => setIsInstructionsOpen(true)}
        onOpenWeekly={() => setIsWeeklyOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 z-10">
        {/* Cafeteria Headline & Matched Day Banner */}
        <div className="mb-6 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-44 h-44 bg-gradient-to-br from-orange-500/20 to-amber-500/0 rounded-full blur-2xl"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-amber-300 border border-slate-700 mb-3">
                <span>📍</span>
                <span>{currentSheetData?.title || 'VIT-AP MESS MENU'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Today's Cafeteria Offerings
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-2xl">
                Serving curated regional breakfast, hearty lunch, hot evening snacks, and balanced dinner.
                Highlighted according to your schedule rotation group.
              </p>
            </div>

            {/* Current Matched Day Group Badge */}
            {currentDayGroup && (
              <div className="flex-shrink-0 bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 shadow-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-2xl">
                  {selectedDay === todayName ? '🌟' : '🗓️'}
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    {selectedDay === todayName ? "Today's Matched Group" : "Selected Group"}
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {currentDayGroup.groupName}
                  </div>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">
                    Covers: {currentDayGroup.days.join(', ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 7-Day Selector with Today Auto-Highlight */}
        <DaySelector
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          dayGroups={currentSheetData?.dayGroups || []}
          todayName={todayName}
        />

        {/* Search & Filter Toolbar */}
        <div className="mb-6 bg-slate-900/60 rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg backdrop-blur-md">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g., Biryani, Dosa, Paneer)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Dietary filter */}
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 text-xs">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'veg', label: '🥗 Veg' },
                { id: 'non-veg', label: '🍗 Non-Veg' },
                { id: 'egg', label: '🥚 Egg' },
                { id: 'beverage', label: '☕ Drinks' }
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    selectedDiet === diet.id
                      ? 'bg-orange-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>

            {/* Rotation filter */}
            <select
              value={selectedRotation}
              onChange={(e) => setSelectedRotation(e.target.value)}
              className="bg-slate-800/80 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Rotations</option>
              <option value="week1_3">Week 1 & 3 Only</option>
              <option value="week2_4">Week 2 & 4 Only</option>
              <option value="alt_weeks">Alt Weeks Only</option>
            </select>
          </div>
        </div>

        {/* Meal Tabs / Toggle (Breakfast & Lunch prominent) */}
        <MealTabs
          activeMeal={activeMeal}
          onSelectMeal={(meal) => {
            setActiveMeal(meal);
            setViewMode('single');
          }}
          viewMode={viewMode}
          onToggleViewMode={setViewMode}
        />

        {/* Menu Display Area */}
        {currentDayGroup ? (
          <div>
            {viewMode === 'compare' ? (
              /* Side-by-side compare layout: Breakfast & Lunch */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
                <MenuCard
                  mealName="Breakfast"
                  mealData={currentDayGroup.meals.Breakfast}
                  searchQuery={searchQuery}
                  selectedRotation={selectedRotation}
                  selectedDiet={selectedDiet}
                />
                <MenuCard
                  mealName="Lunch"
                  mealData={currentDayGroup.meals.Lunch}
                  searchQuery={searchQuery}
                  selectedRotation={selectedRotation}
                  selectedDiet={selectedDiet}
                />
              </div>
            ) : (
              /* Single meal full-width layout */
              <div className="max-w-4xl mx-auto animate-fadeIn">
                <MenuCard
                  mealName={activeMeal}
                  mealData={currentDayGroup.meals[activeMeal]}
                  searchQuery={searchQuery}
                  selectedRotation={selectedRotation}
                  selectedDiet={selectedDiet}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-900/60 rounded-2xl p-12 border border-slate-800 text-center text-slate-400">
            No schedule found for the selected day.
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>🍛</span>
            <span className="font-semibold text-slate-400">
              VIT-AP University Digital Cafeteria
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsInstructionsOpen(true)}
              className="text-amber-400 hover:underline"
            >
              Mess Service Instructions (13 Rules)
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={() => setIsWeeklyOpen(true)}
              className="text-indigo-400 hover:underline"
            >
              Full Weekly Schedule
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
        instructions={menuData.instructions || []}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onFileLoaded={handleFileLoaded}
        onResetDefault={handleResetDefault}
      />

      <WeeklyScheduleModal
        isOpen={isWeeklyOpen}
        onClose={() => setIsWeeklyOpen(false)}
        dayGroups={currentSheetData?.dayGroups || []}
        sheetName={selectedSheet}
      />
    </div>
  );
}

