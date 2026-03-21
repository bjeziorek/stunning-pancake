import { useState } from "react";

function App() {
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
    <div style={{ padding: 20 }}>
      <h1>React → Flask test</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Wpisz coś"
      />
  <button onClick={sendToBackend}>Wyślij</button>

      <p>Odpowiedź backendu: {response}</p>

<br/>
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
  );
}

export default App;
