import strings from "../scripts/strings.js";
import errors from "../scripts/errors.js";

export async function get_exercises() {
    let response = await fetch(`${strings.BASE_URL}/exercises`, {
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

export function cache_exercises(data) {
    localStorage.setItem("exercises", JSON.stringify(data));
}

export function get_exercises_from_cache() {
    let local_exercises = localStorage.getItem("exercises");
    return local_exercises ? JSON.parse(local_exercises) : undefined;
}