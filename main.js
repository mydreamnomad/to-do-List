let taskInput = document.getElementById("task-input")
let addButton = document.getElementById("add-button")
let taskList = []
let filterList = []
let tabs = document.querySelectorAll(".task-tabs div")
let mode = `all`
let underLine = document.getElementById("under-line")
let resetButton = document.getElementById("reset-button")
let resultHTML = ``


for(let i=0; i < tabs.length; i++){
    tabs[i].addEventListener("click", function(event){
        filter(event)
})}

addButton.addEventListener("mousedown", addTask)
resetButton.addEventListener("click", resetTask)
taskInput.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        addTask(event)
        taskInput.value = ""
    }
})

function resetTask(){
    resultHTML = ``
    taskList = []
    document.getElementById("task-board").innerHTML = resultHTML
}

function addTask(){
    let taskValue = taskInput.value
    if(taskValue === "") return alert("할 일을 입력하세요")
    let task = {
        taskContent: taskValue,
        id: randomIdGenerate(),
        isComplete: false
    }
    taskList.push(task)
    render()
}

function render(){
    let list = []
    if(mode === "all"){
        list = taskList
    }else if (mode === "ongoing" || mode === "done"){
        list = filterList
    }
    resultHTML = ``
    for(let i =0; i <list.length; i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task">
            <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button> 
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div> 
            </div>`
        }else if(list[i].isComplete == false){
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button> 
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div> 
            </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML
}

function toggleComplete(id){
    for(let i=0; i < taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete 
            break
        }
    }
    filter()
}

function deleteTask(id){
    for(let i = 0; i < taskList.length; i ++){
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break
        }
    }
    filter()
}

function filter(event){
    if(event){
        mode = event.target.id
        underLine.style.left = event.currentTarget.offsetLeft + "px"
        underLine.style.width = event.currentTarget.offsetWidth + "px"
        underLine.style.top = event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px"
    }
    filterList = []
    if(mode === "all"){
        render()
    }else if(mode === "ongoing"){
        for(let i =0; i <taskList.length; i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i])
            }
        }render()
    }else if(mode === "done"){
        for(let i =0; i < taskList.length; i ++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        }render()
    }
}

function randomIdGenerate(){
    return Math.random().toString(36).substr(2, 16);
}