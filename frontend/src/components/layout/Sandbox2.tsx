import React from "react";
import { useState } from "react";
import { Flex, Text, Button } from "@radix-ui/themes";
import { motion } from "motion/react"
import { toast } from "sonner";

export default function Sandbox() {

     const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [temperature, setTemperature] = useState(1.0);

  const sendToBackend = async () => {
    const res = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (


    <div className="flex h-full w-full gap-4 p-4 bg-gray-50 dark:bg-gray-900">
      <div style={{ padding: 20 }}>
    
      <button onClick={() => toast('Toast')}>Render Toast</button>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :)</Text>
        <Button>Let's go</Button>
      </Flex>
      <h1 className="text-3xl font-bold p-30 underline">
        Hello world!
      </h1>
      <h1>React → Flask test</h1>
      <motion.ul animate={{ rotate: 360 }} />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Wpisz coś"
      />
      <button onClick={sendToBackend}>Wyślij</button>

      <p>Odpowiedź backendu: {response}</p>

      <br />
      <input
        type="range"
        min="0"
        max="2"
        step="0.1"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
      />
      <span style={{
        background: "#eee",
        padding: "2px 6px",
        borderRadius: "6px",
        fontFamily: "monospace"
      }}>
        {Number(temperature).toFixed(1)}
      </span>



    </div>
    </div>
    
  );
}
