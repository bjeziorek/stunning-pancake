import { Button, DropdownMenu, Flex, Select, Text } from "@radix-ui/themes";
import { t } from "i18next";
import type { TablePaginationPage, TablePaginationPageSize, TablePaginationSetPage, TablePaginationSetPageSize, TablePaginationTotalPages } from "../types/pagination";
import type { TableColumnsColumns, TableColumnsToggleColumn } from "../types/columns";

interface TableMenuProps<T> {
    page: TablePaginationPage,
    setPage: TablePaginationSetPage,
    totalPages: TablePaginationTotalPages,
    setPageSize: TablePaginationSetPageSize,
    pageSize: TablePaginationPageSize,
    columns: TableColumnsColumns<T>,
    toggleColumn: TableColumnsToggleColumn
}

export function TableMenu<T>(props: TableMenuProps<T>) {
    const {
        page,
        setPage,
        totalPages,
        setPageSize,
        pageSize,
        columns,
        toggleColumn
    } = props;

    return (
        <Flex gap="3" align="center" mt="4">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft">{t("models.columns")}</Button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                    {columns.map(col => (
                        <DropdownMenu.CheckboxItem
                            key={col.id}
                            checked={col.visible}
                            onCheckedChange={() => toggleColumn(col.id)}
                        >
                            {col.label}
                        </DropdownMenu.CheckboxItem>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Button
                variant="soft"
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
            >
                Poprzednia
            </Button>
            <Text>
                Strona {page} z {totalPages}
            </Text>
            <Button
                variant="soft"
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
            >
                Następna
            </Button>
            <Select.Root
                value={String(pageSize)}
                onValueChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                }}
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value="4">4</Select.Item>
                    <Select.Item value="10">10</Select.Item>
                    <Select.Item value="20">20</Select.Item>
                    <Select.Item value="50">50</Select.Item>
                </Select.Content>
            </Select.Root>
        </Flex>

    )
}