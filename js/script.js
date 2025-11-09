// Feature needed -
// - loacl storage understanding 
// - filtering tasks : All, Pendding, Complete
// ==============================================================

// Selector section 
const formEl = document.querySelector('.form'); // add button
const taskInputEl = document.querySelector('.form input'); // input field
const taskListEl = document.querySelector('.tasks-box'); // task container

// local storage section
// setting name storage and parsing it
let todos = JSON.parse(localStorage.getItem('todos')); 

// Function section
const showTodos = (filter)=>{
    let liEl = '';
    // if todos exists
    if(todos){
        todos.forEach((todo,id)=>{
            let completed = todos.status == "Completed"?"check":"";
            if(filter == todo.status || filter == "all"){
                liEl += `
                    <li class="task">
                        <label for="${id}">
                            <input onClick="updateStatus(this)" id="${id}" type="checkbox" ${completed}/>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                    </li>
                `;
            }
        });

    }
    taskListEl.innerHTML = liEl || `<span>there's no task here</span>`;
    // let checkTask = taskListEl.querySelectorAll(".task")
};

// update task
const updateStatus = (e)=>{
    let taskName = e.parentElement.lastElementChild;
    if(e.checked){
        taskName.classList.add('check');
        todos[e.id].status = "Completed";
    }else{
        taskName.classList.remove('check');
        todos[e.id].status = "Pending";
    }
    localStorage.setItem('todos', JSON.stringify(todos));
};

const addTask = (e) =>{
    // prevent refresh default 
    e.preventDefault();
    let userTask = taskInputEl.value.trim();
    // return if input field empty
    if(taskInputEl.value === '') return
    // condition - if todos as no exists tasks create new array,
    // if it does get them
    todos = !todos ? [] : todos;
    // create new task object
    let newTaskData = {name:userTask,status:"Pending"};
    todos.push(newTaskData);
    // clear input field 
    taskInputEl.value = "";
    // stored the new data in an exsits or new todos storage
    localStorage.setItem("todos", JSON.stringify(todos));
    // show current tasks list data
    showTodos(document.querySelector("span.active").id);
};

showTodos("all");


// Running 
formEl.addEventListener('submit',addTask);