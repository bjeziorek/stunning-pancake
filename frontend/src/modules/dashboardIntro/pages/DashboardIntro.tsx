import { useGatewayPing } from "@/app/hooks/useGatewayPing";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useServicesList } from "../hooks/useServicesList";
import { useToggleService } from "../hooks/useToggleService";
import { useState } from "react";
import type { ServiceModel } from "../types/ServiceModel";


export default function DashboardIntro() {
    const { online: isApiGatewayOnline } = useGatewayPing();
    const { services, refresh } = useServicesList(isApiGatewayOnline)
    const toggleService = useToggleService();
    const [previewContent, setPreviewContent] = useState(<div>No preview loaded (no i18n!)</div>)
    const [currentPreviewId, setCurrentPreviewId] = useState('')

    if (!isApiGatewayOnline) {
        return (<div>Here will be demo content (no i18n!)</div>)
    }

    console.log(services)

    function loadPreview(s: ServiceModel) {
        if (s.enabled) {
            setCurrentPreviewId(s.id)
        }
        setPreviewContent(
            <div>Loaded: {s.name}</div>
        )
    }

    return (
        <Flex>
            <ul>
                {services.map(s => (
                    <li key={s.id}>{s.name} - {s.enabled ? "online" : "offline"} -
                        {/* <Button variant="ghost" mx="1">On/Off */}
                        <Button onClick={() => {
                            console.log('toggle')
                            toggleService(s.id, !s.enabled).then(refresh);
                        }}>
                            Toggle
                        </Button>
                        <Button disabled={!s.enabled} onClick={() => loadPreview(s)}>Preview</Button>
                    </li>
                ))}
            </ul>
            <Box m="4">
                <Card>
                    <Text>Tu będzie wpisane preview (no i18n!)</Text>
                    {
                    services.find(ser => ser.id === currentPreviewId)?.enabled
                        ? previewContent
                        : <div>Service "{services.find(ser => ser.id === currentPreviewId)?.name}" offline - no preview! (no i18n!)</div>
                    }

                </Card>
            </Box>
        </Flex>
    )
}