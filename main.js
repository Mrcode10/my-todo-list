let inputField = document.querySelector("#input");
let addButton = document.querySelector("button");
let ul = document.querySelector("ul");
let todo = document.querySelector(".todos");

const btn_2 = document.createElement("button");
const li = document.createElement("li");
const toDo = document.querySelector(".todos");

window.onload = () => {
    inputField.focus();
};
////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", reloadItems);
addButton.addEventListener("click", addTodos);
ul.addEventListener("click", deleteCheck);
////////////////////////////////////////////////////////////////

//Add Todo to ul list
function addTodos(event) {
    event.preventDefault();
    const li = document.createElement("li");
    const btn_2 = document.createElement("button");
    btn_2.classList.add("btn2");
    btn_2.innerHTML = "Delete";
    const inputValue = inputField.value;
    const text = document.createTextNode(inputValue);
    li.appendChild(text);
    if (inputValue === "") {
        console.log("Please add a todo");
    } else {
        ul.appendChild(li);
        li.appendChild(btn_2);
        addToLocalStorage();
    }

    inputField.value = "";
}
////////////////////////////////////////////////////////////////////////////////////////////
//! add to localStorage

function addToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(inputField.value);
    localStorage.setItem("todos", JSON.stringify(todos));
}

////////////////////////////////////////////////////////////////////////
//reload items to html content

function reloadItems(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        const li = document.createElement("li");
        li.innerText = todo;
        const btn_2 = document.createElement("button");
        btn_2.classList.add("btn2");
        btn_2.innerHTML = "Delete";
        ul.appendChild(li);
        li.appendChild(btn_2);

        inputField.value = "";
    });
}

function deleteCheck(e) {
    const item = e.target;
    //delete
    if (item.classList[0] === "btn2") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    function removeLocalTodos(todo) {
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}