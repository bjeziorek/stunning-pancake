import { useState } from "react";

export function useChat() {
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    async function sendMessage(serviceId: string, modelName:string, isWs = false) {
        if (!serviceId) {
            console.warn("sendMessage called without serviceId");
            return;
        }
        setIsTyping(true);

        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "you", text: userMessage }]);


        if (isWs) {
            console.log('chat ws')
            const ws = new WebSocket(`ws://localhost:3001/ws/${serviceId}`);

            const modelIndex = messages.length + 1;
            setMessages(prev => [...prev, { role: "model ["+modelName+"]", text: "" }]);

            ws.onopen = () => {
                ws.send(JSON.stringify({ prompt: userMessage }));
            };

            ws.onmessage = (event) => {
                const data = JSON.parse(event.data);

                if (data.number) {
                    setMessages(prev => {
                        const updated = [...prev];
                        updated[modelIndex] = {
                            ...updated[modelIndex],
                            text: updated[modelIndex].text + " " + String(data.number)
                        };
                        return updated;
                    });
                }

                if (data.done) {
                    ws.close();
                    setIsTyping(false);
                }
            };

            ws.onerror = () => {
                setMessages(prev => [...prev, { role: "model ["+modelName+"]", text: "[WS error]" }]);
                setIsTyping(false);
            };

            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3001/services/${serviceId}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMessage })
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { role:"model ["+modelName+"]", text: data.response }
            ]);
        } catch (err) {
            setMessages(prev => [
                ...prev,
                { role: "model ["+modelName+"]", text: "[Error: model unavailable]" }
            ]);
        } finally {
            setLoading(false);
            setIsTyping(false);
        }
    }

    return {
        messages,
        input,
        setInput,
        sendMessage,
        loading,
        isTyping
    };
}
