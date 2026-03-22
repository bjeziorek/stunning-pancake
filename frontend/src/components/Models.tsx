
import { Badge, Button, Card, DropdownMenu, Flex, Table, Text, TextField, Tooltip } from "@radix-ui/themes";
import { t } from "i18next";
import { models as modelsDBstub } from "../stubs/modelsDB";
import { useState } from "react";
import { Header } from "@radix-ui/themes/components/table";
import type { Model } from "../model/Models";
import { TagIcon } from "lucide-react";

export default function Models() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
  status: "",
  type: "",
  tag: "",
});

    const [columns, setColumns] = useState([
        {
            id: "name",
            label: t("models.name"),
            visible: true,
            render: (model: Model) => model.name
        },
        {
            id: "description",
            label: t("models.description"),
            visible: true,
            render: (model: Model) => model.description
        },
        {
            id: "baseModel",
            label: t("models.base"),
            visible: true,
            render: (model: Model) => model.baseModel
        },
        {
            id: "version",
            label: t("models.version"),
            visible: true,
            render: (model: Model) => model.version
        },
        {
            id: "loraCount",
            label: t("models.lora"),
            visible: true,
            render: (model: Model) => model.loraCount
        },
        {
            id: "status",
            label: t("models.status"),
            visible: true,
            render: (model: Model) => (
                <Badge color={model.status === "ready" ? "green" : "amber"}>
                    {model.status}
                </Badge>
            )
        },
        {
            id: "actions",
            label: t("models.actions"),
            visible: true,
            render: (model: Model) => (
                <Button variant="soft" onClick={() => loadModel(model.id.toString())}>
                    {t("models.load")}
                </Button>
            )
        },
        {
            id: "id",
            label: t("models.id"),
            visible: true,
            render: (model: Model) => model.id
        },
        {
            id: "type",
            label: t("models.type"),
            visible: true,
            render: (model: Model) => model.type
        },
        {
            id: "size",
            label: t("models.size"),
            visible: true,
            render: (model: Model) => model.size
        },
        {
            id: "details",
            label: t("models.details"),
            visible: true,
            render: (model: Model) => model.details
        },
        {
            id: "tags",
            label: t("models.tags"),
            visible: true,
            render: (model: Model) => (
                <Flex gap="2" wrap="wrap">
                    {model.tags.map(tag => (
                        <Tooltip key={tag} content={tag}>
                            <Badge
                                key={tag}
                                variant="soft"
                                radius="full"
                                color={tagColor(tag)}
                            >
                                <TagIcon size={12} />
                                {tag}
                            </Badge>
                        </Tooltip>
                    ))}
                </Flex>
            )
        }
    ]);

    const loadModel = (id: string) => {
        // todo
        console.log(id)
    }
    // todo: tu ma wczytać z kontekstu czy serwi set demo czy full
    // eslint-disable-next-line prefer-const
    let serviceStatus = 'demo';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let models: any[] = [];
    if (serviceStatus === 'demo') {
        models = modelsDBstub;
    }

    const filteredModels = models.filter(model =>  JSON.stringify(model).toLowerCase().includes(search.toLowerCase()));


    const tagColor = (tag: string) => {
        if (tag.includes("coding")) return "blue";
        if (tag.includes("chat")) return "green";
        if (tag.includes("math")) return "purple";
        if (tag.includes("polish")) return "red";
        return "gray";
    };





    const toggleColumn = (id: string) => {
        setColumns(cols =>
            cols.map(col =>
                col.id === id ? { ...col, visible: !col.visible } : col
            )
        );
    };


    return (
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

                {/* <Button variant="soft" onClick={() => setAdvancedOpen((v) => !v)}>
    Zaawansowane filtrowanie
  </Button> */}
  
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
                            <Table.ColumnHeaderCell key={col.id}>
                                {col.label}
                            </Table.ColumnHeaderCell>
                        ))}
                        {/* <Table.ColumnHeaderCell>{t("models.name")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.description")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.base")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.version")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.lora")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.id")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.type")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.tags")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.size")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.details")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>{t("models.status")}</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell> */}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {filteredModels.map((model: Model) => (
                        <Table.Row key={model.id}>
                            {columns.filter(c => c.visible).map(col => (
                                <Table.Cell key={col.id}>
                                    {/* {model[col.id]} */}
                                    {col.render(model)}
                                </Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                    {/* {models.map(model => (
                        <Table.Row key={model.id}>
                            <Table.Cell><Text>{model.name}</Text></Table.Cell>
                            <Table.Cell>{model.description}</Table.Cell>
                            <Table.Cell>{model.baseModel}</Table.Cell>
                            <Table.Cell>{model.version}</Table.Cell>
                            <Table.Cell>{model.loraCount}</Table.Cell>
                            <Table.Cell>{model.id}</Table.Cell>
                            <Table.Cell>{model.type}</Table.Cell>
                            <Table.Cell>{model.tags.join(" ").trim()}</Table.Cell>
                            <Table.Cell>{model.size}</Table.Cell>
                            <Table.Cell>{model.details}</Table.Cell>
                            <Table.Cell>
                                <Badge color={model.status === "ready" ? "green" : "amber"}>
                                    {model.status}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Button
                                    variant="soft"
                                    onClick={() => loadModel(model.id)}
                                >
                                    <Text>{t("models.load")}</Text>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))} */}
                </Table.Body>
            </Table.Root>
        </Card>
    );
}
