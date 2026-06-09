/* ==================================
    COMPONENT: FLAG QUIZ GAME

	Rendering and logic for quiz 
	game screen
===================================== */

import { useEffect, useState } from "react";
import { fetchCountriesData } from "../../services/countriesApi";
import "./FlagQuizGame.css";

function FlagQuizGame() {
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

	return (
		<section className="flag-quiz">
			{/* Game container */}
			<div className="flag-quiz__card">
				{/* Header with game status and menu actions */}
				<header className="flag-quiz__header">
					{/* Game status indicators */}
					<div className="flag-quiz__stats">
						<span className="flag-quiz__status flag-quiz__status--round">Q </span>
						<span className="flag-quiz__status flag-quiz__status--score">Score: </span>
					</div>
					{/* Menu action buttons */}
					<div className="flag-quiz__menu-actions">
						<button className="flag-quiz__menu-button flag-quiz__menu-button--restart" type="button">
							<i className="flag-quiz__icon flag-quiz__icon--restart lni lni-refresh-circle-1-clockwise"></i>
						</button>
						<button className="flag-quiz__menu-button flag-quiz__menu-button--exit" type="button">
							<i className="flag-quiz__icon flag-quiz__icon--exit lni lni-exit"></i>
						</button>
					</div>
				</header>

				{/* Timer indicator */}
				<div className="flag-quiz__timer">
					<i className="flag-quiz__icon flag-quiz__icon--timer lni lni-stopwatch"></i>
					<p className="flag-quiz__timer-count"></p>
				</div>

				{/* Progress bar */}
				<div className="flag-quiz__progress">
					<div className="flag-quiz__progress-bar"></div>
				</div>

				{/* Main content area with question and flag */}
				<div className="flag-quiz__content">
					<h1 className="flag-quiz__question">Which country does this flag belong to?</h1>
					<div className="flag-quiz__flag">
						<img className="flag-quiz__flag-image" src="" alt="Flag to guess"></img>
					</div>
				</div>

				{/* Answer options */}
				<fieldset className="flag-quiz__options">
					{/* Individual answer option */}
					<label className="flag-quiz__option" htmlFor="country-option-01">
						<input className="flag-quiz__option-input" type="radio" id="country-option-01" name="country"></input>
						<span className="flag-quiz__option-country"></span>
						<span className="flag-quiz__icon"></span>
					</label>
					{/* Individual answer option */}
					<label className="flag-quiz__option" htmlFor="country-option-02">
						<input className="flag-quiz__option-input" type="radio" id="country-option-02" name="country"></input>
						<span className="flag-quiz__option-country"></span>
						<span className="flag-quiz__icon"></span>
					</label>
					{/* Individual answer option */}
					<label className="flag-quiz__option" htmlFor="country-option-03">
						<input className="flag-quiz__option-input" type="radio" id="country-option-03" name="country"></input>
						<span className="flag-quiz__option-country"></span>
						<span className="flag-quiz__icon"></span>
					</label>
					{/* Individual answer option */}
					<label className="flag-quiz__option" htmlFor="country-option-04">
						<input className="flag-quiz__option-input" type="radio" id="country-option-04" name="country"></input>
						<span className="flag-quiz__option-country"></span>
						<span className="flag-quiz__icon"></span>
					</label>
				</fieldset>

				{/* Feedback and action button */}
				<div className="flag-quiz__feedback">
					<p className="flag-quiz__feedback-text"></p>
					<button className="flag-quiz__button" type="button">
						Next Flag
						<i className="flag-quiz__icon flag-quiz__icon--next lni lni-arrow-right"></i>
					</button>
				</div>
			</div>
		</section>
	);
}

export default FlagQuizGame;
