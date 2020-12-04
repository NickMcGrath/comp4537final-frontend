import {get_form_data, is_valid_form_data} from "./profile-common.js";
import {get_profile, fill_form_data} from "./get-profile.js";
import errors from "./error.js";
import strings from "./strings.js";

const update_button = document.getElementById("update");
const feedback = document.getElementById("feedback");

(async () => {
    try {
        let data = await get_profile();
        fill_form_data(data);
    } catch (err) {
        console.log(err);
    }
})();

update_button.addEventListener("click", async () => {
    let data = await get_form_data();
    if (!is_valid_form_data(data)) {
        return;
    }
    try {
        await update(data);
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
})

async function update(data) {
    let response = await fetch(`${strings.BASE_URL}/profile`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("User not found");
        } else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    } else {
        feedback.classList.toggle("text-danger");
        feedback.classList.toggle("text-success");
        feedback.innerHTML = "Saved";
    }
}