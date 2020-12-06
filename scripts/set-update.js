import {update_set} from "../models/set_model.js";
import {get_form_data, is_valid_form_data} from "./set-common.js";
import errors from "./errors.js";

const update_button = document.getElementById("update-set");
const feedback = document.getElementById("feedback");
const data = JSON.parse(localStorage.getItem("current_set"));

console.log(data);

fill_form_data(data);

update_button.addEventListener("click", async () => {
    let new_data = get_form_data();
    if (!is_valid_form_data(new_data)) {
        return;
    }
    try {
        await update_set(new_data, data.id);
        window.location.href = `./sets.html?workout_id=${data.workout_id}`;
    } catch (err) {
        if (err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

function fill_form_data(data) {
    document.getElementById("exercise").value = data.exercise_id;
    document.getElementById("reps").value = data.reps;
    document.getElementById("weight").value = data.weight_value;
    document.querySelector(`input[value="${data.weight_unit}"]`).checked = true;
    document.getElementById("timer").value = data.timer;
}