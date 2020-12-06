import {get_sets} from "../models/set_model.js";

const add_set_button = document.getElementById("add-set");
const url_params = new URLSearchParams(window.location.search);
const workout_id = url_params.get('workout_id');

add_set_button.onclick = () => {
    window.location.href = `./set-create.html?workout_id=${workout_id}`;
}

(async () => {
    let data = await get_sets(workout_id);
    if (data.length===0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3");
        element.classList.toggle("text-center");
        element.id = "no-sets";
        element.innerHTML = "You have not created any sets."
        container.appendChild(element);
    } else {
        for (let i = 0; i < data.length; i++) {
            render_set(data[i], i+1);
        }
    }
})();

function render_set(data, index) {
    let div = document.createElement("div");
    let button_id = `edit-set-${data.id}`;
    div.classList.add("container", "border", "border-primary", "rounded", "m-2");
    div.innerHTML = `
    <div class="row align-items-center">
        <div class="col-9">
            Set ${index}
        </div>
        <div class="col-3 text-right p-1">
            <button id="${button_id}" type="button" class="btn btn-success">Edit</button>
        </div>
    </div>`;
    let container = document.getElementById("main-content");
    container.appendChild(div);
    document.getElementById(button_id).onclick = edit_set(data);
}

function edit_set(data) {
    return () => {
        console.log("Edit data: ", data);
        localStorage.setItem("current_set", JSON.stringify(data));
        window.location.href = "./set-update.html";
    }
}
