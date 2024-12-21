interface Wine {
  winery: string;
  wine: string;
  rating: {
    average: string;
    reviews: string;
  };
  location: string;
  image: string;
  id: number;
}

export async function fetchWines(): Promise<Wine[]> {
  const response = await fetch('https://api.sampleapis.com/wines/reds');
  if (!response.ok) {
    throw new Error(`Failed to fetch wines: ${response.statusText}`);
  }
  return response.json();
}
