import { Text } from "@radix-ui/themes";
import { t } from "i18next";
import { OfflineWrapper } from "../../../shared/components/OfflineWrapper";
import { TestDemo } from "../demoInfo/TestDemo";
import { TableWrapper } from "@/shared/components";
import type { TableColumnsColumns } from "@/shared/components/table/types/columns";
import { filterMock, newData, newDataColumns, type NewData } from "./testMock";

export default function NeuralNetworks() {

    const cols: TableColumnsColumns<NewData> = newDataColumns;
    const data: NewData[] = newData;

    return (
        <>
            <Text>{t("nn.testowyTekstNN")}</Text>
            <OfflineWrapper>
                <TestDemo />
            </OfflineWrapper>
            <Text>costam costam</Text>
            <TableWrapper columns={cols} data={data} filters={filterMock} />
        </>
    )
}