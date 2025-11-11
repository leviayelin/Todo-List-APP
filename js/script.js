// Feature needed -
// - loacl storage understanding 
// ==============================================================

// Selector section 
const formEl = document.querySelector('.form'); // add button
const taskInputEl = document.querySelector('.form input'); // input field
const taskListEl = document.querySelector('.tasks-box'); // task container
const filters = document.querySelectorAll(".filters span");// filters buttons

// local storage section
// setting name storage and parsing it
let todos = JSON.parse(localStorage.getItem('todos'));

// filters buttons 
filters.forEach(btn=>{
    // filters button added event listener
    btn.addEventListener('click', ()=>{
        // remove class 'active' from the first span that has it 
        document.querySelector('span.active').classList.remove('active');
        // add class 'active' on the clicked btn
        btn.classList.add('active');
        // add the id value attribute has arg to showTodos function
        showTodos(btn.id);
    })
});

// Function section
const showTodos = (filter)=>{
    let liEl = '';
    // if todos exists
    if(todos){
        // for each data object create task template
        todos.forEach((todo,id)=>{
            // check data object status 
            let completed = todo.status == "completed"?"checked":"";
            if(filter == todo.status || filter == "all"){
                liEl += `
                    <li class="task">
                        <label for="${id}">
                            <input onClick="updateStatus(this)" id="${id}" type="checkbox" ${completed}/>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="setting">
                            <span onclick="deleteTask(${id},'${filter}')">❌</span>
                        </div>
                    </li>
                `;
            }
        });
    }
    taskListEl.innerHTML = liEl || `<span>there's no task here</span>`;
    taskListEl.offsetHeight >= 300? taskListEl.classList.add('overflow'): taskListEl.classList.remove('overflow');
    // let checkTask = taskListEl.querySelectorAll(".task")
};

// update task
// task checkbox checking for events 
const updateStatus = (e)=>{
// task check box checking for events 
    let taskName = e.parentElement.lastElementChild;
    if(e.checked){
        taskName.classList.add('checked');
        todos[e.id].status = "completed";
    }else{
        taskName.classList.remove('checked');
        todos[e.id].status = "pending";
    }
    localStorage.setItem('todos', JSON.stringify(todos));
};

// delete task -  take two parrameters 
// 1. task id, 2.filter for aditing the localStorage
const  deleteTask = (taskId,filter) =>{
    // splice - array method that take two parameters,
    // one get the position of an element,
    // the number of 'step' to cut from the item
    todos.splice(taskId,1);
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos(filter);
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
    let newTaskData = {name:userTask,status:"pending"};
    todos.push(newTaskData);
    // clear input field 
    taskInputEl.value = "";
    // stored the new data in an exsits or new todos storage
    localStorage.setItem("todos", JSON.stringify(todos));
    // show current tasks list data by 
    showTodos(document.querySelector("span.active").id);
};

showTodos("all");


// Running 
formEl.addEventListener('submit',addTask);