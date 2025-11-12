// Feature needed -
// - loacl storage understanding 
// clear all tasks button
// - title and style
// ==============================================================

// Selector section 
const formEl = document.querySelector('.form'); // add button
const taskInputEl = document.querySelector('.form input'); // input field
const taskListEl = document.querySelector('.tasks-box'); // task container
const filters = document.querySelectorAll(".filters span");// filters buttons
const clearAllBtn = document.querySelector('.clear-btn'); // clear/delete all tasks 

// Task settings menu - edit & delete
let editId;
let isEditTask = false;

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
            // check which data to show based on the arg input
            if(filter == todo.status || filter == "all"){
                liEl += `
                    <li class="task">
                        <label for="${id}">
                            <input onClick="updateStatus(this)" id="${id}" type="checkbox" ${completed}/>
                            <p class="${completed}">${todo.name}</p>
                        </label>
                        <div class="settings">
                            <i onClick='showMenu(this)' class="uil uil-ellipsis-h"></i>
                            <ul class="task-edit-menu">
                                <li onClick='editTask(${id},"${todo.name}")'><i class="uil uil-pen"></i>Edit</li>
                                <li onClick='deleteTask(${id},"${filter}")'><i class="uil uil-trash"></i>Delete</li>
                            </ul>
                        </div>
                    </li>
                `;
            }
        });
    }

    taskListEl.innerHTML = liEl || `<span>there's no task here</span>`;
    // enable scrolling on tasks box
    taskListEl.offsetHeight >= 300? taskListEl.classList.add('overflow'): taskListEl.classList.remove('overflow');
    // get current tasks exists by length
    let checkTask = taskListEl.querySelectorAll(".task");
    !checkTask.length ? clearAllBtn.classList.remove('active'):clearAllBtn.classList.add('active');
};

// show task settings menu - close & open
// take one parameter - task id num
const showMenu = (taskId)=>{
    let menuDiv = taskId.parentElement.lastElementChild;
    menuDiv.classList.add('show');
    // click event open manu
    document.addEventListener('click',e =>{
        // condition - close(remove) manu if false 
        if(e.target.tagName != "I" || e.target != taskId){
            menuDiv.classList.remove('show');
        };
    });
};

// update task
// task checkbox checking for events 
const updateStatus = (e)=>{
    // task check box checking for events 
    let taskName = e.parentElement.lastElementChild;
    if(e.checked){
        taskName.classList.add('checked');
        todos[e.id].status = "completed";
        console.log(todos[e.id]);
    }else{
        taskName.classList.remove('checked');
        todos[e.id].status = "pending";
    }
    localStorage.setItem('todos', JSON.stringify(todos));
};

// edit task - take two parameters, 
// task id number and task item content
const editTask = (taskId,textName) =>{
    editId = taskId;
    isEditTask = true;
    taskInputEl.value = textName;
    taskInputEl.focus();
    taskInputEl.classList.add("active");
}

// delete task -  take two parrameters 
// 1. task id, 2.filter for aditing the localStorage
const  deleteTask = (taskId,filter) =>{
    isEditTask = false;
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
    if(userTask){
        if(!isEditTask){
            // condition - if todos array does not exists create new array,
            // if it does get array
            todos = !todos ? [] : todos;
            // create new task object
            let newTaskData = {name:userTask,status:"pending"};
            todos.push(newTaskData);
        }else{
            isEditTask = false;
            todos[editId].name = userTask;
        };
    };
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
clearAllBtn.addEventListener('click', ()=>{
    isEditTask = false;
    // get the first item in todos array and with 
    // second parameter all the other items by using length
    todos.splice(0,todos.length);
    // setting the new todos and sending back to localStorage 
    localStorage.setItem('todos', JSON.stringify(todos));
    showTodos();
})