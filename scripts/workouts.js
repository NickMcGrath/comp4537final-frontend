import {create_workout, get_workouts, delete_workout} from "../models/workout_model.js";

const add_workout_button = document.getElementById("add-workout");

(async () => {
    let data = await get_workouts();
    if (data.length === 0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3");
        element.classList.toggle("text-center");
        element.id = "no-workouts";
        element.innerHTML = "You have not created any workouts.";
        container.appendChild(element);
    } else {
        for (let workout of data) {
            await render_workout(workout);
        }
    }
})();

add_workout_button.onclick = create_and_render;

async function render_workout(data) {
    console.log(data);
    let date = new Date(Date.parse(data.date_created)).toDateString();
    let button_id = `delete-${data.id}`;
    let div = document.createElement("div");
    div.id = `workout-${data.id}`;
    console.log(div.id);
    div.classList.add("container", "border", "border-primary", "rounded", "m-2");
    div.innerHTML = `
    <div class="row align-items-center">
        <div class="col-7">
            Workout ${date}
        </div>
        <div class="col-5 text-right p-1">
            <button type="button" class="btn btn-success" onclick="window.location.href='./sets.html?workout_id=${data.id}'">Edit</button>
            <button id="${button_id}" type="button" class="btn btn-danger">&times;</button
        </div>
    </div>`;
    let container = document.getElementById("main-content");
    container.appendChild(div);
    document.getElementById(button_id).onclick = await delete_handler(data.id);
}

async function create_and_render() {
    let no_workouts_text = document.getElementById("no-workouts");
    if (no_workouts_text) {
        no_workouts_text.remove();
    }
    try {
        let response = await create_workout();
        render_workout(response);
    } catch (err) {
        console.log(err);
    }
}

async function delete_handler(workout_id) {
    return () => {
        try {
            delete_workout(workout_id);
            document.getElementById(`workout-${workout_id}`).remove();
        } catch (err) {
            console.log(err);
        }
    }
}