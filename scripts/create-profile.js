import {get_form_data, is_valid_form_data, image_to_blob} from "./profile-common.js";
import strings from "./strings.js";
import errors from "./error.js";

const create_button = document.getElementById("create");
const feedback = document.getElementById("feedback");

create_button.addEventListener("click", async () => {
    let data = await get_form_data();
    if (!is_valid_form_data(data)) {
        return;
    }
    try {
        await create(data);
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

async function create(data) {
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