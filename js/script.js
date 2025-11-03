// Feature needed :
// - task update
// - delete task 
// ==============================================================

// Selector section 
const btnAddEl = document.querySelector('.add-task'); // add button
const taskInputEl = document.querySelector('.task-input input'); // input field
const taskListEl = document.querySelector('.list'); // task container

// Function section
const addTask = () =>{
    // return if input field empty
    if(taskInputEl.value === '') return
    
    // creating new task
    const taskBox = document.createElement('li');
    taskBox.classList.add('task');
    // update checkbox
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('update')
    taskBox.appendChild(checkBox);
    // task content 
    const taskContent = document.createElement('p');
    taskContent.textContent = taskInputEl.value;
    taskBox.appendChild(taskContent);
    // delete button 
    const btnDelEl = document.createElement('span');
    btnDelEl.classList.add('delete');
    btnDelEl.innerHTML = "❌";
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
        let check = e.target.parentElement.childNodes[1];
        check.classList.toggle('completed');
    }
};


// Running 
btnAddEl.addEventListener('click',addTask);
taskListEl.addEventListener('click', checkAndDeleteTask);
