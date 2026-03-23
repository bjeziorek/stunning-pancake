import {  Text} from "@radix-ui/themes";
import { t } from "i18next";
import { OfflineWrapper } from "./offline/OfflineWrapper";
import { TestDemo } from "./offline/TestDemo";

export default function NeuralNetworks() {

    return(
        <>
        <Text>{t("nn.testowyTekstNN")}</Text>
        <OfflineWrapper>
            <TestDemo/>
        </OfflineWrapper>
        <Text>costam costam</Text>
        <TestDemo/>
        </>
    )
}