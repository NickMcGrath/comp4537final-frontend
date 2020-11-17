function get_data() {
    return {
        "f_name": document.getElementById("f_name").value,
        "l_name": document.getElementById("l_name").value,
        "age": document.getElementById("age").value,
        "weight": document.getElementById("weight").value,
        "kg_lbs": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kg"
    };
}

function pre_send_validate(data) {
    return true;
}

function submit() {
    let data = get_data();
    console.log(data)
    let is_valid = pre_send_validate(data);
    if (is_valid !== true)
        document.getElementById("result").innerHTML = is_valid;

}