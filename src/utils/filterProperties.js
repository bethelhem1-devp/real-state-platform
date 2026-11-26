export function filterProperties(list, filters, sort) {
  const { status, location, type, beds, minPrice, maxPrice, q } = filters;

  const result = list.filter((p) => {
    if (status && p.status !== status) return false;
    if (location && p.location !== location) return false;
    if (type && p.type !== type) return false;
    if (beds && p.bedrooms < Number(beds)) return false; // "3" means 3 or more
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;

    if (q) {
      const text = `${p.title} ${p.location} ${p.address} ${p.type}`.toLowerCase();
      if (!text.includes(q.toLowerCase())) return false;
    }
    return true;
  });

  // [...result] makes a copy, so we never change the original array
  switch (sort) {
    case "price-asc":
      return [...result].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...result].sort((a, b) => b.price - a.price);
    case "area-desc":
      return [...result].sort((a, b) => b.area - a.area);
    default:
      return result; // "featured" = original order
  }
}