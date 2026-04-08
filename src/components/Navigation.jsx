import { MONTHS } from "../constants/data";

export default function Navigation({
  viewMonth, viewYear, setViewYear,
  darkMode, accent,
  showYearPicker, setShowYearPicker,
  navigate,
  today,
}) {
  const borderColor = darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const textPrimary = darkMode ? "#eee" : "#1a1a1a";
  const textSecondary = darkMode ? "#777" : "#999";

  const baseYear = today.getFullYear() - 4;

  return (
    <>
      <div style={{
        display: "flex", alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 22px 6px",
      }}>
        <button onClick={() => navigate(-1)} style={{
          width: 34, height: 34, borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          background: "none", cursor: "pointer",
          fontSize: 18, color: textPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          ‹
        </button>

        <div style={{ textAlign: "center" }}>
          <div
            onClick={() => setShowYearPicker((p) => !p)}
            style={{ fontSize: 19, fontWeight: 700, color: textPrimary, cursor: "pointer" }}
          >
            {MONTHS[viewMonth]}
          </div>
          <div style={{ fontSize: 12, color: textSecondary, fontFamily: "sans-serif" }}>
            {viewYear}
          </div>
        </div>

        <button onClick={() => navigate(1)} style={{
          width: 34, height: 34, borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          background: "none", cursor: "pointer",
          fontSize: 18, color: textPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all 0.2s",
        }}>
          ›
        </button>
      </div>

      {showYearPicker && (
        <div style={{
          margin: "0 18px",
          background: darkMode ? "#1a1a1c" : "#f7f5f0",
          borderRadius: 10, padding: 10,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5,
          border: `1px solid ${borderColor}`,
        }}>
          {Array.from({ length: 12 }, (_, i) => baseYear + i).map((y) => (
            <button key={y} onClick={() => { setViewYear(y); setShowYearPicker(false); }} style={{
              padding: "4px 0", borderRadius: 6,
              border: "none",
              background: y === viewYear ? accent : "transparent",
              color: y === viewYear ? "#fff" : textPrimary,
              cursor: "pointer", fontFamily: "sans-serif",
              fontSize: 11, fontWeight: y === viewYear ? 700 : 400,
              transition: "all 0.2s",
            }}>
              {y}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
