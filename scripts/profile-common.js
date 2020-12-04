export async function get_form_data() {
    return {
        "first_name": document.getElementById("first_name").value,
        "last_name": document.getElementById("last_name").value,
        "age": document.getElementById("age").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs",
        "image": await image_to_blob("display-image")
    };
}

export function is_valid_form_data(data) {
    let valid = true;
    if (!data.first_name.length || data.first_name.length > 45) {
        document.getElementById("first-name-invalid").innerText = "must be between 1 and 45 characters";
        valid = false;
    }
    if (!data.last_name.length || data.last_name.length > 45) {
        document.getElementById("last-name-invalid").innerText = "must be between 1 and 45 characters";
        valid = false;
    }
    if (!data.age || data.age < 1 || data.age > 130) {
        document.getElementById("age-invalid").innerText = "must be between 1 and 130";
        valid = false;
    }
    if (!data.weight_value || data.weight_value < 1 || data.weight_value > 1000) {
        document.getElementById("weight-invalid").innerText = "must be between 1 and 1000";
        valid = false;
    }
    if (!data.image || data.image.size > 2000000) {
        document.getElementById("image-invalid").innerText = "must be an image and under 2MB";
        valid = false;
    }
    return valid;
}

/**
 * Converts an image to Base64.
 * @param file_tag id of the input type='file' element
 * @return Promise, on success returns Base64 image
 */
export function image_to_blob(file_tag) {
    return new Promise((res, rej) => {
        let file = document.getElementById(file_tag).files[0];
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