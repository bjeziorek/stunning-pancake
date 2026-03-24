import {  Text} from "@radix-ui/themes";
import { t } from "i18next";
import { OfflineWrapper } from "../../../shared/components/OfflineWrapper";
import { TestDemo } from "../demoInfo/TestDemo";
import { columsMock, modelsDBstub } from "../../models/mock/modelsDB";
import { TableWrapper } from "@/shared/components";

export default function NeuralNetworks() {

    const cols = columsMock;
    const data = modelsDBstub;

    return(
        <>
        <Text>{t("nn.testowyTekstNN")}</Text>
        <OfflineWrapper>
            <TestDemo/>
        </OfflineWrapper>
        <Text>costam costam</Text>
        <TableWrapper columns={cols} data={data}/>
        </>
    )
}