import { useCallback, useMemo, useState } from "react";

export function useSort(data){
      const [sort, setSort] = useState({
            column: null,
            direction: "asc",
        });
        

        const sortFn = useCallback((a, b) => {
  if (!sort.column) return 0;

  const col = sort.column;
  const dir = sort.direction === "asc" ? 1 : -1;

  const valA = a[col];
  const valB = b[col];

  if (typeof valA === "number" && typeof valB === "number") {
    return (valA - valB) * dir;
  }

  return String(valA).localeCompare(String(valB)) * dir;
}, [sort.column, sort.direction]);

    const sortedData = useMemo(()=>[...data].sort(sortFn),[data, sortFn]);

 const toggleSort = useCallback((column) => {
        setSort((prev) => {

            if (prev.column === column) {
                return {
                    column,
                    direction: prev.direction === "asc" ? "desc" : "asc",
                };
            }

            return {
                column,
                direction: "asc",
            };
        })},[]);

    return {
        sortedData,
        sort,
        setSort,
        toggleSort
    }
}