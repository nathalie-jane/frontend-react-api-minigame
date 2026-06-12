/* ==================================
    COMPONENT: FORM FIELD

	Reusable form field component for
	account forms
===================================== */

function FormField({ id, label, type, placeholder, icon }) {
	return (
		// Label and input group continer
		<div className="account-forms__field">
			<label className="account-forms__label" htmlFor={id}>
				{label}
			</label>

			{/* Wrapper for icon and input field */}
			<div className="account-forms__input-group">
				<i className={`account-forms__input-icon ${icon}`}></i>
				<input className="account-forms__input" id={id} type={type} placeholder={placeholder} required />
			</div>
		</div>
	);
}

export default FormField;
