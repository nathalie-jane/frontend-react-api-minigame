/* =====================================
	APP

	- Main component for flag quiz game
	- Handles navigation between 
	  authentication, start, game and 
	  results screen
======================================== */

import { useState } from "react";

import AccountForms from "./components/Authentication/AccountForms";
import StartGame from "./components/StartGame/StartGame";
import FlagQuizGame from "./components/FlagQuizGame/FlagQuizGame";
import GameResult from "./components/GameResult/GameResult";

function App() {
	const [gameScreen, setGameScreen] = useState("account");
	const [score, setScore] = useState(null);
	const [totalQuestions, setTotalQuestions] = useState(10);

	// Handle successful login and navigate to start screen
	const handleLoginSuccess = () => {
		setGameScreen("start");
	};

	// Start flag quiz game from start screen
	const handleStartGame = () => {
		setGameScreen("game");
	};

	// Exit flag quiz game and return to start screen
	const handleExitGame = () => {
		setGameScreen("start");
	};

	// Display game results screen
	const handleGameResults = (score, totalQuestions) => {
		setGameScreen("results");
		setScore(score);
		setTotalQuestions(totalQuestions);
	};

	// Start new game from results screen
	const handlePlayAgain = () => {
		setGameScreen("game");
	};

	return (
		<main className="site-main">
			{/* Display account login and sign-up form */}
			{gameScreen === "account" && <AccountForms onLogin={handleLoginSuccess} />}

			{/* Display start screen */}
			{gameScreen === "start" && <StartGame onStartGame={handleStartGame} />}

			{/* Display flag quiz game */}
			{gameScreen === "game" && <FlagQuizGame onExitGame={handleExitGame} onGameResults={handleGameResults} />}

			{/* Display game results */}
			{gameScreen === "results" && (
				<GameResult
					score={score}
					totalQuestions={totalQuestions}
					onPlayAgain={handlePlayAgain}
					onBackToStart={handleExitGame}
				/>
			)}
		</main>
	);
}

export default App;

