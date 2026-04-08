import { useCalendar } from "../hooks/useCalendar";
import { MONTH_THEMES } from "../constants/data";
import SpiralBinding from "./SpiralBinding";
import HeroPanel from "./HeroPanel";
import Navigation from "./Navigation";
import CalendarGrid from "./CalendarGrid";
import { HolidayTags, RangeBar } from "./CalendarExtras";

export default function InteractiveCalendar() {
  const cal = useCalendar();
  const theme = MONTH_THEMES[cal.viewMonth];

  const bg = cal.darkMode ? "#111" : "#f0ede6";
  const cardBg = cal.darkMode ? "#1c1c1e" : "#ffffff";

  return (
    <div style={{
      minHeight: "100vh",
      background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "Georgia, serif",
      transition: "background 0.4s",
    }}>
      {/* Theme toggle */}
      <button
        onClick={() => cal.setDarkMode((d) => !d)}
        title="Toggle dark mode"
        style={{
          position: "fixed", top: 14, right: 14,
          width: 38, height: 38, borderRadius: "50%",
          border: `1px solid ${cal.darkMode ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
          background: cal.darkMode ? "#222" : "#fff",
          cursor: "pointer", fontSize: 16, zIndex: 99,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.12)",
          color: cal.darkMode ? "#eee" : "#333",
        }}
      >
        {cal.darkMode ? "☀" : "☽"}
      </button>

      {/* Calendar card */}
      <div style={{
        width: "100%", maxWidth: 900,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: cardBg,
        borderRadius: 18,
        overflow: "hidden",
        boxShadow: cal.darkMode
          ? "0 24px 80px rgba(0,0,0,0.6)"
          : "0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05)",
      }} className="calendar-root">

        {/* LEFT — Hero image + notes */}
        <HeroPanel
          viewMonth={cal.viewMonth}
          viewYear={cal.viewYear}
          darkMode={cal.darkMode}
          noteInput={cal.noteInput}
          setNoteInput={cal.setNoteInput}
          noteTab={cal.noteTab}
          setNoteTab={cal.setNoteTab}
          saveNote={cal.saveNote}
          clearNote={cal.clearNote}
          selectionLabel={cal.selectionLabel}
          startDate={cal.startDate}
          endDate={cal.endDate}
        />

        {/* RIGHT — Calendar grid */}
        <div style={{ display: "flex", flexDirection: "column", background: cardBg }}>
          <SpiralBinding darkMode={cal.darkMode} />

          <Navigation
            viewMonth={cal.viewMonth}
            viewYear={cal.viewYear}
            setViewYear={cal.setViewYear}
            darkMode={cal.darkMode}
            accent={theme.accent}
            showYearPicker={cal.showYearPicker}
            setShowYearPicker={cal.setShowYearPicker}
            navigate={cal.navigate}
            today={cal.today}
          />

          <RangeBar
            rangeLabel={cal.rangeLabel}
            accent={theme.accent}
            light={theme.light}
            primary={theme.primary}
            onClear={cal.clearRange}
            selecting={cal.selecting}
          />

          <CalendarGrid
            viewMonth={cal.viewMonth}
            viewYear={cal.viewYear}
            startDate={cal.startDate}
            endDate={cal.endDate}
            effectiveEnd={cal.effectiveEnd}
            selecting={cal.selecting}
            handleDayClick={cal.handleDayClick}
            handleDayHover={cal.handleDayHover}
            darkMode={cal.darkMode}
            accent={theme.accent}
            animating={cal.animating}
            animDir={cal.animDir}
          />

          <HolidayTags viewMonth={cal.viewMonth} darkMode={cal.darkMode} />

          {/* Footer */}
          <div style={{ padding: "0 18px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <button
              onClick={cal.goToday}
              style={{
                fontSize: 11, fontFamily: "sans-serif",
                padding: "5px 18px", borderRadius: 20,
                border: `1px solid ${theme.accent}`,
                background: "none", color: theme.accent,
                cursor: "pointer", transition: "all 0.2s",
              }}
            >
              Today
            </button>
            <span style={{
              fontSize: 10, fontFamily: "sans-serif",
              color: cal.darkMode ? "#555" : "#ccc", fontStyle: "italic",
            }}>
              Click to start · Click again to end
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .calendar-root {
            grid-template-columns: 1fr !important;
          }
        }
        button:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
