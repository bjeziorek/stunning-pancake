export function sortColumn<Data>(
  columnId: keyof Data | null,
  direction: "asc" | "desc"
) {
  return (a: Data, b: Data) => {
    if (!columnId) return 0;

    const dir = direction === "asc" ? 1 : -1;

    const valA = a[columnId];
    const valB = b[columnId];

    if (typeof valA === "number" && typeof valB === "number") {
      return (valA - valB) * dir;
    }

    return String(valA).localeCompare(String(valB)) * dir;
  };
}
