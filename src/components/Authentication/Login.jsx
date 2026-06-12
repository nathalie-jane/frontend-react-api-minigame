/* ==================================
    COMPONENT: LOGIN

    Login form component
        - Handles user login input 
          and submission
		- Validates input against 
		  stored account data
===================================== */

import { useState } from "react";

import FormField from "./FormField";

function Login({ onLogin }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [feedbackMessage, setFeedbackMessage] = useState("");

	// Handle login form submission
	const handleLogin = (event) => {
		event.preventDefault();

		// Get saved account from local storage
		const storedAccount = JSON.parse(localStorage.getItem("userAccount"));

		// Display feedback if no account has been created
		if (!storedAccount) {
			setFeedbackMessage("No account found. Please create an account first.");
			return;
		}

		// Validate username and password against stored account data
		const isUsernameMatch = storedAccount.username === username;
		const isPasswordMatch = storedAccount.password === password;

		// Display feedback based on validation results
		if (!isUsernameMatch || !isPasswordMatch) {
			setFeedbackMessage("Invalid username or password.");
			return;
		} else {
			setFeedbackMessage("Login successful!");

			setTimeout(() => {
				onLogin();
			}, 1500);
		}
	};

	return (
		<form className="account-forms__form" onSubmit={handleLogin}>
			{/* Username input field */}
			<FormField
				id="login-username"
				label="Username"
				type="text"
				placeholder="Enter username"
				icon="lni lni-user-4"
				value={username}
				onChange={(event) => {
					setUsername(event.target.value);
					setFeedbackMessage("");
				}}
			/>

			{/* Password input field */}
			<FormField
				id="login-password"
				label="Password"
				type="password"
				placeholder="Enter password"
				icon="lni lni-locked-2"
				value={password}
				onChange={(event) => {
					setPassword(event.target.value);
					setFeedbackMessage("");
				}}
			/>

			{/* Display feedback message */}
			{feedbackMessage && (
				<p
					className={`account-forms__feedback ${
						feedbackMessage === "Login successful!"
							? "account-forms__feedback--success"
							: "account-forms__feedback--error"
					}`}>
					{feedbackMessage}
				</p>
			)}

			{/* Login button */}
			<button className="account-forms__button" type="submit">
				Login
			</button>
		</form>
	);
}

export default Login;
