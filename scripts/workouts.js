import strings from "./strings.js";
import errors from "./error.js";

(async () => {
    let data = await get_workouts();
    if (data.length===0) {
        let container = document.getElementById("main-content");
        let element = document.createElement("h3")
        element.innerHTML = "You have not created any workouts."
        container.appendChild(element);
    }
    console.log(data);
})()

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