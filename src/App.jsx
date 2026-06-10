import { useState } from "react";

import StartGame from "./components/StartGame/StartGame";
import FlagQuizGame from "./components/FlagQuizGame/FlagQuizGame";

function App() {
	const [isGameRunning, setIsGameRunning] = useState(false);

	const handleStartGame = () => {
		setIsGameRunning(true);
	};

	const handleExitGame = () => {
		setIsGameRunning(false);
	};

	return (
		<main className="site-main">
			{isGameRunning ? <FlagQuizGame onExitGame={handleExitGame} /> : <StartGame onStartGame={handleStartGame} />}
		</main>
	);
}

export default App;

