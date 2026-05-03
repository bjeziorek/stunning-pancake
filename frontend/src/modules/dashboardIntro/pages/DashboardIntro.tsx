import { useGatewayPing } from "@/app/hooks/useGatewayPing";
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { useServicesList } from "../hooks/useServicesList";
import { useToggleService } from "../hooks/useToggleService";
import { useState } from "react";
import type { ServiceModel } from "../types/ServiceModel";
import { useChat } from "../hooks/useChat";

export interface Chat {
    id: string,
    chatHistory: string[]
}

export default function DashboardIntro() {
    const { online: isApiGatewayOnline } = useGatewayPing();
    const { services, refresh } = useServicesList(isApiGatewayOnline)
    const toggleService = useToggleService();
    const [chats, setChats] = useState<Chat[]>([])
    const [currentPreviewId, setCurrentPreviewId] = useState('')
    const chat = useChat();

    if (!isApiGatewayOnline) {
        return (<div>Here will be demo content (no i18n!)</div>)
    }

    console.log(services)

    function loadPreview(s: ServiceModel) {
        if (!chats.find(chat => chat.id === s.id)) {
            setChats(prev => [...prev, {
                id: s.id,
                chatHistory: []
            }])
        }

        if (s.enabled) {
            setCurrentPreviewId(s.id)
        }
    }

    return (
        <Flex>
            <ul>
                {services.map(s => (
                    <li key={s.id}>{s.name} - {s.enabled ? "online" : "offline"} - status:{s.status} -
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
                    <Text>Tu będzie wpisane preview</Text>

                    {currentPreviewId && services.find(s => s.id === currentPreviewId)?.enabled ? (
                        <Box>
                            <div>Loaded: {services.find(s => s.id === currentPreviewId)?.name}</div>

                            {chat.messages.map((m, i) => (
                                <div key={i}>
                                    <b>{m.role}:</b> {m.text}
                                </div>
                            ))}

                            <input
                                value={chat.input}
                                onChange={e => chat.setInput(e.target.value)}
                            />
                            {chat.isTyping && <div>model is thinking…</div>}

                            <Button onClick={() => chat.sendMessage(currentPreviewId)} disabled={chat.loading}>
                                Send
                            </Button>
                        </Box>
                    ) : (
                        <div>No preview</div>
                    )}
                </Card>
            </Box>
        </Flex>
    )
}