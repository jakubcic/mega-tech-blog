const signupFormHandler = async (event) => {
	event.preventdefault();
	const username = document.querySelector('#signup-username').value.trim();
	const password = document.querySelector('#signup-password').value.trim();

	if (username && password) {
		const response = await fetch('/api/users', {
			method: 'post',
			body: JSON.stringify({
				username,
				password,
			}),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
