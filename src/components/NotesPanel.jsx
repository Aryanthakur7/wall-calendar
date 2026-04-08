import { MONTHS } from "../constants/data";

export default function NotesPanel({
  darkMode, viewMonth, accent, light, primary,
  noteInput, setNoteInput,
  noteTab, setNoteTab,
  saveNote, clearNote,
  selectionLabel, startDate, endDate,
}) {
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textSecondary = darkMode ? "#777" : "#aaa";

  const handleChange = (e) => {
    setNoteInput(e.target.value);
    saveNote(e.target.value);
  };

  return (
    <div style={{
      padding: "16px 20px",
      borderTop: `1px solid ${borderColor}`,
      background: darkMode ? "#161618" : "#faf9f7",
      flexShrink: 0,
    }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: 11, fontFamily: "sans-serif", fontWeight: 600,
          color: textSecondary, letterSpacing: 1, textTransform: "uppercase",
        }}>
          Notes
        </span>
        <div style={{ flex: 1, height: "1px", background: borderColor }} />

        {["month", "sel"].map((t) => (
          <button key={t} onClick={() => setNoteTab(t)} style={{
            fontSize: 10, fontFamily: "sans-serif",
            padding: "2px 8px", borderRadius: 20, border: "1px solid",
            cursor: "pointer", transition: "all 0.2s",
            borderColor: noteTab === t ? accent : borderColor,
            background: noteTab === t ? accent : "transparent",
            color: noteTab === t ? "#fff" : textSecondary,
          }}>
            {t === "month" ? "Month" : "Selection"}
          </button>
        ))}
      </div>

      {/* Selection info chip */}
      {noteTab === "sel" && startDate && (
        <div style={{
          fontSize: 11, fontFamily: "sans-serif",
          color: primary, marginBottom: 8,
          padding: "4px 10px", background: light,
          borderRadius: 6, borderLeft: `3px solid ${accent}`,
        }}>
          {selectionLabel || "No selection yet"}
        </div>
      )}

      <textarea
        value={noteInput}
        onChange={handleChange}
        placeholder={`Add a note for ${noteTab === "month" ? MONTHS[viewMonth] : "your selection"}…`}
        style={{
          width: "100%", height: 72, resize: "none",
          border: `1px solid ${borderColor}`,
          borderRadius: 8, padding: "7px 9px",
          fontFamily: "Georgia, serif", fontSize: 13,
          color: darkMode ? "#eee" : "#333",
          background: darkMode ? "#1c1c1e" : "#fff",
          outline: "none", lineHeight: 1.6, boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}>
        <span style={{ fontSize: 10, fontFamily: "sans-serif", color: textSecondary }}>
          {noteInput.length} chars · auto-saved
        </span>
        <button onClick={clearNote} style={{
          fontSize: 10, fontFamily: "sans-serif",
          background: "none", border: "none",
          cursor: "pointer", color: textSecondary, padding: 0,
        }}>
          clear
        </button>
      </div>
    </div>
  );
}
