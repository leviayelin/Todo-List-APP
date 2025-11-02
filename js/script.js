// Selectors section 
const taskFieldEl = document.querySelector('.task-input input');
const btnAddEl = document.querySelector('.add-task');
const taskListEl = document.querySelector('.list');

const testingCheck = document.querySelectorAll('.list .task');

// Function section
const addTask = () =>{
    // return if theres no text in input field 
    if(taskFieldEl.value === '') return
    try{
       taskListEl.innerHTML += `
            <li class="task">
                <input type="checkbox" name="task">
                <div>${taskFieldEl.value}</div>
            </li>
       `
    }catch(err){
        console.log(`something went wrong: ${err}`)
    }
    // clearing input field 
    taskFieldEl.value = '';
};

// check if task as been checked or not 

// Running 
btnAddEl.addEventListener('click',addTask);
