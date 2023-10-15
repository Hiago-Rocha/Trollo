function openColorMenu() {
    let show = document.getElementById("backgroundColorID");
    if (show.style.display === "none") {
        show.style.display = "block";
    } else {
        show.style.display = "none";
    };
};

function changeBackgroundColor(backgroundColor) {
    let h1 = document.getElementById("trolloh1");
    let background = document.getElementById("background");
    background.style.backgroundColor = backgroundColor;
    h1.style.color = backgroundColor;
    salvarCor(backgroundColor);
}

function salvarCor(backgroundColor) {
    localStorage.setItem("savedColor", backgroundColor);
}

window.onload = function loadColor() {
    let loadedColor = localStorage.getItem('savedColor')
    let h1 = document.getElementById("trolloh1");
    let background = document.getElementById("background");
    background.style.backgroundColor = loadedColor;
    h1.style.color = loadedColor;
}

let columnCounter = 0;
let columnArr = [];
let arrTasks = [];

function columnCreate() {
    if (columnCounter < 5) {
        const ancora = document.getElementById("columnsID");
        const columnArea = document.createElement("div");
        const taskArea = document.createElement("div");
        const columnTitleArea = document.createElement("div");
        const columnTitle = document.createElement("textarea");
        const taskButton = document.createElement("button");
        const divImg = document.createElement("div");
        const trashImg = document.createElement("img");

        let taskGenerateID = `${Math.random()}`;
        let columnGenerateID =`${Math.random()}`;
        taskArea.id = taskGenerateID;
        columnArea.id = columnGenerateID;


        columnTitle.setAttribute("placeholder", "Título");
        columnTitle.setAttribute("maxlength", "15");
        columnTitle.addEventListener("keyup", function(event){
            if (event.keyCode === 13){
                let title = columnTitle.value.replace(/(\r\n|\n|\r)/gm, "")
                saveColumns(columnArea.id, title);
            }
        })

        taskButton.innerText = "+";
        trashImg.src = "./src/img/trash-icon.png";

        columnArea.classList.add("columnArea");
        columnTitleArea.classList.add("columnTitleArea")
        columnTitle.classList.add("columnTitle");
        taskButton.classList.add("taskButton");
        divImg.classList.add("deleteColumn");

        const tasksDiv = document.createElement("div");
        const tasksTitleInput = document.createElement("input");
        const tasksTextarea = document.createElement("textarea");
        const taskImgTrash = document.createElement("img");

        tasksTitleInput.id = `${Math.random()}`
        tasksTextarea.id = `${Math.random()}`

        tasksDiv.classList.add("tasksDiv");
        tasksTitleInput.classList.add("tasksTitle");
        tasksTextarea.classList.add("taskDescription");

        tasksTitleInput.setAttribute("placeholder", "Título");
        tasksTitleInput.setAttribute("maxlength", "15");
        tasksTextarea.setAttribute("placeholder", "Descrição");

        taskImgTrash.src = "./src/img/trash-icon.png";

        tasksDiv.appendChild(tasksTitleInput);
        tasksDiv.appendChild(tasksTextarea);

        ancora.appendChild(columnArea);
        columnArea.appendChild(columnTitleArea);
        columnTitleArea.appendChild(columnTitle);
        columnArea.appendChild(taskArea);
        columnArea.appendChild(tasksDiv);
        columnArea.appendChild(taskButton);
        columnArea.appendChild(divImg);
        divImg.appendChild(trashImg);

        taskButton.addEventListener("click", ()=>{
            let task = {
                id: taskArea.id,
                columnID: columnArea.id,
                title: tasksTitleInput.value,
                text: tasksTextarea.value
            }
            createTasks(task, tasksTitleInput.id, tasksTextarea.id);
        });

        divImg.addEventListener("click", ()=> {
            for(let i = arrTasks.length-1; i >= 0; i--) {
                if(arrTasks[i].columnID == columnArea.id){
                    arrTasks.splice(i, 1);
                    localStorage.removeItem("tasksSave");
                    const json = JSON.stringify(arrTasks);
                    localStorage.setItem("tasksSave", json);
                }
            }
            for(let i=0;i<columnArr.length;i++){
                if(columnArr[i].id == columnArea.id){
                    columnArr.splice(i,1);
                    localStorage.removeItem("columnsID");
                    const json = JSON.stringify(columnArr);
                    localStorage.setItem("columnsID", json);
                }
            }
            columnArea.remove();
            columnCounter--
            if(columnCounter < 5){
                let esconde = document.getElementById("columnButton");
                esconde.style.display = "block";
            }
        })

        saveColumns(columnArea.id);
    }
    columnCounter++;

    if (columnCounter == 5) {
        let esconde = document.getElementById("columnButton");
        esconde.style.display = "none";
    }
}


