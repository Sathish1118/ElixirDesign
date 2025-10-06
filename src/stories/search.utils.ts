export function filterData(data: any[], query: string): any[] {
    if (!query) return data;
  const q = query.toLowerCase();
  return data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(q)
    )
  );
}
