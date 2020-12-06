import {create_set} from "../models/set_model.js";
import {get_form_data, is_valid_form_data} from "./set-common.js";
import errors from "./errors.js";

const create_button = document.getElementById("create-set");
const feedback = document.getElementById("feedback");
const url_params = new URLSearchParams(window.location.search);
const workout_id = url_params.get('workout_id');

create_button.addEventListener("click", async () => {
    let data = await get_form_data();
    console.log(data);
    if (!is_valid_form_data(data)) {
        return;
    }
    try {
        await create_set(data, workout_id);
        window.location.href = `./sets.html?workout_id=${workout_id}`;
    } catch (err) {
        if (err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});