/* ==================================
    COMPONENT: LOGIN

    Login form component
        - Handles user login input 
          and submission
===================================== */

import FormField from "./FormField";

function Login({ onLogin }) {
	// Handle login form submission
	const handleLogin = (event) => {
		event.preventDefault();

		onLogin();
	};

	return (
		<form className="account-forms__form" onSubmit={handleLogin}>
			{/* Username input field */}
			<FormField id="login-username" label="Username" type="text" placeholder="Enter username" icon="lni lni-user-4" />

			{/* Password input field */}
			<FormField
				id="login-password"
				label="Password"
				type="password"
				placeholder="Enter password"
				icon="lni lni-locked-2"
			/>

			{/* Login button */}
			<button className="account-forms__button" type="submit">
				Login
			</button>
		</form>
	);
}

export default Login;
