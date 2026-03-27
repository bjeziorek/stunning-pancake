
import { Card } from "@radix-ui/themes";
import { useState } from "react";
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



interface TableWrapperProps<Column,Data,Filters> {
    columns: TableColumnsColumns<Data>,
    data: TableData<Data>,
    filters: TableFiltersFilters<Filters>
}

export default function TableWrapper<Column,Data,Filters>(props: TableWrapperProps<Column,Data,Filters>) {

    // PROPS
    const { columns: propCols, data: propData, filters: propFilters } = props;

    // STATES
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);


    // HOOKS
    const { t } = useTranslation();
    const { filtered, filters, setFilters,
        handleReset,
        isPending } = useFilter<Data,Filters>(propData, search, propFilters, defaultFilters);
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

    return (
        <>
         {/* <h2 >table wrapper test</h2> */}
         <h2 className='sr-only'>table wrapper test</h2>
         <h2 className='sr-only'>{t("table.tablemenu")}</h2>
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
