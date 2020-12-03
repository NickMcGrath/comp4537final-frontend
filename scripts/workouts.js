import strings from "./strings.js";
import errors from "./error.js";

const add_workout_button = document.getElementById("add-workout");

(async () => {
    let data = await get_workouts();
    if (data.length===0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3")
        element.id = "no-workouts";
        element.innerHTML = "You have not created any workouts."
        container.appendChild(element);
    } else {
        for (let workout of data) {
            render_workout(workout);
        }
    }
})();

add_workout_button.onclick = create_and_render;

async function get_workouts() {
    let response = await fetch(`${strings.BASE_URL}/workouts/latest`, {
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

async function create_workout() {
    let response = await fetch(`${strings.BASE_URL}/workouts`, {
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

function render_workout(data) {
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