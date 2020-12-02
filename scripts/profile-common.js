export function get_form_data() {
    return {
        "first_name": document.getElementById("f_name").value,
        "last_name": document.getElementById("l_name").value,
        "age": document.getElementById("age").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs"
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
    return valid;
}