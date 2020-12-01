import strings from "./strings.js";
import errors from "./error.js";

const login_button = document.getElementById("login");
const signup_button = document.getElementById("sign-up");
const feedback = document.getElementById("feedback");

login_button.addEventListener("click", async () => {
    let data = get_user_data();
    if (!is_valid_user_data(data)) {
        return;
    }
    try {
        let result = await login(data);
        if (result.token) {
            window.localStorage.setItem("token", result.token);
            window.location.href = "./workouts.html";
        }
    } catch (err) {
        if (err instanceof errors.AuthenticationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

signup_button.addEventListener("click", async () => {
    let data = get_user_data();
    if (!is_valid_user_data(data)) {
        return;
    }
    try {
        let result = await signup(data);
        window.localStorage.setItem("token", result.token);
        window.location.href = "./create-profile.html";
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

function get_user_data() {
    return {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
}

function is_valid_user_data(data) {
    let valid = true;
    if (!data.username) {
        document.getElementById("username-invalid").innerText = "Username cannot be empty";
        valid = false;
    }
    if (!data.password) {
        document.getElementById("password-invalid").innerHTML = "Password cannot be empty";
        valid = false;
    }
    if (data.password.length < 8) {
        document.getElementById("password-invalid").innerHTML = "Password must be at least 8 characters";
        valid = false;
    }
    return valid;
}

async function login(data) {
    let response = await fetch(`${strings.BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("User not found");
        }
        else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    }
    return response.json();
}

async function signup(data) {
    let response = await fetch(`${strings.BASE_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        if (response.status === 409) {
            throw new errors.UserExistsError("Username already exists");
        }
        else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    }
    return response.json();
}

