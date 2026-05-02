export function useToggleService() {
  return async (id: string, enabled: boolean) => {
    await fetch(`http://localhost:3001/services/${id}/state`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
  };
}
