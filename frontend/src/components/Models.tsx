
import { Badge, Button, Card, Table, Text } from "@radix-ui/themes";
import { t } from "i18next";
import { models as modelsDBstub } from "./stubs/modelsDB";

export default function Models() {
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


    return (
        <Card>
            <Text>{t("models.models")}</Text>

            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>{t("models.name")}</Table.ColumnHeaderCell>
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
                        <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {models.map(model => (
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
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    );
}
