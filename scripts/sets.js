import strings from "./strings.js";
import errors from "./error.js";

const add_set_button = document.getElementById("add-set");
const url_params = new URLSearchParams(window.location.search);
const id = url_params.get('id');

(async () => {
    let data = await get_sets();
    if (data.length===0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3")
        element.id = "no-sets";
        element.innerHTML = "You have not created any sets."
        container.appendChild(element);
    } else {
        for (let set of data) {
            render_set(set);
        }
    }
})();

add_set_button.onclick = create_and_render;

async function get_sets() {
    let response = await fetch(`${strings.BASE_URL}/workouts/${id}/sets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        }
        else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

async function create_set() {
    let response = await fetch(`${strings.BASE_URL}/workouts/${id}/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
    })
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        }
        else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

function render_set(data) {
    let date = new Date(Date.parse(data.date_created)).toDateString();
    let div = document.createElement("div");
    div.classList.add("container", "border", "border-primary", "rounded", "m-2");
    div.innerHTML = `
    <div class="row align-items-center">
        <div class="col-9">
            Workout ${date}
        </div>
        <div class="col-3 text-right p-1">
            <button type="button" class="btn btn-success" onclick="window.location.href='./sets.html?id=${data.id}'">Edit</button>
        </div>
    </div>`;
    let container = document.getElementById("main-content");
    container.appendChild(div);
}

async function create_and_render() {
    let no_sets_text = document.getElementById("no-sets");
    if (no_sets_text) {
        no_sets_text.remove();
    }
    try {
        let response = await create_set();
        render_set(response);
    } catch (err) {
        console.log(err);
    }
}