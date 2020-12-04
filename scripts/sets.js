import {get_sets} from "../models/set_model.js";

const add_set_button = document.getElementById("add-set");
const url_params = new URLSearchParams(window.location.search);
const id = url_params.get('id');

add_set_button.onclick = () => {
    window.location.href = `./set-create.html?id=${id}`;
}

(async () => {
    let data = await get_sets();
    if (data.length===0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3");
        element.classList.toggle("text-center");
        element.id = "no-sets";
        element.innerHTML = "You have not created any sets."
        container.appendChild(element);
    } else {
        for (let set of data) {
            render_set(set);
        }
    }
})();

function render_set(data) {
}