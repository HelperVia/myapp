import {
  blue,
  deepOrange,
  deepPurple,
  lightGreen,
  red,
} from "@mui/material/colors";

const TURKISH_UPPER_MAP = {
  i: "İ",
  ı: "I",
  ş: "Ş",
  ç: "Ç",
  ö: "Ö",
  ü: "Ü",
  ğ: "Ğ",
};

const TURKISH_LOWER_MAP = {
  İ: "i",
  I: "ı",
  Ş: "ş",
  Ç: "ç",
  Ö: "ö",
  Ü: "ü",
  Ğ: "ğ",
};

const toUpperTurkish = (char) => TURKISH_UPPER_MAP[char] || char.toUpperCase();
const toLowerTurkish = (char) => TURKISH_LOWER_MAP[char] || char.toLowerCase();

export const capitalizeWordsUnicode = (text) => {
  if (!text) return "";

  return text
    .split(" ")
    .map((word) => {
      if (!word) return "";
      const firstChar = toUpperTurkish(word[0]);
      const rest = word
        .slice(1)
        .split("")
        .map((c) => toLowerTurkish(c))
        .join("");
      return firstChar + rest;
    })
    .join(" ");
};

export const extractInitials = (text) => {
  if (!text) return "";
  return text
    .split(" ")
    .map((word, index) => (index < 2 ? toUpperTurkish(word[0]) : ""))
    .join("");
};

export const getColorFromUuid = (uuid) => {
  const colors = [
    "#374151",
    "#6b7280",
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#ef4444",
    "#f43f5e",
    "#f97316",
    "#f59e0b",
    "#ec4899",
    "#6366f1",
  ];
  const hashStr = uuid.replace(/-/g, "").substring(0, 8);
  const hash = parseInt(hashStr, 16);
  const index = hash % colors.length;
  return colors[index];
};
