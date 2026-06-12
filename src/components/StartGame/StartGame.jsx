/* ==================================
    COMPONENT: START GAME

	Renders start screen with game
	instructions and action buttons
	to start or exit the game
===================================== */

import "./StartGame.css";

function StartGame({ onStartGame }) {
	return (
		<section className="start-game">
			{/* Card container for text content and buttons */}
			<div className="start-game__card">
				<div className="start-game__icon start-game__icon--globe">🌍</div>

				{/* Introductory heading content */}
				<div className="start-game__heading">
					<h1 className="start-game__heading-title">Welcome!</h1>
					<p className="start-game__heading-subtitle">Ready to test your geography knowledge?</p>
				</div>

				{/* Game rules overview */}
				<div className="start-game__rules">
					<h2 className="start-game__rules-title">How to Play:</h2>
					<ul className="start-game__rules-list">
						<li className="start-game__rules-item">
							<span className="start-game__rules-icon">•</span>
							Identify the country from 10 different flags
						</li>
						<li className="start-game__rules-item">
							<span className="start-game__rules-icon">•</span>Choose the correct answer from 4 options
						</li>
						<li className="start-game__rules-item">
							<span className="start-game__rules-icon">•</span>You have 10 seconds per question
						</li>
						<li className="start-game__rules-item">
							<span className="start-game__rules-icon">•</span>Earn 1 point for each correct answer
						</li>
					</ul>
				</div>

				{/* Action buttons */}
				<button className="start-game__button start-game__button--primary" type="button" onClick={onStartGame}>
					<i className="start-game__icon start-game__icon--play lni lni-play"></i>
					Start Game
				</button>

				<button className="start-game__button start-game__button--secondary" type="button">
					<i className="start-game__icon start-game__icon--exit lni lni-exit"></i>Exit
				</button>
			</div>
		</section>
	);
}

export default StartGame;
