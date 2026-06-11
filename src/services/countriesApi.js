/* ===============================
   	API

   	Fetches and formats country 
	data for flag quiz game
   =============================== */

export async function fetchCountriesData() {
	try {
		const response = await fetch(
			"https://api.restcountries.com/countries/v5?limit=100&response_fields=names.common,codes.alpha_2",
			{
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_REST_COUNTRIES_API_KEY}`, // Use environment variable for API key
				},
			},
		);

		if (!response.ok) {
			throw new Error("Could not fetch data");
		}

		// Extract country objects from API response
		const result = await response.json();
		const countries = result.data.objects;

		// Map each country object into name and flag SVG URL
		const formattedCountries = countries.map((country) => {
			const countryName = country.names.common;
			const countryCode = country.codes.alpha_2.toLowerCase();

			return {
				name: {
					common: countryName,
				},
				flags: {
					svg: `https://flags.restcountries.com/v5/svg/${countryCode}.svg`,
				},
			};
		});

		return formattedCountries;
	} catch (error) {
		console.error("Error fetching countries data:", error);
		return [];
	}
}
