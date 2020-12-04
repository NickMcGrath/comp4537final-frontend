import strings from "../scripts/strings.js";
import errors from "../scripts/errors.js";

export async function get_profile() {
    let response = await fetch(`${strings.BASE_URL}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
    if (!response.ok) {
        if (response.status === 404) {
            throw new errors.AuthenticationError("Profile not found");
        } else {
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

export async function create_profile(data) {
    let response = await fetch(`${strings.BASE_URL}/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        if (response.status === 409) {
            throw new errors.UserExistsError("You have already created a profile");
        } else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    } else {
        window.location.href = "./workouts.html";
    }
}

export async function update_profile(data) {
    let response = await fetch(`${strings.BASE_URL}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("User not found");
        } else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    } else {
        return true;
    }
}