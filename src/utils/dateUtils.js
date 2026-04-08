import { MONTHS } from "../constants/data";

export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

export function dateKey(year, month, day) {
  return `${year}-${month + 1}-${day}`;
}

export function isBetween(dateStr, start, end) {
  if (!start || !end) return false;
  const parse = (s) => s.split("-").map(Number);
  const [sy, sm, sd] = parse(start);
  const [ey, em, ed] = parse(end);
  const [dy, dm, dd] = parse(dateStr);
  const d1 = new Date(sy, sm - 1, sd);
  const d2 = new Date(ey, em - 1, ed);
  const dc = new Date(dy, dm - 1, dd);
  if (d1 > d2) return dc >= d2 && dc <= d1;
  return dc >= d1 && dc <= d2;
}

export function getDayDiff(start, end) {
  if (!start || !end) return 0;
  const parse = (s) => s.split("-").map(Number);
  const [sy, sm, sd] = parse(start);
  const [ey, em, ed] = parse(end);
  return Math.abs(Math.round((new Date(ey, em - 1, ed) - new Date(sy, sm - 1, sd)) / 86400000)) + 1;
}

export function formatDisplayDate(key) {
  if (!key) return "";
  const [y, m, d] = key.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
}

export function getTodayKey() {
  const t = new Date();
  return dateKey(t.getFullYear(), t.getMonth(), t.getDate());
}
