import * as Collapsible from "@radix-ui/react-collapsible";
import { Button, Flex, Select, Spinner, TextField } from "@radix-ui/themes";
import { t } from "i18next";

interface FiltersProps {
    open: any,
    setOpen: any,
    isPending: any,
    filters: any,
    setFilters: any,
    handleReset: any
}


export function Filters(props: FiltersProps) {
    const { open, setOpen, isPending, filters, setFilters, handleReset } = props;


    return (
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
    )
}