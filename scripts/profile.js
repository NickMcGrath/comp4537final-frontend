import {get_form_data, image_to_blob, is_valid_form_data} from "./profile-common.js";
import {get_profile, fill_form_data} from "./get-profile.js";
import errors from "./error.js";
import strings from "./strings.js";

const update_button = document.getElementById("update");
const feedback = document.getElementById("feedback");

(async () => {
    try {
        let data = await get_profile();
        fill_form_data(data);
    } catch (err) {
        console.log(err);
    }
})();

update_button.addEventListener("click", async () => {
    let data = await get_profile_data();
    if (!is_valid_form_data(data)) {
        return;
    }
    try {
        await update(data);
    } catch (err) {
        if (err instanceof errors.UserExistsError || err instanceof errors.ValidationError) {
            feedback.innerHTML = err.message;
        } else {
            console.log(err);
        }
    }
});

async function update(data) {
    let response = await fetch(`${strings.BASE_URL}/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("User not found");
        } else {
            throw new errors.ValidationError("Server could not validate fields");
        }
    } else {
        feedback.classList.toggle("text-danger");
        feedback.classList.toggle("text-success");
        feedback.innerHTML = "Saved";
    }
}

function get_image_blob() {
    return new Promise((res, rej) => {
        let file = document.getElementById("image");
        if (file.files.length === 0)
            res(document.getElementById("display-image").src);
        file = file.files[0];

        let file_reader = new FileReader();

        file_reader.addEventListener("load", () => {
            console.log("image_to_blob() Encoded!");
            console.log(file_reader.result);
            res(file_reader.result);
        }, false);

        file_reader.onerror = (e) => {
            rej(new Error("Base64 error\n" + e));
        };

        file_reader.readAsDataURL(file);
    });
}

async function get_profile_data() {
    return {
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "age": document.getElementById("age").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs",
        "image": await get_image_blob()
    };
}