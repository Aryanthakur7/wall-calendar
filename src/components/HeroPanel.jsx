import { useState } from "react";
import { MONTHS, MONTH_THEMES } from "../constants/data";
import SpiralBinding from "./SpiralBinding";
import NotesPanel from "./NotesPanel";

export default function HeroPanel({
  viewMonth, viewYear, darkMode,
  noteInput, setNoteInput,
  noteTab, setNoteTab,
  saveNote, clearNote,
  selectionLabel,
  startDate, endDate,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const theme = MONTH_THEMES[viewMonth];

  return (
    <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
      <SpiralBinding darkMode={darkMode} />

      {/* Hero image area */}
      <div style={{ flex: 1, position: "relative", minHeight: 260, overflow: "hidden" }}>
        <img
          key={`${viewMonth}-${viewYear}`}
          src={theme.url}
          alt={MONTHS[viewMonth]}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            position: "absolute", inset: 0,
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Skeleton while loading */}
        {!imageLoaded && (
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${theme.light} 0%, ${theme.accent}33 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ color: theme.accent, fontSize: 28, opacity: 0.5 }}>◌</div>
          </div>
        )}

        {/* Month badge */}
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          background: theme.primary,
          padding: "14px 22px",
          clipPath: "polygon(14px 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, letterSpacing: 3, fontFamily: "sans-serif" }}>
            {viewYear}
          </div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700, letterSpacing: 2, fontFamily: "sans-serif" }}>
            {MONTHS[viewMonth].toUpperCase()}
          </div>
        </div>
      </div>

      <NotesPanel
        darkMode={darkMode}
        viewMonth={viewMonth}
        accent={theme.accent}
        light={theme.light}
        primary={theme.primary}
        noteInput={noteInput}
        setNoteInput={setNoteInput}
        noteTab={noteTab}
        setNoteTab={setNoteTab}
        saveNote={saveNote}
        clearNote={clearNote}
        selectionLabel={selectionLabel}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
