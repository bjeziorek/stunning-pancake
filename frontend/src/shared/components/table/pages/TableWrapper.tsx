
import { Button, Card, DropdownMenu, Flex, Select, Spinner, Table, Text, TextField } from "@radix-ui/themes";
import { t } from "i18next";

import { useState } from "react";
import { Header } from "@radix-ui/themes/components/table";

import * as Collapsible from "@radix-ui/react-collapsible";
import type { Model } from "@/modules/models/types/Models";
import { defaultFilters } from "@/modules/models/mock/modelsDB";
import { useSort } from "../hooks/useSort";
import { useFilter } from "../hooks/useFilter";
import { usePagination } from "../hooks/usePagination";
import { useColumns } from "../hooks/useColumns";



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
                <Header>
                    <Text>{t("models.models")}</Text>
                </Header>
                <Flex justify="between" align="center" mb="4">
                    <TextField.Root
                        placeholder={t("models.searchSimplePlaceholder")}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: "300px" }}
                    />

                </Flex>
                <Collapsible.Root open={open} onOpenChange={setOpen}>
                    <Collapsible.Trigger>
                        <Button variant="ghost">{t("models.advancedFiltering")} {open ? "▲" : "▼"}</Button>
                    </Collapsible.Trigger>

                    {open && (
                        <Collapsible.Content>

                            <div style={{ position: "relative" }}>
                                {isPending && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(33, 33, 33, 0.6)",
                                            backdropFilter: "blur(3px)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            zIndex: 10,
                                            borderRadius: "var(--radius-3)",
                                        }}
                                    >
                                        <Spinner size="3" />
                                    </div>
                                )}
                                <Flex direction="column" gap="3" mt="3">
                                    <Flex direction="column" gap="4">

                                        {/* Nazwa / opis */}
                                        <TextField.Root
                                            placeholder="Nazwa lub opis"
                                            value={filters.query}
                                            onChange={(e) => setFilters(f => ({ ...f, query: e.target.value }))}
                                        />

                                        {/* Status */}
                                        <Select.Root
                                            value={filters.status}
                                            onValueChange={(value) => setFilters(f => ({ ...f, status: value }))}
                                        >
                                            <Select.Trigger placeholder="Status" />
                                            <Select.Content>
                                                <Select.Item value="__all__">Wszystkie</Select.Item>
                                                <Select.Item value="ready">ready</Select.Item>
                                                <Select.Item value="loading">loading</Select.Item>
                                                <Select.Item value="not_downloaded">not_downloaded</Select.Item>
                                            </Select.Content>
                                        </Select.Root>

                                        {/* Typ */}
                                        <Select.Root
                                            value={filters.type}
                                            onValueChange={(value) => setFilters(f => ({ ...f, type: value }))}
                                        >
                                            <Select.Trigger placeholder="Typ modelu" />
                                            <Select.Content>
                                                <Select.Item value="__all__">Wszystkie</Select.Item>
                                                <Select.Item value="chat">chat</Select.Item>
                                                <Select.Item value="coding">coding</Select.Item>
                                                <Select.Item value="science">science</Select.Item>
                                                <Select.Item value="creative">creative</Select.Item>
                                                <Select.Item value="language">language</Select.Item>
                                            </Select.Content>
                                        </Select.Root>

                                        {/* Tag */}
                                        <TextField.Root
                                            placeholder="Tag (np. coding)"
                                            value={filters.tag}
                                            onChange={(e) => setFilters(f => ({ ...f, tag: e.target.value }))}
                                        />

                                        {/* Base model */}
                                        <TextField.Root
                                            placeholder="Base model (np. llama3)"
                                            value={filters.baseModel}
                                            onChange={(e) => setFilters(f => ({ ...f, baseModel: e.target.value }))}
                                        />

                                        {/* Lora count */}
                                        <Flex gap="2">
                                            <TextField.Root
                                                placeholder="LoRA min"
                                                type="number"
                                                value={filters.loraMin}
                                                onChange={(e) => setFilters(f => ({ ...f, loraMin: e.target.value }))}
                                            />
                                            <TextField.Root
                                                placeholder="LoRA max"
                                                type="number"
                                                value={filters.loraMax}
                                                onChange={(e) => setFilters(f => ({ ...f, loraMax: e.target.value }))}
                                            />
                                        </Flex>

                                        {/* Size */}
                                        <Flex gap="2">
                                            <TextField.Root
                                                placeholder="Rozmiar min"
                                                type="number"
                                                value={filters.sizeMin}
                                                onChange={(e) => setFilters(f => ({ ...f, sizeMin: e.target.value }))}
                                            />
                                            <TextField.Root
                                                placeholder="Rozmiar max"
                                                type="number"
                                                value={filters.sizeMax}
                                                onChange={(e) => setFilters(f => ({ ...f, sizeMax: e.target.value }))}
                                            />
                                        </Flex>

                                        {isPending && (
                                            <div className="overlay">
                                                <Spinner />
                                            </div>
                                        )}


                                        {/* Przyciski */}
                                        <Flex gap="2" mt="2">
                                            <Button variant="soft" onClick={handleReset}>{t("models.reset")}</Button>
                                        </Flex>

                                    </Flex>

                                </Flex>
                            </div>
                        </Collapsible.Content>
                    )}

                </Collapsible.Root>
            </Card>


            <Card className="mt-4">
                <Flex gap="3" align="center" mt="4">
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

                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            {columns.filter(c => c.visible).map(col => (
                                <Table.ColumnHeaderCell
                                    key={col.id}
                                    draggable
                                    onDragStart={() => setDragged(col.id)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => handleDrop(col.id)}
                                    onClick={() => toggleSort(col.id)}
                                >
                                    {col.label} {sort.column === col.id && (sort.direction === "asc" ? "▲" : "▼")}
                                </Table.ColumnHeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {paginated.map((model: Model) => (
                            <Table.Row key={model.id}>
                                {columns.filter(c => c.visible).map(col => (
                                    <Table.Cell key={col.id}>
                                        {col.render(model)}
                                    </Table.Cell>
                                ))}
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </>
    );
}