function createTasks(task, id1, id2) {
    const taskArea = document.getElementById(task.id);
    const tasksDiv = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDescription = document.createElement("p");
    const trashImg = document.createElement("img")

    tasksDiv.id = `${Math.random()}`; 
    taskTitle.innerText = task.title;
    taskDescription.innerText = task.text;
    trashImg.src = "./src/img/trash-icon.png";

    trashImg.addEventListener("click", ()=>{
        taskDelete(tasksDiv.id, task);
    })

    tasksDiv.classList.add("tasksDiv");
    taskTitle.classList.add("tasksTitle");
    taskDescription.classList.add("taskDescription");

    taskArea.appendChild(tasksDiv);
    tasksDiv.appendChild(taskTitle);
    tasksDiv.appendChild(taskDescription);
    tasksDiv.appendChild(trashImg);

    const limpa1 = document.getElementById(id1).value = "";
    const limpa2 = document.getElementById(id2).value = "";

    saveTask(task);
}


function taskDelete(tasksDivID, task){
    for(let i=0;i<arrTasks.length;i++){
        if(arrTasks[i].id == task.id){
            arrTasks.splice(i,1);
            localStorage.removeItem("tasksSave");
            const json = JSON.stringify(arrTasks);
            localStorage.setItem("tasksSave", json);
        }
    }
    let tasksDiv = document.getElementById(tasksDivID).remove();
}

function saveTask(task){
    arrTasks.push(task);
    const json = JSON.stringify(arrTasks);
    localStorage.setItem("tasksSave", json);
}


/*function saveColumns(id, title){
    let column = {
        id: id,
        title: title
    }
    for(let i=0;i<columnArr.length;i++){
        if(columnArr[i].id == column.id){
            let columnRecuperado = localStorage.getItem('columnsID');
            let arrColumnsRecuperado = JSON.parse(columnRecuperado);
            arrColumnsRecuperado[i].title = column.title;
            
        }
    }
    columnArr.push(column);
    const json = JSON.stringify(columnArr);
    localStorage.setItem("columnsID", json);
}*/
function saveColumns(id, title) {
    let column = {
        id: id,
        title: title
    }

    for (let i = 0; i < columnArr.length; i++) {
        if (columnArr[i].id == column.id) {
            columnArr[i] = column;
            const json = JSON.stringify(columnArr);
            localStorage.setItem("columnsID", json);
            return;
        }
    }

    columnArr.push(column);

    const json = JSON.stringify(columnArr);
    localStorage.setItem("columnsID", json);
}

function loadTask(){
    let column = localStorage.getItem('columnsID');
    let tasks = localStorage.getItem('tasksSave');
    let arrColumnsRecuperado = JSON.parse(column);
    let arrTasksRecuperado = JSON.parse(tasks);
    columnCounter = arrColumnsRecuperado.length;
    if(columnCounter == 5){
        let esconde = document.getElementById("columnButton");
        esconde.style.display = "none";
    }

    for(let i=0;i<arrColumnsRecuperado.length;i++){
        columnArr.push(arrColumnsRecuperado[i]);
    }
    if(arrTasksRecuperado != null){
        for(let i=0;i<arrTasksRecuperado.length;i++){
            arrTasks.push(arrTasksRecuperado[i]);
        }
    }

    for(let i=0;i<arrColumnsRecuperado.length;i++){
        buildColumn(arrColumnsRecuperado[i], arrTasksRecuperado);
    }
}

