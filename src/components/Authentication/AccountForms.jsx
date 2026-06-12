import { useState } from "react";

import "./Authentication.css";

function AccountForms() {
	const [selectedForm, setSelectedForm] = useState("login");

	const isLoginFormActive = selectedForm === "login";

	const displayLoginForm = () => {
		setSelectedForm("login");
	};

	const displaySignupForm = () => {
		setSelectedForm("signup");
	};

	return (
		<section className="account-forms">
			<div className="account-forms__card">
				<header className="account-forms__header">
					<h1 className="account-forms__title">🌍 Flag Game</h1>
					<p className="account-forms__subtitle">Test your geography knowledge!</p>
				</header>
				<div className="account-forms__toggle-form">
					<button
						className={`account-forms__toggle-button ${isLoginFormActive ? "account-forms__toggle-button--active" : ""}`}
						type="button"
						onClick={displayLoginForm}>
						Login
					</button>
					<button
						className={`account-forms__toggle-button ${!isLoginFormActive ? "account-forms__toggle-button--active" : ""}`}
						type="button"
						onClick={displaySignupForm}>
						Sign Up
					</button>
				</div>

				<form className="account-forms__form">
					<div className="account-forms__field">
						<label className="account-forms__label" htmlFor="username">
							Username
						</label>
						<div className="account-forms__input-group">
							<i className="account-forms__input-icon lni lni-user-4"></i>
							<input
								className="account-forms__input"
								id="username"
								type="text"
								placeholder="Enter username"
								required
							/>
						</div>
					</div>

					<div className="account-forms__field">
						<label className="account-forms__label" htmlFor="password">
							Password
						</label>
						<div className="account-forms__input-group">
							<i className="account-forms__input-icon lni lni-locked-2"></i>
							<input
								className="account-forms__input"
								id="password"
								type="password"
								placeholder="Enter password"
								required
							/>
						</div>
					</div>
					<button className="account-forms__button" type="submit">
						Login
					</button>
				</form>
			</div>
		</section>
	);
}

export default AccountForms;
