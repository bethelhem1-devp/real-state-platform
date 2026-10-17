export function formatPrice(price, status) {
  const formatted = new Intl.NumberFormat("en-US").format(price);
  return status === "rent"
    ? `ETB ${formatted} / month`
    : `ETB ${formatted}`;
}