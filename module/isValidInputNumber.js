export function isNotNegative(number) {
  /**
   * params: number: string
   */
  const digit = +number;
  return digit >= 0;
}

export function isNotZero(number) {
  /**
   * params: number: string
   */

  const digit = +number;
  return digit !== 0;
}

export function isNumber(str) {
  const s = String(str).trim();
  return /^[-+]?\d+$/.test(s);
}
