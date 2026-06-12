/* ==================================
    COMPONENT: SIGN-UP

    Sign-up form component
        - Handles user sign-up input 
          and submission
		- Validates input and 
		  provides feedback
===================================== */

import { useState } from "react";

import FormField from "./FormField";
import { validateUsername, validatePassword } from "./authValidation";

function SignUp({ onToggleLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessages, setErrorMessages] = useState({
		username: "",
		password: "",
	});

	// Handle sign-up form submission
	const handleSignUp = (event) => {
		event.preventDefault();

		// Validate username and password input
		const usernameErrorMessage = validateUsername(username);
		const passwordErrorMessage = validatePassword(password);

		// Store error messages based on validation results
		setErrorMessages({
			username: usernameErrorMessage,
			password: passwordErrorMessage,
		});

		// Check if there are any validation errors before proceeding with sign-up
		if (usernameErrorMessage || passwordErrorMessage) {
			return;
		} else {
			const userAccount = {
				username: username,
				password: password,
			};

			localStorage.setItem("userAccount", JSON.stringify(userAccount));
			setSuccessMessage("Sign-up successful!");
			setUsername("");
			setPassword("");

			setTimeout(() => {
				onToggleLogin();
			}, 1500);
		}
	};

	return (
		<form className="account-forms__form" onSubmit={handleSignUp}>
			{/* Username input field */}
			<FormField
				id="signup-username"
				label="Username"
				type="text"
				placeholder="Choose username"
				icon="lni lni-user-4"
				value={username}
				onChange={(event) => {
					setUsername(event.target.value);
				}}
				onFocus={() => {
					setErrorMessages({ ...errorMessages, username: "" });
				}}
				feedbackMessage={errorMessages.username}
			/>

			{/* Password input field */}
			<FormField
				id="signup-password"
				label="Password"
				type="password"
				placeholder="Choose password"
				icon="lni lni-locked-2"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);
				}}
				onFocus={() => {
					setErrorMessages({ ...errorMessages, password: "" });
				}}
				feedbackMessage={errorMessages.password}
			/>

			{/* Display feedback messages for invalid inputs */}
			{(errorMessages.username || errorMessages.password) && (
				<div className="account-forms__feedback account-forms__feedback--error">
					{errorMessages.username && <p className="account-forms__feedback-message">{errorMessages.username}</p>}

					{errorMessages.password && <p className="account-forms__feedback-message">{errorMessages.password}</p>}
				</div>
			)}

			{/* Display feedback message for successful inputs */}
			{successMessage && <p className="account-forms__feedback account-forms__feedback--success">{successMessage}</p>}

			{/* Sign-up button */}
			<button className="account-forms__button" type="submit">
				Sign-Up
			</button>
		</form>
	);
}

export default SignUp;
