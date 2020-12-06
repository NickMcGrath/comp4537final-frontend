export function get_form_data() {
    return {
        "exercise_id": document.getElementById("exercise").value,
        "reps": document.getElementById("reps").value,
        "weight_value": document.getElementById("weight").value,
        "weight_unit": (document.getElementById("lbs").classList.value.includes("active")) ? "lbs" : "kgs",
        "timer": document.getElementById("timer").value
    };
}

export function is_valid_form_data(data) {
    let valid = true;
    if (!parseInt(data.exercise_id) || data.exercise_id < 1) {
        document.getElementById("exercise-invalid").innerText = "please select an exercise";
        valid = false;
    }
    if (!data.reps || data.age < 1 || data.age > 2000) {
        document.getElementById("reps-invalid").innerText = "must be between 1 and 2000";
        valid = false;
    }
    if (data.weight_value && (data.weight_value < 1 || data.weight_value > 1000)) {
        document.getElementById("weight-invalid").innerText = "must be between 1 and 1000";
        valid = false;
    }
    if (!data.timer && data.timer < 0 || data.timer > 7200) {
        document.getElementById("timer-invalid").innerText = "must be between 0 and 7200";
        valid = false;
    }
    return valid;
}