import { Flex, TextField } from "@radix-ui/themes";
import { t } from "i18next";

interface SimpleSearchProps {
    search: any,
    setSearch: any
}

export function SimpleSearch(props: SimpleSearchProps) {
    const { search, setSearch } = props;

    return (
        <Flex justify="between" align="center" mb="4">
            <TextField.Root
                placeholder={t("models.searchSimplePlaceholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "300px" }}
            />
        </Flex>
    )
}