function buildColumn(columnId, arrTasksRecuperado){
    let taskAreaId = "";
    const ancora = document.getElementById("columnsID");
    const columnArea = document.createElement("div");
    const taskArea = document.createElement("div");
    const columnTitleArea = document.createElement("div");
    const columnTitle = document.createElement("textarea");
    const taskButton = document.createElement("button");
    const divImg = document.createElement("div");
    const trashImg = document.createElement("img");

    columnArea.id = columnId.id;
    
    taskButton.innerText = "+";
    trashImg.src = "./src/img/trash-icon.png";

    columnArea.classList.add("columnArea");
    columnTitleArea.classList.add("columnTitleArea")
    columnTitle.classList.add("columnTitle");
    taskButton.classList.add("taskButton");
    divImg.classList.add("deleteColumn");

    const tasksDiv = document.createElement("div");
    const tasksTitleInput = document.createElement("input");
    const tasksTextarea = document.createElement("textarea");
    const taskImgTrash = document.createElement("img");

    tasksTitleInput.id = `${Math.random()}`
    tasksTextarea.id = `${Math.random()}`

    tasksDiv.classList.add("tasksDiv");
    tasksTitleInput.classList.add("tasksTitle");
    tasksTextarea.classList.add("taskDescription");

    columnTitle.setAttribute("placeholder", "Título");
    columnTitle.setAttribute("maxlength", "15");
    if(columnId.title != null){
        columnTitle.innerText = columnId.title;
    }
    columnTitle.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            let title = columnTitle.value.replace(/(\r\n|\n|\r)/gm, "")
            saveColumns(columnArea.id, title);
        }
    })

    tasksTitleInput.setAttribute("placeholder", "Título");
    tasksTitleInput.setAttribute("maxlength", "15");
    tasksTextarea.setAttribute("placeholder", "Descrição");

    taskImgTrash.src = "./src/img/trash-icon.png";

    tasksDiv.appendChild(tasksTitleInput);
    tasksDiv.appendChild(tasksTextarea);

    ancora.appendChild(columnArea);
    columnArea.appendChild(columnTitleArea);
    columnTitleArea.appendChild(columnTitle);
    columnArea.appendChild(taskArea);
    columnArea.appendChild(tasksDiv);
    columnArea.appendChild(taskButton);
    columnArea.appendChild(divImg);
    divImg.appendChild(trashImg);

    taskArea.id = `${Math.random()}`;
    console.log(taskArea.id);
    
    taskButton.addEventListener("click", ()=>{
        let task = {
            id: taskArea.id,
            columnID: columnArea.id,
            title: tasksTitleInput.value,
            text: tasksTextarea.value
         }
            createTasks(task, tasksTitleInput.id, tasksTextarea.id);
        });

    divImg.addEventListener("click", ()=> {
        for(let i = arrTasks.length-1; i >= 0; i--) {
            if(arrTasks[i].columnID == columnArea.id){
                arrTasks.splice(i, 1);
                localStorage.removeItem("tasksSave");
                const json = JSON.stringify(arrTasks);
                localStorage.setItem("tasksSave", json);
            }
        }
        for(let i=0;i<columnArr.length;i++){
            if(columnArr[i].id == columnArea.id){
                columnArr.splice(i,1);
                localStorage.removeItem("columnsID");
                const json = JSON.stringify(columnArr);
                localStorage.setItem("columnsID", json);
                }
            }
            columnArea.remove();
            columnCounter--
            if(columnCounter < 5){
                let esconde = document.getElementById("columnButton");
                esconde.style.display = "block";
            }
        })
        if(arrTasksRecuperado != null){
            for(let i=0;i<arrTasksRecuperado.length;i++){
            if(arrTasksRecuperado[i].columnID == columnId.id){
                taskAreaId = arrTasksRecuperado[i].id;
                taskArea.id = arrTasksRecuperado[i].id;
                buildTask(arrTasksRecuperado[i])
            }
        }
    }
    
}

function buildTask(Tasks){
    const taskArea = document.getElementById(Tasks.id);
    const tasksDiv = document.createElement("div");
    const taskTitle = document.createElement("h2");
    const taskDescription = document.createElement("p");
    const trashImg = document.createElement("img")

    tasksDiv.id = `${Math.random()}`;
    taskTitle.innerText = Tasks.title;
    taskDescription.innerText = Tasks.text;
    trashImg.src = "./src/img/trash-icon.png";
    trashImg.addEventListener("click", ()=>{
        taskDelete(tasksDiv.id, Tasks);
    })

    tasksDiv.classList.add("tasksDiv");
    taskTitle.classList.add("tasksTitle");
    taskDescription.classList.add("taskDescription");

    taskArea.appendChild(tasksDiv);
    tasksDiv.appendChild(taskTitle);
    tasksDiv.appendChild(taskDescription);
    tasksDiv.appendChild(trashImg);
}

loadTask();