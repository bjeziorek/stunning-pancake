export function useToggleService() {
  return async (id: string, enabled: boolean) => {
    console.log("[React] Toggling service:", id, "enabled:", enabled);

    const res = await fetch(`http://localhost:3001/services/${id}/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });

    const data = await res.json();
    console.log("[React] Toggle response:", data);
  };
}
