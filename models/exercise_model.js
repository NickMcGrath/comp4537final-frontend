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