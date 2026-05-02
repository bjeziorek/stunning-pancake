export async function getServices() {
  const res = await fetch("http://localhost:3001/services");
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}
