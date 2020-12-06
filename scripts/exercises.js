import {cache_exercises, get_exercises} from "../models/exercise_model.js";

(async () => {
    let exercises = await get_exercises();
    cache_exercises(exercises);
    render_exercises(exercises);
})();

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