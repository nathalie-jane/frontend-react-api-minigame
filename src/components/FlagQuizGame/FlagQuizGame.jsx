/* ==================================
    COMPONENT: FLAG QUIZ GAME

	Rendering and logic for quiz 
	game screen
===================================== */

import { useEffect, useState } from "react";
import { fetchCountriesData } from "../../services/countriesApi";
import "./FlagQuizGame.css";

// Returns a shuffled copy of provided countries
const getShuffledCountries = (countries) => {
	const shuffledCountries = [...countries];

	for (let i = shuffledCountries.length - 1; i > 0; i--) {
		const randomCountryIndex = Math.floor(Math.random() * (i + 1));

		[shuffledCountries[i], shuffledCountries[randomCountryIndex]] = [
			shuffledCountries[randomCountryIndex],
			shuffledCountries[i],
		];
	}

	return shuffledCountries;
};

function FlagQuizGame() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentCountryFlag, setCurrentCountryFlag] = useState(null);
	const [answerOptions, setAnswerOptions] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isAnswerLocked, setIsAnswerLocked] = useState(false);

	useEffect(() => {
		async function getCountries() {
			try {
				const data = await fetchCountriesData();
				const randomCountryIndex = Math.floor(Math.random() * data.length);
				const correctCountry = data[randomCountryIndex];

				const filteredCountries = data.filter((country) => {
					if (country.name.common !== correctCountry.name.common) {
						return true;
					} else {
						return false;
					}
				});

				const incorrectCountries = getShuffledCountries(filteredCountries).slice(0, 3);

				const countryAnswerOptions = [
					correctCountry.name.common,
					...incorrectCountries.map((country) => country.name.common),
				];

				setCurrentCountryFlag(correctCountry);
				setAnswerOptions(getShuffledCountries(countryAnswerOptions));
				setError(null);
			} catch (error) {
				setError(error.message);
				setCurrentCountryFlag(null);
				setAnswerOptions([]);
				setSelectedAnswer(null);

				console.error("Error fetching countries data:", error);
			} finally {
				setIsLoading(false);
			}
		}

		getCountries();
	}, []);

	console.log("Loading:", isLoading);

	// Stores selected answer and locks the options
	const handleOptionSelect = (event) => {
		setSelectedAnswer(event.target.value);
		setIsAnswerLocked(true);
	};

	// Gets correct country name for current question
	const correctAnswer = currentCountryFlag ? currentCountryFlag.name.common : "";

	// Checks if selected answer is correct
	const isCorrectAnswer = selectedAnswer === correctAnswer;

	// Creates option classes based on user selection
	const getOptionClassName = (countryName) => {
		let className = "flag-quiz__option";

		if (isAnswerLocked && countryName === correctAnswer) {
			className += " flag-quiz__option--correct";
		}

		if (isAnswerLocked && countryName === selectedAnswer && countryName !== correctAnswer) {
			className += " flag-quiz__option--incorrect";
		}

		if (isAnswerLocked && countryName !== selectedAnswer && countryName !== correctAnswer) {
			className += " flag-quiz__option--disabled";
		}

		return className;
	};

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
						{currentCountryFlag && (
							<img className="flag-quiz__flag-image" src={currentCountryFlag.flags.svg} alt="Flag to guess"></img>
						)}
					</div>
				</div>

				{/* Answer options */}
				<fieldset className="flag-quiz__options">
					{answerOptions.map((countryName, index) => (
						<label className={getOptionClassName(countryName)} htmlFor={`country-option-${index}`} key={countryName}>
							<input
								className="flag-quiz__option-input"
								type="radio"
								id={`country-option-${index}`}
								name="country"
								value={countryName}
								checked={selectedAnswer === countryName}
								onChange={handleOptionSelect}
								disabled={isAnswerLocked}
							/>
							<span className="flag-quiz__option-country">{countryName}</span>
							<span className="flag-quiz__icon"></span>
						</label>
					))}
				</fieldset>

				{/* Feedback and action button */}
				{selectedAnswer && (
					<div className="flag-quiz__feedback">
						<p
							className={`flag-quiz__feedback-text ${
								isCorrectAnswer ? "flag-quiz__feedback-text--correct" : "flag-quiz__feedback-text--incorrect"
							}`}>
							{isCorrectAnswer ? "Correct!" : `Wrong! The correct answer is ${correctAnswer}`}
						</p>
						<button className="flag-quiz__button" type="button">
							Next Flag
							<i className="flag-quiz__icon flag-quiz__icon--next lni lni-arrow-right"></i>
						</button>
					</div>
				)}
			</div>
		</section>
	);
}

export default FlagQuizGame;
