/**
 * EX: Convert 2.100.456 to 2M
 * @param str
 * @returns str
 */
export function convertNumStrToUnit(str: string) {
  if (!str) return "Unknown";
  const splitted = str.split(".");
  const numOfDot = splitted.length - 1;
  let unit = "";
  switch (numOfDot) {
    case 1:
      unit = "K";
      break;
    case 2:
      unit = "M";
      break;
    case 3:
      unit = "G";
      break;
    case 4:
      unit = "?";
      break;
  }
  return splitted[0] + unit;
}

/**
 * Get chapter num string from chapter name
 */
export function cptName2Num(name: string) {
  return name
    .replace(/\b[^\d\W]+\b/g, "")
    .replace(":", "")
    .replace(/^\s+|\s+$/g, "");
}
