import {get_form_data, is_valid_form_data} from "./profile-common.js";
import {get_profile, update_profile} from "../models/profile_model.js";
import errors from "./errors.js";

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
        let result = await update_profile(data);
        if (result) {
            feedback.innerHTML = "Saved";
        }
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

function fill_form_data(data) {
    document.getElementById("first_name").value = data.first_name;
    document.getElementById("last_name").value = data.last_name;
    document.getElementById("age").value = data.age;
    document.getElementById("weight").value = data.weight_value;
    document.querySelector(`input[value="${data.weight_unit}"]`).checked = true;
    document.getElementById("display-image").src = data.image;
}

