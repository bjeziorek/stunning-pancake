import { useGatewayPing } from "@/app/hooks/useGatewayPing";
import { Badge, Box, Button, Card, Flex, Grid, Text, TextField } from "@radix-ui/themes";
import { useServicesList } from "../hooks/useServicesList";
import { useToggleService } from "../hooks/useToggleService";
import { useState } from "react";
import type { ServiceModel, ServiceModelStatus } from "../types/ServiceModel";
import { useChat } from "../hooks/useChat";
import type { RadixColor } from "@/types/RadixColor";

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


     const fastApiDirectTest = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: 'Cats are...' })
      });

      const data = await res.json();
      console.log("Model flastapi response:", data.response);
    } catch (err) {
      console.error("Error:", err);
    }
  };


 // fastApiDirectTest()

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

    // add global Radix' Colors to not type as dangerous string here
    function modelsStatusDotColor(status: ServiceModelStatus): RadixColor {
        switch (status) {
            case "error": return "orange"
            case "off": return "red"
            case "on": return "green"
            case "starting": return "yellow"
            case "stopping": return "purple"
            default: return "gray"
        }
    }

    return (
        <Grid>
            <Flex direction="column" gap="4">
                {services.map(s => (
                    <Card key={s.id} className={s.id === currentPreviewId ? "border-2 border-green-600" : ""}>
                         <Flex  gap="2" align="center">
                        <Badge color={modelsStatusDotColor(s.status)}>{s.status}</Badge>
                        {s.name}



                        <Button mx="2" onClick={() => {
                            toggleService(s.id, !s.enabled).then(refresh);
                        }}>
                            {s.status === "on" ? "Stop" : "Start"}
                        </Button>
                        <Button disabled={!s.enabled} onClick={() => loadPreview(s)} color={s.id === currentPreviewId ? "orange" : "crimson"}>Preview</Button>
</Flex>
                    </Card>
                ))}
            </Flex>

            <Box m="4">
                <Card>

                    <Flex direction="column" gap="4">

                        {currentPreviewId && services.find(s => s.id === currentPreviewId)?.status === "on" ? (

                            <Flex direction="column" gap="4">
                                <div>Loaded: {services.find(s => s.id === currentPreviewId)?.name}</div>

                                {chat.messages.map((m, i) => (
                                    <Text key={i} color={m.role === "model" ? "cyan" : "orange"}>
                                        <b>{m.role}:</b> {m.text}
                                    </Text>
                                ))}

                                {chat.isTyping && <div>model is thinking…</div>}
                                <TextField.Root placeholder="Ask model... (English only!)" value={chat.input}
                                    onChange={e => chat.setInput(e.target.value)} />

                                <Button onClick={() => chat.sendMessage(currentPreviewId)} disabled={chat.loading}>
                                    Send
                                </Button>
                            </Flex>
                        ) : (
                            <>
                                <div>{services.find(s => s.id === currentPreviewId)?.status === "off" ? "Start a model and click Preview to chat with it." : ""}</div>
                                <div>{services.find(s => s.id === currentPreviewId)?.status === "starting" ? "Model Starting..." : ""}</div>
                                <div>{services.find(s => s.id === currentPreviewId)?.status === "error" ? "Err... an error occured but sometimes it happens during start, give it a while, maybe will jump into online, if not restart model." : ""}</div>
                            </>
                        )}
                    </Flex>
                </Card>
            </Box>
        </Grid>
    )
}