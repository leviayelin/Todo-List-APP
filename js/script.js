// Feature needed -
// - loacl storage understanding 
// - filtering tasks : All, Pendding, Complete
// ==============================================================

// Selector section 
const formEl = document.querySelector('.form'); // add button
const taskInputEl = document.querySelector('.form input'); // input field
const taskListEl = document.querySelector('.tasks-box'); // task container

// local storage section 

// Function section
const addTask = (e) =>{
    // prevent refresh default 
    e.preventDefault();
    // return if input field empty
    if(taskInputEl.value === '') return
    
    // creating new task
    const taskBox = document.createElement('li');
    taskBox.classList.add('task');
    // update checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('update')
    // task content 
    const labelTask = document.createElement('label');
    const taskContent = document.createElement('p');
    taskContent.textContent = taskInputEl.value;
    labelTask.appendChild(taskContent);
    labelTask.appendChild(checkBox);
    taskBox.appendChild(labelTask);
    // delete button 
    const btnDelEl = document.createElement('div');
    btnDelEl.classList.add('delete');
    btnDelEl.innerHTML = "🗑️";
    taskBox.appendChild(btnDelEl);
    // add task to list
    taskListEl.appendChild(taskBox);

    // clear input field 
    taskInputEl.value = "";
};

// Updating and delete task 
const checkAndDeleteTask = (e) =>{
    let item = e.target;
    if(item.classList[0] === "delete"){
        let deleteTask = item.parentElement;
        deleteTask.remove();
    }
    if(item.classList[0] === "update"){
        let check = e.target.parentElement.childNodes[0];
        check.classList.toggle('completed');
    }
};


// Running 
formEl.addEventListener('submit',addTask);
taskListEl.addEventListener('click', checkAndDeleteTask);
