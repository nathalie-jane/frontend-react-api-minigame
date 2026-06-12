/* ==================================
	AUTHENTICATION VALIDATION

	Validation for account form inputs
===================================== */

// Validation patterns for username and password inputs
const validationPattern = {
	username: /^[A-Za-z0-9_-]+$/, // Allows only letters, numbers, underscore and hyphen
	passwordUppercase: /[A-Z]/, // At least one uppercase letter
	passwordLowercase: /[a-z]/, // At least one lowercase letter
	passwordNumber: /\d/, // At least one number
	passwordSpecialCharacter: /[!@#$%^&*?_-]/, // At least one special character
};

// Validation for username input
export function validateUsername(username) {
	const usernameLength = username.length;
	const isValidUsername = validationPattern.username.test(username);

	// Check for length (3-20 characters) and valid characters in username
	if (usernameLength < 3 || usernameLength > 20) {
		return "Username must be between 3-20 characters.";
	}

	if (!isValidUsername) {
		return "Please enter a valid username.";
	}

	return "";
}

// Validation for password input
export function validatePassword(password) {
	const passwordHasSpaces = password.includes(" ");
	const passwordLength = password.length;
	const passwordHasUppercase = validationPattern.passwordUppercase.test(password);
	const passwordHasLowercase = validationPattern.passwordLowercase.test(password);
	const passwordHasNumber = validationPattern.passwordNumber.test(password);
	const passwordHasSpecialCharacters = validationPattern.passwordSpecialCharacter.test(password);

	// Check for whitespace characters
	if (passwordHasSpaces) {
		return "Password cannot contain whitespace characters.";
	}

	// Check for minimum length (8 characters)
	if (passwordLength < 8) {
		return "Password must be at least 8 characters.";
	}

	// Check for required character types
	if (!(passwordHasUppercase && passwordHasLowercase && passwordHasNumber && passwordHasSpecialCharacters)) {
		return "Password must include at least one uppercase letter, a lowercase letter, a number and a special character.";
	}

	return "";
}
