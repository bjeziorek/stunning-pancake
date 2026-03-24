import { useState } from "react";

export function usePagination(sortedData){
 
    const [page, setPage] = useState(1);
     const [pageSize, setPageSize] = useState(10);

   const total = sortedData.length;
    const totalPages = Math.ceil(total / pageSize);

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginated = sortedData.slice(start, end);

return{
    paginated, 
    page, 
    setPage, 
    totalPages, 
    pageSize,
    setPageSize
}

}