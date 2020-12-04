import profile_common from "./profile-common.js";
import strings from "./strings.js";
import errors from "./error.js";

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

export function fill_form_data(data) {
    console.log(data);
    document.getElementById("first_name").value = data.first_name;
    document.getElementById("last_name").value = data.last_name;
    document.getElementById("age").value = data.age;
    document.getElementById("weight").value = data.weight_value;
    document.querySelector(`input[value="${data.weight_unit}"]`).checked = true;
    document.getElementById("image").src = data.image;
}