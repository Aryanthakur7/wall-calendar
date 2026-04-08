import { DAYS, HOLIDAYS } from "../constants/data";
import { getDaysInMonth, getFirstDayOfMonth, dateKey, isBetween, getTodayKey } from "../utils/dateUtils";

export default function CalendarGrid({
  viewMonth, viewYear,
  startDate, endDate, effectiveEnd, selecting,
  handleDayClick, handleDayHover,
  darkMode, accent, animating, animDir,
}) {
  const todayKey = getTodayKey();
  const borderColor = darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const textPrimary = darkMode ? "#eee" : "#1a1a1a";
  const textSecondary = darkMode ? "#777" : "#aaa";

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      {/* Day headers */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
        padding: "12px 18px 2px", gap: 2,
      }}>
        {DAYS.map((d, i) => (
          <div key={d} style={{
            textAlign: "center", fontSize: 10, fontWeight: 600,
            fontFamily: "sans-serif", letterSpacing: 0.4, paddingBottom: 5,
            color: i === 0 ? "#e74c3c" : i === 6 ? accent : textSecondary,
          }}>
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
        padding: "0 18px 12px", gap: 2,
        opacity: animating ? 0 : 1,
        transform: animating ? `translateX(${animDir === "left" ? "-18px" : "18px"})` : "translateX(0)",
        transition: "opacity 0.25s, transform 0.25s",
      }}>
        {cells.map((d, i) => {
          if (!d) return <div key={`empty-${i}`} />;

          const key = dateKey(viewYear, viewMonth, d);
          const isToday = key === todayKey;
          const isStart = key === startDate;
          const isEnd = key === endDate;
          const inRange = isBetween(key, startDate, effectiveEnd);
          const isSelected = isStart || isEnd;
          const isSunday = (firstDay + d - 1) % 7 === 0;
          const isSat = (firstDay + d - 1) % 7 === 6;
          const holiday = HOLIDAYS[`${viewMonth + 1}-${d}`];

          let cellBg = "transparent";
          let cellRadius = "50%";
          if (isStart && effectiveEnd && key !== effectiveEnd) {
            cellBg = `${accent}20`; cellRadius = "50% 0 0 50%";
          } else if (isEnd && startDate && key !== startDate) {
            cellBg = `${accent}20`; cellRadius = "0 50% 50% 0";
          } else if (inRange && !isSelected) {
            cellBg = `${accent}18`; cellRadius = "0";
          }

          return (
            <div
              key={key}
              onClick={() => handleDayClick(key)}
              onMouseEnter={() => handleDayHover(key)}
              title={holiday || undefined}
              style={{
                position: "relative", aspectRatio: "1",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: cellBg, borderRadius: cellRadius,
                cursor: "pointer", transition: "all 0.15s", userSelect: "none",
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "sans-serif", fontSize: 12,
                fontWeight: isSelected || isToday ? 700 : 400,
                background: isSelected ? accent : isToday ? `${accent}25` : "transparent",
                border: isToday && !isSelected ? `2px solid ${accent}` : "none",
                color: isSelected ? "#fff" : isSunday ? "#e74c3c" : isSat ? accent : textPrimary,
                transition: "all 0.15s",
              }}>
                {d}
              </div>

              {/* Holiday dot */}
              {holiday && (
                <div style={{
                  position: "absolute", bottom: 2,
                  left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%", background: "#e74c3c",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
