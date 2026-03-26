import { useState } from "react";
import type { TableData } from "../../types/data";
import { paginate } from "./utils/paginate";

export function usePagination<Data>(sortedData: TableData<Data>) {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const total = sortedData.length;
    const totalPages = Math.ceil(total / pageSize);

    const paginated = paginate(sortedData,page,pageSize);

    return {
        paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize
    }
}
