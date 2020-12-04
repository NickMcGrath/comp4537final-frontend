import strings from "./strings.js";
import errors from "./error.js";

const add_set_button = document.getElementById("add-set");
const url_params = new URLSearchParams(window.location.search);
const id = url_params.get('id');

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
    let div = document.createElement("div");
    div.classList.add("container", "border", "border-primary", "rounded", "m-2");
    div.innerHTML = `
    <div class="spacer"></div>
    <label for="first_name">First Name</label>
    <small id="first-name-invalid" class="text-danger"></small>
    <div class="input-group mb-3">
        <input id='first_name' type="text" class="form-control" aria-label="First Name">
    </div>
    <label for="last_name">Last Name</label>
    <small id="last-name-invalid" class="text-danger"></small>
    <div class="input-group mb-3">
        <input id='last_name' type="text" class="form-control" aria-label="Last Name">
    </div>
    <label for="age">Age</label>
    <small id="age-invalid" class="text-danger"></small>
    <div class="input-group mb-3">
        <input id='age' type="number" class="form-control" aria-label="Age">
    </div>
    <label for="weight">Weight</label>
    <small id="weight-invalid" class="text-danger"></small>
    <div class="input-group mb-3">
        <input id='weight' type="text" class="form-control" aria-label="Weight">
        <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label id="lbs" class="btn btn-secondary">
                <input type="radio" name="weight_unit" value="lbs">lbs
            </label>
            <label id="kgs" class="btn btn-secondary">
                <input type="radio" name="weight_unit" value="kgs">kgs
            </label>
        </div>
    </div>
    <div class="text-right">
        <small id="feedback" class="text-danger mr-2"></small>
        <button id="update" type="button" class="btn btn-primary">Update</button>
    </div>`
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