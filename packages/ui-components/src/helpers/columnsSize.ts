export const calculateLayoutColumns = width => {
  if (width > 1200) return { columns: { facets: 2, products: 10 } };
  if (width > 1500) return { columns: { facets: 1, products: 11 } };
  return;
};
