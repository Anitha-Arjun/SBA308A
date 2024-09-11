// api.js
const API_KEY =
  "live_ct7fnFpJeYXfxJmSJU6r0G4e5Kq0Xv4IeOXZg6QYFlgxzy143tKi9SIChslYV0Yi";
const API_URL = "https://api.thedogapi.com/v1";

export async function fetchBreeds() {
  try {
    const response = await fetch(`${API_URL}/breeds?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Network response was not ok.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching breeds:", error);
  }
}

export async function fetchDogs(page = 1, breed = "") {
  try {
    let url = `${API_URL}/images/search?limit=10&page=${page}`;
    if (breed) url += `&breed_ids=${breed}`;

    const response = await fetch(url, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("Network response was not ok.");
    return await response.json();
  } catch (error) {
    console.error("Error fetching dogs:", error);
  }
}
