export const safeFetchJson = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Remote API failed with status ${response.status}`);
  }

  return response.json();
};
