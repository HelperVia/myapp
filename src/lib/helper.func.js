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
    deepPurple[500],
    deepOrange[500],
    lightGreen[500],
    red[800],
    blue[500],
  ];
  const hashStr = uuid.replace(/-/g, "").substring(0, 8);
  const hash = parseInt(hashStr, 16);
  const index = hash % colors.length;
  return colors[index];
};
