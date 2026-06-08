/* ==================================
    COMPONENT: START SCREEN

	Start screen for flag quiz game
===================================== */

import "./StartScreen.css";

function StartScreen() {
	return (
		<section className="start-screen">
			{/* Card container for text content and buttons */}
			<div className="start-screen__card">
				<div className="start-screen__icon start-screen__icon--globe">🌍</div>

				{/* Introductory heading content */}
				<div className="start-screen__heading">
					<h1 className="start-screen__heading-title">Welcome!</h1>
					<p className="start-screen__heading-subtitle">Ready to test your geography knowledge?</p>
				</div>

				{/* Game rules overview */}
				<div className="start-screen__rules">
					<h2 className="start-screen__rules-title">How to Play:</h2>
					<ul className="start-screen__rules-list">
						<li className="start-screen__rules-item">
							<span className="start-screen__rules-icon">•</span>
							Identify the country from 10 different flags
						</li>
						<li className="start-screen__rules-item">
							<span className="start-screen__rules-icon">•</span>Choose the correct answer from 4 options
						</li>
						<li className="start-screen__rules-item">
							<span className="start-screen__rules-icon">•</span>You have 10 seconds per question
						</li>
						<li className="start-screen__rules-item">
							<span className="start-screen__rules-icon">•</span>Earn 1 point for each correct answer
						</li>
					</ul>
				</div>

				{/* Action buttons */}
				<button className="start-screen__button start-screen__button--primary" type="button">
					<i className="start-screen__icon start-screen__icon--play lni lni-play"></i>
					Start Game
				</button>
				<button className="start-screen__button start-screen__button--secondary" type="button">
					<i className="start-screen__icon start-screen__icon--exit lni lni-exit"></i>Exit
				</button>
			</div>
		</section>
	);
}

export default StartScreen;
