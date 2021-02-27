export async function getUniversitiesByCountry(country) {
  const response = await fetch(
    `http://universities.hipolabs.com/search?country=${country}`
  );
  const data = await response.json();

  return data;
}
