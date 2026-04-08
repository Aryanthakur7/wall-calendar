import { HOLIDAYS } from "../constants/data";

export function HolidayTags({ viewMonth, darkMode }) {
  const thisMonthHolidays = Object.entries(HOLIDAYS).filter(([k]) => {
    const [m] = k.split("-").map(Number);
    return m === viewMonth + 1;
  });

  if (thisMonthHolidays.length === 0) return null;

  return (
    <div style={{ padding: "0 18px 10px", display: "flex", flexWrap: "wrap", gap: 5 }}>
      {thisMonthHolidays.map(([k, name]) => {
        const [, d] = k.split("-").map(Number);
        return (
          <div key={k} style={{
            display: "flex", alignItems: "center", gap: 3,
            fontSize: 10, fontFamily: "sans-serif",
            color: darkMode ? "#888" : "#999",
            background: darkMode ? "#2a2a2a" : "#f0ede8",
            padding: "2px 7px", borderRadius: 20,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#e74c3c", flexShrink: 0 }} />
            {d} – {name}
          </div>
        );
      })}
    </div>
  );
}

export function RangeBar({ rangeLabel, accent, light, primary, onClear, selecting }) {
  if (!rangeLabel) return null;
  return (
    <div style={{
      margin: "6px 18px 0",
      padding: "7px 10px", borderRadius: 7,
      background: light, borderLeft: `3px solid ${accent}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontSize: 10, fontFamily: "sans-serif", color: primary }}>
        {rangeLabel}
      </span>
      {!selecting && (
        <button onClick={onClear} style={{
          fontSize: 10, fontFamily: "sans-serif",
          background: "none", border: "none",
          color: accent, cursor: "pointer", padding: 0,
        }}>
          clear ×
        </button>
      )}
    </div>
  );
}
