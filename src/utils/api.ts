export async function fetchWines(): Promise<any[]> {
  const response = await fetch('https://api.sampleapis.com/wines/reds');
  if (!response.ok) {
    throw new Error(`Failed to fetch wines: ${response.statusText}`);
  }
  return response.json();
}
