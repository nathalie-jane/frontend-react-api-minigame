/* ==================================
    COMPONENT: ACCOUNT FORMS

	Renders login and sign-up forms
	with toggle buttons for switching
	between the two forms
===================================== */

import { useState } from "react";

import Login from "./Login";
import SignUp from "./SignUp";

import "./Authentication.css";

function AccountForms({ onLogin }) {
	const [selectedForm, setSelectedForm] = useState("login");

	// Check if login form is active
	const isLoginFormActive = selectedForm === "login";

	// Display login form
	const displayLoginForm = () => {
		setSelectedForm("login");
	};

	// Display sign-up form
	const displaySignupForm = () => {
		setSelectedForm("signup");
	};

	return (
		<section className="account-forms">
			{/* Form card */}
			<div className="account-forms__card">
				{/* Header with title and subtitle */}
				<header className="account-forms__header">
					<h1 className="account-forms__title">🌍 Flag Game</h1>
					<p className="account-forms__subtitle">Test your geography knowledge!</p>
				</header>

				{/* Toggle buttons for switching between login and sign-up forms */}
				<div className="account-forms__toggle-form">
					<button
						className={`account-forms__toggle-button ${
							isLoginFormActive ? "account-forms__toggle-button--active" : ""
						}`}
						type="button"
						onClick={displayLoginForm}>
						Login
					</button>

					<button
						className={`account-forms__toggle-button ${
							!isLoginFormActive ? "account-forms__toggle-button--active" : ""
						}`}
						type="button"
						onClick={displaySignupForm}>
						Sign Up
					</button>
				</div>

				{/* Display selected form */}
				{isLoginFormActive ? <Login onLogin={onLogin} /> : <SignUp onToggleLogin={displayLoginForm} />}
			</div>
		</section>
	);
}

export default AccountForms;
