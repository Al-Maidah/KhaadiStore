export const DEFAULT_SIZES = ["XS", "S", "M", "L"];

export function parsePrice(str) {
  if (typeof str === "number") return str;
  return parseInt(String(str).replace(/[^0-9]/g, ""), 10) || 0;
}

export function formatPrice(amount) {
  return `PKR ${amount.toLocaleString()}`;
}
