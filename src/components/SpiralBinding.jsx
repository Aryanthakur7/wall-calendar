export default function SpiralBinding({ darkMode }) {
  return (
    <div style={{
      height: 26,
      background: darkMode ? "#2a2a2a" : "#ddd8d0",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      flexShrink: 0,
    }}>
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} style={{
          width: 13,
          height: 13,
          borderRadius: "50%",
          border: `2px solid ${darkMode ? "#555" : "#bbb"}`,
          background: darkMode ? "#333" : "#ccc",
        }} />
      ))}
    </div>
  );
}
