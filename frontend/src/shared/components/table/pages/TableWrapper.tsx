
import { Card } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSort } from "../hooks/useSort/useSort";
import { useFilter } from "../hooks/useFilter/useFilter";
import { usePagination } from "../hooks/usePagination/usePagination";
import { useColumns } from "../hooks/useColumns/useColumns";
import { SimpleSearch } from "../components/SimpleSearch";
import { Filters } from "../components/Filters";
import { TableMenu } from "../components/TableMenu";
import { TableFull } from "../components/table/TableFull";
import type { TableData } from "../types/data";
import type { TableFiltersFilters } from "../types/filters";
import type { TableColumnsColumns } from "../types/columns";
import { defaultFilters } from "@/modules/nn/pages/testMock";
import { useTranslation } from "react-i18next";
import { useDebouncedValue } from "../hooks/useDebouncedValue";



interface TableWrapperProps<Data extends { id: string | number; }, Filters> {
    columns: TableColumnsColumns<Data>,
    data: TableData<Data>,
    filters: TableFiltersFilters<Filters>
}

export default function TableWrapper<Data extends { id: string | number; }, Filters>(props: TableWrapperProps<Data, Filters>) {

    // PROPS
    const { columns: propCols, data: propData, filters: propFilters } = props;

    // STATES
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);


    // CONSTS
    const debouncedSearch = useDebouncedValue(search, 300);

    // HOOKS
    const { t } = useTranslation();
    const { filtered, filters, setFilters,
        handleReset,
        isPending } = useFilter<Data, Filters>(propData, debouncedSearch, propFilters, defaultFilters);
    const { sortedData, sort, toggleSort } = useSort(filtered)
    const { paginated,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize } = usePagination(sortedData)
    const { toggleColumn,
        columns,
        handleDrop,
        setDragged } = useColumns(propCols)

        useEffect(() => {
  console.log("search:", search);
  console.log("debounced:", debouncedSearch);
}, [search, debouncedSearch]);


    return (
        <>
            <h2 className='sr-only'>{t("table.tableMenu")}</h2>
            <Card>
                <SimpleSearch search={search} setSearch={setSearch}></SimpleSearch>
                {/* <Filters open={open} setOpen={setOpen} isPending={isPending} filters={filters} setFilters={setFilters} handleReset={handleReset} ></Filters> */}
            </Card>


            <Card className="mt-4">
                <TableMenu page={page} setPage={setPage} totalPages={totalPages} setPageSize={setPageSize} pageSize={pageSize} columns={columns} toggleColumn={toggleColumn}></TableMenu>


                <TableFull columns={columns} setDragged={setDragged} handleDrop={handleDrop} toggleSort={toggleSort} sort={sort} paginated={paginated}></TableFull>
            </Card>
        </>
    );
}
