//define variables
const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const alertContainer = document.getElementById('alertContainer');

//add event listener to form
form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAlerts();
    const isValid = validateForm();
    if (isValid) {
        showSuccess('Account created successfully!');
        form.reset();
        setTimeout(() => {
            clearAlerts();
        }, 5000);
    }
});

//validate form to check if form is valid liek a check mater
function validateForm() {
    let isValid = true;
    let errors = [];

    if (username.value.trim().length < 3) {
        errors.push('Name must be at least 3 characters');
        username.classList.add('input-invalid');
        isValid = false;
    } else {
        username.classList.remove('input-invalid');
    }

    if (!isValidEmail(email.value)) {
        errors.push('Please enter a valid email address');
        email.classList.add('input-invalid');
        isValid = false;
    } else {
        email.classList.remove('input-invalid');
    }

    if (password.value.length < 8) {
        errors.push('Password must be at least 8 characters');
        password.classList.add('input-invalid');
        isValid = false;
    } else {
        password.classList.remove('input-invalid');
    }

    if (errors.length > 0) {
        errors.forEach(err => showError(err));
    }

    return isValid;
}


//validate the email address
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//function to show error messagein prestyled error class
function showError(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-error';
    alert.textContent = message;
    alertContainer.appendChild(alert);
}

//function to show success message prestyled success class
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.textContent = message;
    alertContainer.appendChild(alert);
}

//function to clear alerts
function clearAlerts() {
    alertContainer.innerHTML = '';
}

//add event listener to each input field
[username, email, password].forEach(input => {
    input.addEventListener('input', () => {
        if (input.classList.contains('input-invalid')) {
            validateSingle(input);
        }
    });
});

//function to validate single input field
//user name must be greater than 3 characters
//email must be valid email address
//password must be greater than 8 characters
function validateSingle(input) {
    if (input.id === 'username') {
        if (username.value.trim().length >= 3) username.classList.remove('input-invalid');
    } else if (input.id === 'email') {
        if (isValidEmail(email.value)) email.classList.remove('input-invalid');
    } else if (input.id === 'password') {
        if (password.value.length >= 8) password.classList.remove('input-invalid');
    }
}
