import strings from "../scripts/strings.js";
import errors from "../scripts/errors.js";

export async function get_workouts() {
    let response = await fetch(`${strings.BASE_URL}/workouts/latest`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        } else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

export async function create_workout() {
    let response = await fetch(`${strings.BASE_URL}/workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        } else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

export async function delete_workout(workout_id) {
    let response = await fetch(`${strings.BASE_URL}/workouts/${workout_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        } else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
}