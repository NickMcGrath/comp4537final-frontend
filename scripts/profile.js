function get_data() {
    return {
        "first_name": document.getElementById("f_name").value,
        "last_name": document.getElementById("l_name").value,
        "age": document.getElementById("age").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs"
    };
}

function pre_send_validate(data) {
    return true;
}

function submit() {
    let data = get_data();
    console.log(data)
    let is_valid = pre_send_validate(data);
    if (is_valid !== true) {
        document.getElementById("result").innerHTML = is_valid;
        return;
    }
}