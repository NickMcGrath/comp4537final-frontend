function get_data() {
    return {
        "email": document.getElementById("email").value,
        "promoCode": document.getElementById("promoCode").value
    };
}

function pre_send_validate(data) {
    let email_regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email_regex.test(data["email"]))
        return "Invalid email";
    return true;
}

function submit() {
    let data = get_data();
    console.log(data)
    let is_valid = pre_send_validate(data);
    if (is_valid !== true)
        document.getElementById("result").innerHTML = is_valid;

}