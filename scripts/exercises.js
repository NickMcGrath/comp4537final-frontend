import strings from "./strings.js";
import errors from "./error.js";


(async () => {
    render_exercises(await get_exercises());
})();


async function get_exercises() {
    let response = await fetch(`${strings.BASE_URL}/exercises`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    });
    if (!response.ok) {
        if (response.status === 401) {
            throw new errors.AuthenticationError("Not authenticated");
        } else {
            console.log(response);
            throw new errors.ServerError("Server error");
        }
    }
    return await response.json();
}

function render_exercises(data) {
    let div = document.createElement("div");
    let inner_html = "";
    div.classList.add("container", "border", "border-primary", "rounded", "m-2");
    inner_html += `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
    <tbody>`;
    for (let exercises of data)
        inner_html += `<tr>
          <td>${exercises.name}</td>
          <td>${exercises.description}</td>
        </tr>`;
    inner_html += `</tbody></table>`;
    div.innerHTML = inner_html;
    let container = document.getElementById("main-content");
    container.appendChild(div);
}