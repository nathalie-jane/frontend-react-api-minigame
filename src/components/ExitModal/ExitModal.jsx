/* ==================================
    COMPONENT: EXIT MODAL

    Renders exit confirmation dialog 
    when user attempts to exit game
===================================== */

import "./ExitModal.css";

function ExitModal({ onCancelExit, onConfirmExit }) {
	return (
		<div className="exit-modal">
			{/* Background overlay */}
			<div className="exit-modal__overlay">
				{/* Exit game confirmation prompt */}
				<dialog open className="exit-modal__prompt">
					{/* Header with title and close button */}
					<header className="exit-modal__header">
						<h2 className="exit-modal__title">Exit Game?</h2>
						<button className="exit-modal__exit-button" type="button" onClick={onCancelExit}>
							<i className="exit-modal__exit-icon lni lni-xmark"></i>
						</button>
					</header>

					{/* Exit confirmation message */}
					<p className="exit-modal__message">Are you sure you want to exit? Your current progress will be lost.</p>

					{/* Action buttons */}
					<div className="exit-modal__actions">
						<button className="exit-modal__button exit-modal__button--primary" type="button" onClick={onCancelExit}>
							Cancel
						</button>
						<button
							className="exit-modal__button exit-modal__button--secondary"
							type="button"
							onClick={onConfirmExit}>
							Exit
						</button>
					</div>
				</dialog>
			</div>
		</div>
	);
}

export default ExitModal;
