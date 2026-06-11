/* ==================================
    COMPONENT: GAME RESULT

    Renders game result screen with 
	final score and actions for
	replaying the game or returning 
	to start screen
===================================== */

import "./GameResult.css";

function GameResult({ score, totalQuestions, onPlayAgain, onBackToStart }) {
	return (
		<section className="game-result">
			{/* Result card container */}
			<div className="game-result__card">
				{/* Trophy icon */}
				<div className="game-result__icon">
					<i className="game-result__icon-trophy lni lni-trophy-1"></i>
				</div>

				{/* Result heading */}
				<h1 className="game-result__title">Game Over!</h1>

				{/* Final score summary */}
				<p className="game-result__score">
					<span className="game-result__score-value">{score}</span>
					<span className="game-result__score-divider"> / </span>
					<span className="game-result__score-total">{totalQuestions}</span>
				</p>

				{/* Action buttons */}
				<button className="game-result__button game-result__button--primary" type="button" onClick={onPlayAgain}>
					<i className="game-result__icon game-result__icon--play lni lni-refresh-circle-1-clockwise"></i>
					Play Again
				</button>
				<button className="game-result__button game-result__button--secondary" type="button" onClick={onBackToStart}>
					<i className="game-result__icon game-result__icon--exit lni lni-exit"></i>
					Back to Menu
				</button>
			</div>
		</section>
	);
}

export default GameResult;
