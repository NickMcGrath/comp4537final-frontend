import {get_form_data, is_valid_form_data} from "./profile-common.js";
import {create_profile} from "../models/profile_model.js";
import errors from "./errors.js";

const create_button = document.getElementById("create");
const feedback = document.getElementById("feedback");

create_button.addEventListener("click", async () => {
    let data = await get_form_data();
    if (!is_valid_form_data(data)) {
        return;
    }
    try {
        await create_profile(data);
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

