/* ==================================
    COMPONENT: SIGN-UP

    Sign-up form component
        - Handles user sign-up input 
          and submission
===================================== */

import FormField from "./FormField";

function SignUp({ onToggleLogin }) {
	// Handle sign-up form submission
	const handleSignUp = (event) => {
		event.preventDefault();

		onToggleLogin();
	};

	return (
		<form className="account-forms__form" onSubmit={handleSignUp}>
			{/* Username input field */}
			<FormField id="signup-username" label="Username" type="text" placeholder="Choose username" icon="lni lni-user-4" />

			{/* Password input field */}
			<FormField
				id="signup-password"
				label="Password"
				type="password"
				placeholder="Choose password"
				icon="lni lni-locked-2"
			/>

			{/* Sign-up button */}
			<button className="account-forms__button" type="submit">
				Sign-Up
			</button>
		</form>
	);
}

export default SignUp;
