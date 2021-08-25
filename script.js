'use strict';


const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
     // prevent from from submitting
     // console.log('hello')
     event.preventDefault();

     // todo div 
     const todoDiv = document.createElement('div');
     todoDiv.classList.add('todo');

     // create li
     const newTodo = document.createElement('li');
     newTodo.innerText = todoInput.value;
     newTodo.classList.add('todoItem');
     todoDiv.appendChild(newTodo);

     //add todo to localStorage
     saveLocalTodos(todoInput.value);

     // checkmark btn
     const completedButton = document.createElement('button');
     completedButton.innerHTML = '<i class=\'fas fa-check\'> </i>'
     completedButton.classList.add('completeBtn');
     todoDiv.appendChild(completedButton);

     // trash btn
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class=\'fas fa-trash\'> </i>'
     trashButton.classList.add('trashBtn');
     todoDiv.appendChild(trashButton);

     // append to list
     todoList.appendChild(todoDiv);

     // clea input value
     todoInput.value = ' '
}

function deleteCheck(event) {
     const item = event.target;

     // delete todo
     if (item.classList[0] === 'trashBtn') {
          const todo = item.parentElement;
          //animation
          todo.classList.add('fall');
          removeLocalTodos(todo);
          todo.addEventListener('transitionend', function () {
               todo.remove();
          });
     }

     //checkmark
     if (item.classList[0] === 'completeBtn') {
          const todo = item.parentElement;
          todo.classList.toggle('completed');
     }
}

function filterTodo(e) {
     const todos = todoList.childNodes;
     todos.forEach(function (todo) {
          switch (e.target.value) {
               case 'all':
                    todo.style.display = 'flex';
                    break;
               case 'completed':
                    if (todo.classList.contains('completed')) {
                         todo.style.display = 'flex';
                    } else {
                         todo.style.display = 'none';
                    }
                    break;
               case 'uncompleted':
                    if (!todo.classList.contains('completed')) {
                         todo.style.display = 'flex';
                    } else {
                         todo.style.display = 'none';
                    }
                    break;
          }
     });
}

function saveLocalTodos(todo) {
     //check if its empty
     let todos;
     if (localStorage.getItem('todos') === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);
     localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
     let todos;
     if (localStorage.getItem('todos') === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function (todo) {
          // todo div 
          const todoDiv = document.createElement('div');
          todoDiv.classList.add('todo');

          // create li
          const newTodo = document.createElement('li');
          newTodo.innerText = todo;
          newTodo.classList.add('todoItem');
          todoDiv.appendChild(newTodo);

          // checkmark btn
          const completedButton = document.createElement('button');
          completedButton.innerHTML = '<i class=\'fas fa-check\'> </i>'
          completedButton.classList.add('completeBtn');
          todoDiv.appendChild(completedButton);

          // trash btn
          const trashButton = document.createElement('button');
          trashButton.innerHTML = '<i class=\'fas fa-trash\'> </i>'
          trashButton.classList.add('trashBtn');
          todoDiv.appendChild(trashButton);

          // append to list
          todoList.appendChild(todoDiv);
     })
}

function removeLocalTodos(todo) {
     let todos;
     if (localStorage.getItem('todos') === null) {
          todos = [];
     } else {
          todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem('todos', JSON.stringify(todos));
}