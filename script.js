// Get references to DOM elements
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

// Add event listener to the "Add Todo" button
addTodoBtn.addEventListener("click", addTodo);
clearBtn.addEventListener("click", clearTodo);

todoInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTodo();
  }

  if(event.key === "Escape"){
    clearTodo();
  }
});

// Function to add a new todo item
function addTodo() {
  // Get the trimmed value from the todo input field
  const todoText = todoInput.value.trim();

  // Check if the input is not empty
  if (todoText !== "") {
    // Create a new list item
    const li = document.createElement("li");

    // Create a div to hold the edit and delete buttons
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Create a span element to display the todo text
    const span = document.createElement("span");
    span.textContent = todoText;

    // Create an Edit button
    const editButton = document.createElement("button");
    editButton.classList.add("link-button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      editTodo.call(this, li, span, editButton);
    });
    buttonsDiv.appendChild(editButton);

    // Create a Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("link-button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", deleteTodo);
    buttonsDiv.appendChild(deleteButton);

    // Append the elements to the list item
    li.appendChild(span);
    li.appendChild(buttonsDiv);

    // Append the list item to the todo list
    todoList.appendChild(li);

    // Clear the input field after adding todo
    todoInput.value = "";
  }
}

// Function to edit a todo item
function editTodo(li, span, editButton) {
  // Get the current text from the span
  const currentText = span.textContent;

  // Create an input element with the current text
  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;

  // Replace the span with the input
  li.replaceChild(input, span);

  // Change the edit button to a save button
  const saveButton = document.createElement("button");
  saveButton.classList.add("link-button");
  saveButton.textContent = "Save";

  // Function to save the updated todo item
  const saveTodo = () => {
    // Get the updated text from the input
    const newText = input.value.trim();

    // Create a new span element with the updated text
    const newSpan = document.createElement("span");
    newSpan.textContent = newText;

    // Replace the input with the new span
    li.replaceChild(newSpan, input);

    // Replace the save button with the edit button
    buttonsDiv.replaceChild(editButton, saveButton);
    editButton.addEventListener("click", function () {
      editTodo(li, newSpan, editButton);
    });
  };

  saveButton.addEventListener("click", saveTodo);

  // Get the reference to buttonsDiv again after DOM change
  const buttonsDiv = li.querySelector(".buttons");

  // Replace the edit button with the save button
  buttonsDiv.replaceChild(saveButton, editButton);
}

// Function to delete a todo item
function deleteTodo() {
  // Remove the parent list item of the delete button
  this.parentElement.parentElement.remove();
}
function clearTodo(){
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
}
