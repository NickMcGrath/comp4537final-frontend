import strings from "../scripts/strings.js";
import errors from "../scripts/errors.js";

export async function get_sets(workout_id) {
    let response = await fetch(`${strings.BASE_URL}/workouts/${workout_id}/sets`, {
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

export async function create_set(data, workout_id) {
    let response = await fetch(`${strings.BASE_URL}/workouts/${workout_id}/set`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
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
    return true;
}

export async function update_set(data, set_id) {
    let response = await fetch(`${strings.BASE_URL}/sets/${set_id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
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
    return true;
}