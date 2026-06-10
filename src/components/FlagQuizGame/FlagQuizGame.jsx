/* ==================================
    COMPONENT: FLAG QUIZ GAME

	Rendering and logic for flag quiz
	game
===================================== */

import { useEffect, useState } from "react";
import { fetchCountriesData } from "../../services/countriesApi";
import "./FlagQuizGame.css";

// Returns a shuffled copy from given array of countries data from API
const getShuffledCountries = (countries) => {
	const shuffledCountries = [...countries];

	// Fisher-Yates shuffle algorithm to randomize order of countries from given array
	for (let i = shuffledCountries.length - 1; i > 0; i--) {
		const randomCountryIndex = Math.floor(Math.random() * (i + 1));

		[shuffledCountries[i], shuffledCountries[randomCountryIndex]] = [
			shuffledCountries[randomCountryIndex],
			shuffledCountries[i],
		];
	}

	return shuffledCountries;
};

// Total number of questions in the game
const totalQuestions = 10;

// Main component for flag quiz game, handles game state and logic
function FlagQuizGame() {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [currentCountryFlag, setCurrentCountryFlag] = useState(null);
	const [answerOptions, setAnswerOptions] = useState([]);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [isAnswerLocked, setIsAnswerLocked] = useState(false);
	const [countries, setCountries] = useState([]);
	const [score, setScore] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState(1);

	// Shuffles countries data and generates flag and answer options for new question
	const generateNewFlag = (countries) => {
		const shuffledCountries = getShuffledCountries(countries);
		const correctCountry = shuffledCountries[0];

		// Filters out 1 correct country and selects 3 random incorrect countries for answer options
		const incorrectCountries = shuffledCountries
			.filter((country) => {
				if (country.name.common !== correctCountry.name.common) {
					return true;
				} else {
					return false;
				}
			})
			.slice(0, 3);

		const countryAnswerOptions = [correctCountry.name.common, ...incorrectCountries.map((country) => country.name.common)];

		setCurrentCountryFlag(correctCountry);
		setAnswerOptions(getShuffledCountries(countryAnswerOptions));
		setSelectedAnswer(null);
		setIsAnswerLocked(false);
	};

	// Fetches countries data when component renders and initializes game state, handles errors and loading state
	useEffect(() => {
		async function getCountries() {
			try {
				const data = await fetchCountriesData();

				setCountries(data);
				generateNewFlag(data);
				setError(null);
			} catch (error) {
				setError(error.message);
				setCountries([]);
				setCurrentCountryFlag(null);
				setAnswerOptions([]);
				setSelectedAnswer(null);
				setIsAnswerLocked(false);
			} finally {
				setIsLoading(false);
			}
		}

		getCountries();
	}, []);

	// Stores selected answer and locks options, updates score if answer is correct
	const handleOptionSelect = (event) => {
		const answer = event.target.value;

		setSelectedAnswer(answer);
		setIsAnswerLocked(true);

		if (answer === correctAnswer) {
			setScore((previousScore) => {
				const updatedScore = previousScore + 1;

				return updatedScore;
			});
		}
	};

	// Gets correct country name for current question
	const correctAnswer = currentCountryFlag ? currentCountryFlag.name.common : "";

	// Checks if selected answer is correct
	const isCorrectAnswer = selectedAnswer === correctAnswer;

	// Checks if current question is the last one in the game
	const isLastQuestion = currentQuestion === totalQuestions;

	// Creates option states based on user selection
	const renderOptionStates = (countryName) => {
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

	// Creates feedback icons based on user selection
	const renderFeedbackIcon = (countryName) => {
		let className = "flag-quiz__icon";

		if (!isAnswerLocked) {
			return null;
		}

		if (countryName === correctAnswer) {
			className += " flag-quiz__icon--correct lni lni-check-circle-1";
		}

		if (countryName === selectedAnswer && countryName !== correctAnswer) {
			className += " flag-quiz__icon--incorrect lni lni-xmark-circle";
		}

		return className;
	};

	// Resets game state to initial values and generates new flag for first question
	const handleRestartGame = () => {
		setScore(0);
		setCurrentQuestion(1);
		generateNewFlag(countries);
		setSelectedAnswer(null);
		setIsAnswerLocked(false);

		generateNewFlag(countries);
	};

	// Generates new flag and answer options for next question or ends game if current question is the last one
	const handleNextFlag = () => {
		if (currentQuestion === totalQuestions) {
			console.log(`Game Over\nTotal score: ${score} / ${totalQuestions}`);
			return;
		} else {
			setCurrentQuestion((currentQuestionNumber) => {
				const nextQuestionNumber = currentQuestionNumber + 1;

				return nextQuestionNumber;
			});
		}

		generateNewFlag(countries);
	};

	// Logs loading state when fetching countries data
	if (isLoading) {
		console.log("Loading countries");
	}

	// Logs error if fetching countries data fails
	if (error) {
		console.error("Error fetching countries data:", error);
	}

	return (
		<section className="flag-quiz">
			{/* Game container */}
			<div className="flag-quiz__card">
				{/* Header with game status and menu actions */}
				<header className="flag-quiz__header">
					{/* Game status indicators */}
					<div className="flag-quiz__stats">
						<span className="flag-quiz__status flag-quiz__status--round">
							Q {currentQuestion} / {totalQuestions}
						</span>
						<span className="flag-quiz__status flag-quiz__status--score">Score: {score}</span>
					</div>
					{/* Menu action buttons */}
					<div className="flag-quiz__menu-actions">
						<button
							className="flag-quiz__menu-button flag-quiz__menu-button--restart"
							type="button"
							onClick={handleRestartGame}>
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
						<label className={renderOptionStates(countryName)} htmlFor={`country-option-${index}`} key={countryName}>
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
							<span className={renderFeedbackIcon(countryName)}></span>
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
						<button className="flag-quiz__button" type="button" onClick={handleNextFlag}>
							{isLastQuestion ? "See Results" : "Next Flag"}
							<i className="flag-quiz__icon flag-quiz__icon--next lni lni-arrow-right"></i>
						</button>
					</div>
				)}
			</div>
		</section>
	);
}

export default FlagQuizGame;
