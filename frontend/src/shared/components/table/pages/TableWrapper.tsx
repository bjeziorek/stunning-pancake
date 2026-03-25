
import { Button, Card, DropdownMenu,Table } from "@radix-ui/themes";
import { t } from "i18next";

import { useState } from "react";

import type { Model } from "@/modules/models/types/Models";
import { defaultFilters } from "@/modules/models/mock/modelsDB";
import { useSort } from "../hooks/useSort";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { useColumns } from "../hooks/useColumns";
import { SimpleSearch } from "../components/SimpleSearch";
import { Filters } from "../components/Filters";
import { TableMenu } from "../components/TableMenu";
import { TableFull } from "../components/table/TableFull";



interface TableWrapperProps {
    columns: any,
    data: any,
    filters: any
}

export default function TableWrapper(props: TableWrapperProps) {

    // PROPS
    const { columns: propCols, data: propData, filters: propFilters } = props;

    // STATES
    const [models, setModels] = useState(propData)
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);


    // HOOKS
    const { filtered, filters, setFilters,
        handleReset,
        isPending,
        startTransition } = useFilter(models, search, propFilters, defaultFilters);
    const { sortedData, sort, setSort, toggleSort } = useSort(filtered)
    const { paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize } = usePagination(sortedData)
    const { toggleColumn,
        columns,
        setColumns,
        handleDrop,
        dragged,
        setDragged } = useColumns(propCols)

    return (
        <>
            <Card>
               

                <SimpleSearch search={search} setSearch={setSearch}></SimpleSearch>
                <Filters open={open} setOpen={setOpen} isPending={isPending} filters={filters} setFilters={setFilters} handleReset={handleReset} ></Filters>
            </Card>


            <Card className="mt-4">
                <TableMenu page={page} setPage={setPage} totalPages={totalPages} setPageSize={setPageSize} pageSize={pageSize} columns={columns} toggleColumn={toggleColumn}></TableMenu>
              

              <TableFull columns={columns} setDragged={setDragged} handleDrop={handleDrop} toggleSort={toggleSort} sort={sort} paginated={paginated}></TableFull>
            </Card>
        </>
    );
}
