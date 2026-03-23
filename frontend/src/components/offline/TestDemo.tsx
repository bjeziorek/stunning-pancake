import React from "react";

export const TestDemo: React.FC = () => {
  return (
    <div style={{ padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Tryb Demo</h2>
      <p>
        Backend jest offline, więc widzisz wersję demonstracyjną tego
        komponentu.
      </p>

      <ul>
        <li>Instrukcje działania</li>
        <li>Mockowe dane</li>
        <li>Symulacja backendu</li>
        <li>Opcjonalnie: wideo prezentujące backend</li>
      </ul>
    </div>
  );
};
