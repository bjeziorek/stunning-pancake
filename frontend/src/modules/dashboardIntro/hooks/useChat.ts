import { useState } from "react";

export function useChat() {
    const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    async function sendMessage(serviceId: string) {
        if (!serviceId) {
            console.warn("sendMessage called without serviceId");
            return;
        }
        setIsTyping(true);

        console.log('msg id', serviceId)
        if (!input.trim()) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", text: userMessage }]);

        setLoading(true);
        try {
            console.log("id2:", serviceId)
            const res = await fetch(`http://localhost:3001/services/${serviceId}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMessage })
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { role: "model", text: data.response }
            ]);
        } catch (err) {
            console.log("id3:", serviceId)
            setMessages(prev => [
                ...prev,
                { role: "model", text: "[Error: model unavailable]" }
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
