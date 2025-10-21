export function isNotEmptyString(string) {
  return string !== '';
}

export function splitWithSeparator(string) {
  return string.split(',');
}

export function isNumber(str) {
  const s = String(str).trim();
  return /^[-+]?\d+$/.test(s);
}
