export async function fetchCountriesData() {
	const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags");

	if (!response.ok) {
		throw new Error("Could not fetch data");
	}

	const data = await response.json();

	return data;
}
