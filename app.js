const url = "http://localhost:8080/todos";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    return data;
  })
  .then((data) => render(data));

function render(data) {
  document.getElementById("app").innerHTML = `
  <h1 class="app-title">Todo List (${data.length} todos)</h1>
  ${data.map(todoTemplate).join("")}
  ${newTodo()}
  `;
  document.getElementById("add-button").addEventListener("click", postTodo);
}

function todoTemplate(todo) {
  console.log(todo);
  return `
      <div class="todo">
        <h2>${todo.id}. ${todo.name}</h2>
        <p>${todo.description}</p>
        <p>Is complete? ${todo.complete}</p>
         <form>
        <button id="delete-button" value="${todo.id}" onclick="deleteTodo(this.value)">X</button>
        <button id="complete-button" value="${todo.id}" onclick="completeTodo(this.value)">	✓</button>
        </form>
      </div>`;
}

function newTodo() {
  return `
  <div class="todo">
  <form>
    <label for="name">Name</label><br>
    <input type="text" id="name"><br>
    <label for="description">Description</label><br>
    <input type="text" id="description"><br>
    <button id="add-button">+</button>
  </form>
  </div>
  `;
}

async function postTodo(event) {
  event.preventDefault();
  let data = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
  };
  const response = await fetch(url + "/add", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json)
    .then((data) => {
      console.log("Successs:", data);
    })
    .catch((error) => {
      console.log(error);
    });
  document.location.reload();
}

async function deleteTodo(id) {
  const response = await fetch(url + "/delete/" + id, {
    method: "DELETE",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json)
    .then((data) => {
      console.log("Successs:", data);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function completeTodo(id) {
  const response = await fetch(url + "/complete/" + id, {
    method: "PUT",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json)
    .then((data) => {
      console.log("Successs:", data);
    })
    .catch((error) => {
      console.log(error);
    });
}
