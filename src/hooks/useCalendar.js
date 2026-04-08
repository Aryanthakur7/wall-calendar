import { useState, useEffect, useCallback } from "react";
import { getDayDiff, formatDisplayDate } from "../utils/dateUtils";
import { MONTHS } from "../constants/data";

export function useCalendar() {
  const today = new Date();

  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate]     = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [selecting, setSelecting] = useState(false);
  const [notes, setNotes]         = useState({});
  const [noteInput, setNoteInput] = useState("");
  const [noteTab, setNoteTab]     = useState("month");
  const [animating, setAnimating] = useState(false);
  const [animDir, setAnimDir]     = useState("left");
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [darkMode, setDarkMode]   = useState(false);

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wall_cal_notes");
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {}
  }, []);

  // Persist notes to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("wall_cal_notes", JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  // Compute the active note key based on tab + selection
  const noteKey = useCallback(() => {
    if (noteTab === "sel") {
      if (startDate && endDate) return `range-${startDate}-${endDate}`;
      if (startDate) return `day-${startDate}`;
    }
    return `month-${viewYear}-${viewMonth}`;
  }, [noteTab, startDate, endDate, viewYear, viewMonth]);

  // Sync textarea whenever the key changes
  useEffect(() => {
    setNoteInput(notes[noteKey()] || "");
  }, [noteKey, notes]);

  const saveNote = useCallback((value) => {
    const k = noteKey();
    setNotes((prev) => ({ ...prev, [k]: value }));
  }, [noteKey]);

  const clearNote = useCallback(() => {
    const k = noteKey();
    setNotes((prev) => ({ ...prev, [k]: "" }));
    setNoteInput("");
  }, [noteKey]);

  const navigate = useCallback((dir) => {
    if (animating) return;
    setAnimDir(dir > 0 ? "left" : "right");
    setAnimating(true);
    setTimeout(() => {
      setViewMonth((m) => {
        let nm = m + dir;
        if (nm > 11) { nm = 0; setViewYear((y) => y + 1); }
        else if (nm < 0) { nm = 11; setViewYear((y) => y - 1); }
        return nm;
      });
      setAnimating(false);
    }, 260);
  }, [animating]);

  const goToday = useCallback(() => {
    setViewMonth(today.getMonth());
    setViewYear(today.getFullYear());
  }, []);

  const handleDayClick = useCallback((key) => {
    if (!selecting) {
      setStartDate(key);
      setEndDate(null);
      setSelecting(true);
    } else {
      if (key === startDate) { setSelecting(false); return; }
      setEndDate(key);
      setSelecting(false);
    }
  }, [selecting, startDate]);

  const handleDayHover = useCallback((key) => {
    if (selecting) setHoverDate(key);
  }, [selecting]);

  const clearRange = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setSelecting(false);
    setHoverDate(null);
  }, []);

  const effectiveEnd = selecting ? hoverDate : endDate;

  const rangeLabel = (() => {
    if (!startDate) return null;
    if (selecting) return "Selecting… click end date";
    if (endDate) return `${getDayDiff(startDate, endDate)} days selected`;
    return `Start: ${formatDisplayDate(startDate)}`;
  })();

  const selectionLabel = (() => {
    if (!startDate) return null;
    if (endDate) return `${formatDisplayDate(startDate)} → ${formatDisplayDate(endDate)} (${getDayDiff(startDate, endDate)} days)`;
    return formatDisplayDate(startDate);
  })();

  return {
    // View state
    viewYear, setViewYear,
    viewMonth, setViewMonth,
    darkMode, setDarkMode,
    animating, animDir,
    showYearPicker, setShowYearPicker,
    today,
    // Selection state
    startDate, endDate, effectiveEnd,
    selecting, hoverDate,
    // Notes state
    noteInput, setNoteInput,
    noteTab, setNoteTab,
    currentNote: notes[noteKey()] || "",
    // Actions
    navigate, goToday,
    handleDayClick, handleDayHover, clearRange,
    saveNote, clearNote,
    // Labels
    rangeLabel, selectionLabel,
  };
}
