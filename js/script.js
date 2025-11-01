// Selectors section 
const taskFieldEl = document.querySelector('.task-input input');
const btnAddEl = document.querySelector('.add-task');
const taskListEl = document.querySelector('.list');

// Function section
const addTask = () =>{
    if(taskFieldEl.value == '') return

    const taskDiv = document
};

// Running 
btnAddEl.addEventListener('click',addTask);