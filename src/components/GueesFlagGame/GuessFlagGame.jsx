import { useEffect, useState } from "react";
import { fetchCountriesData } from "../../services/countriesApi";
import "./GuessFlagGame.css";

function GuessFlagGame() {
	const [countries, setCountries] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function getCountries() {
			try {
				const data = await fetchCountriesData();

				setCountries(data);
				setError(null);
			} catch (error) {
				setError(error.message);
				setCountries([]);
			} finally {
				setIsLoading(false);
			}
		}

		getCountries();
	}, []);

	console.log("Loading:", isLoading);
	console.log("Error:", error);
	console.log("Countries loaded:", countries.length);

	return null;
}

export default GuessFlagGame;
