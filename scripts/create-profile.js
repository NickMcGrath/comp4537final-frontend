import strings from "./strings.js";

const create_button = document.getElementById("create");

create_button.addEventListener("click", () => {
    let data = get_profile_data();
    if (!is_valid_profile_data(data)) {
        return;
    }
    create().catch();
})

function get_profile_data() {
    return {
        "first_name": document.getElementById("f_name").value,
        "last_name": document.getElementById("l_name").value,
        "age": document.getElementById("age").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs"
    };
}

function is_valid_profile_data(data) {
    let valid = true;
    if (!data.first_name.length || data.first_name.length > 40) {

    }
}

async function create() {

    try {
        let response = await fetch(`${strings.BASE_URL}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        })
        console.log(response);
        if (!response.ok) {
            console.log("Something happened on the server");
        }
    } catch (err) {
        console.log(err);
    }
}