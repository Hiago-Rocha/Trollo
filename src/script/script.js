function abrirMenu() {
    let ligar = document.getElementById("corFundoID");
    if (ligar.style.display === "none") {
        ligar.style.display = "block";
    } else {
        ligar.style.display = "none";
    };
};

function mudarCor(corFundo) {
    let h1 = document.getElementById("trolloh1");
    let fundo = document.getElementById("fundo");
    fundo.style.backgroundColor = corFundo;
    h1.style.color = corFundo;
    salvarCor(corFundo);
}

function salvarCor(corFundo) {
    localStorage.setItem("corSalva", corFundo);
}

window.onload = function carregarCor() {
    let corRecuperada = localStorage.getItem('corSalva')
    let h1 = document.getElementById("trolloh1");
    let fundo = document.getElementById("fundo");
    fundo.style.backgroundColor = corRecuperada;
    h1.style.color = corRecuperada;
}

let columnCounter = 0;
let arrColumns = [];
let arrTasks = [];

function createColumn() {
    if (columnCounter < 5) {
        const ancora = document.getElementById("columnsID");
        const dropAreaDiv = document.createElement("div");
        const taskArea = document.createElement("div");
        const columnTitleArea = document.createElement("textarea");
        const tasksButton = document.createElement("button");
        const divImg = document.createElement("div");
        const imgLixo = document.createElement("img");

        let areaTaskGenerateID = `-${Date.now()}`;
        let dropGenerateID =`${Date.now()}`;
        taskArea.id = areaTaskGenerateID;
        dropAreaDiv.id = dropGenerateID;


        columnTitleArea.setAttribute("placeholder", "Título");
        columnTitleArea.setAttribute("maxlength", "15");
        columnTitleArea.addEventListener("keyup", function(event){
            if (event.keyCode === 13){
                let title = columnTitleArea.value.replace(/(\r\n|\n|\r)/gm, "")
                saveColumns(dropAreaDiv.id, title);
            }
        })

        tasksButton.innerText = "+";
        imgLixo.src = "./src/img/trash-icon.png";

        dropAreaDiv.classList.add("dropArea");
        columnTitleArea.classList.add("columnTitle");
        tasksButton.classList.add("tasksButton");
        divImg.classList.add("deleteColumn");

        const tasksDiv = document.createElement("div");
        const tasksTitleInput = document.createElement("input");
        const tasksTextarea = document.createElement("textarea");
        const imgLixoTask = document.createElement("img");

        tasksTitleInput.id = `i${Date.now()}`
        tasksTextarea.id = `a${Date.now()}`

        tasksDiv.classList.add("tasksDiv");
        tasksTitleInput.classList.add("tasksTitle");
        tasksTextarea.classList.add("tasksDescription");

        tasksTitleInput.setAttribute("placeholder", "Título");
        tasksTitleInput.setAttribute("maxlength", "15");
        tasksTextarea.setAttribute("placeholder", "Descrição");

        imgLixoTask.src = "./src/img/trash-icon.png";

        tasksDiv.appendChild(tasksTitleInput);
        tasksDiv.appendChild(tasksTextarea);

        ancora.appendChild(dropAreaDiv);
        dropAreaDiv.appendChild(columnTitleArea);
        dropAreaDiv.appendChild(taskArea);
        dropAreaDiv.appendChild(tasksDiv);
        dropAreaDiv.appendChild(tasksButton);
        dropAreaDiv.appendChild(divImg);
        divImg.appendChild(imgLixo);

        tasksButton.addEventListener("click", ()=>{
            let task = {
                id: taskArea.id,
                columnID: dropAreaDiv.id,
                title: tasksTitleInput.value,
                text: tasksTextarea.value
            }
            createTasks(task, tasksTitleInput.id, tasksTextarea.id);
        });

        divImg.addEventListener("click", ()=> {
            for(let i = arrTasks.length-1; i >= 0; i--) {
                if(arrTasks[i].columnID == dropAreaDiv.id){
                    arrTasks.splice(i, 1);
                    localStorage.removeItem("tasksSave");
                    const json = JSON.stringify(arrTasks);
                    localStorage.setItem("tasksSave", json);
                }
            }
            for(let i=0;i<arrColumns.length;i++){
                if(arrColumns[i].id == dropAreaDiv.id){
                    arrColumns.splice(i,1);
                    localStorage.removeItem("columnsID");
                    const json = JSON.stringify(arrColumns);
                    localStorage.setItem("columnsID", json);
                }
            }
            dropAreaDiv.remove();
            columnCounter--
            if(columnCounter < 5){
                let esconde = document.getElementById("columnButton");
                esconde.style.display = "block";
            }
        })

        saveColumns(dropAreaDiv.id);
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
    const titleH2 = document.createElement("h2");
    const textP = document.createElement("p");
    const imgLixo = document.createElement("img")

    tasksDiv.id = `+${Date.now()}`; 
    titleH2.innerText = task.title;
    textP.innerText = task.text;
    imgLixo.src = "./src/img/trash-icon.png";

    imgLixo.addEventListener("click", ()=>{
        taskDelete(tasksDiv.id, task);
    })

    tasksDiv.classList.add("tasksDiv");
    titleH2.classList.add("tasksTitle");
    textP.classList.add("tasksDescription");

    taskArea.appendChild(tasksDiv);
    tasksDiv.appendChild(titleH2);
    tasksDiv.appendChild(textP);
    tasksDiv.appendChild(imgLixo);

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


function saveColumns(id, title){
    let column = {
        id: id,
        title: title
    }
    for(let i=0;i<arrColumns.length;i++){
        if(arrColumns[i].id == column.id){
            arrColumns.splice(i,1);
            localStorage.removeItem("columnsID");
        }
    }
    arrColumns.push(column)
    const json = JSON.stringify(arrColumns);
    localStorage.setItem("columnsID", json);
}

function MontaTaskSave(){
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
        arrColumns.push(arrColumnsRecuperado[i]);
    }
    if(arrTasksRecuperado != null){
        for(let i=0;i<arrTasksRecuperado.length;i++){
            arrTasks.push(arrTasksRecuperado[i]);
        }
    }

    for(let i=0;i<arrColumnsRecuperado.length;i++){
        montaColumn(arrColumnsRecuperado[i], arrTasksRecuperado);
    }
}

function montaColumn(columnId, arrTasksRecuperado){
    let taskAreaId = "";
    const ancora = document.getElementById("columnsID");
    const dropAreaDiv = document.createElement("div");
    const taskArea = document.createElement("div");
    const columnTitleArea = document.createElement("textarea");
    const tasksButton = document.createElement("button");
    const divImg = document.createElement("div");
    const imgLixo = document.createElement("img");

    dropAreaDiv.id = columnId.id;
    
    tasksButton.innerText = "+";
    imgLixo.src = "./src/img/trash-icon.png";

    dropAreaDiv.classList.add("dropArea");
    columnTitleArea.classList.add("columnTitle");
    tasksButton.classList.add("tasksButton");
    divImg.classList.add("deleteColumn");

    const tasksDiv = document.createElement("div");
    const tasksTitleInput = document.createElement("input");
    const tasksTextarea = document.createElement("textarea");
    const imgLixoTask = document.createElement("img");

    tasksTitleInput.id = `i${Date.now()}`
    tasksTextarea.id = `a${Date.now()}`

    tasksDiv.classList.add("tasksDiv");
    tasksTitleInput.classList.add("tasksTitle");
    tasksTextarea.classList.add("tasksDescription");

    columnTitleArea.setAttribute("placeholder", "Título");
    columnTitleArea.setAttribute("maxlength", "15");
    columnTitleArea.innerText = columnId.title;
    columnTitleArea.addEventListener("keyup", function(event){
        if (event.keyCode === 13){
            let title = columnTitleArea.value.replace(/(\r\n|\n|\r)/gm, "")
            saveColumns(dropAreaDiv.id, title);
        }
    })

    tasksTitleInput.setAttribute("placeholder", "Título");
    tasksTitleInput.setAttribute("maxlength", "15");
    tasksTextarea.setAttribute("placeholder", "Descrição");

    imgLixoTask.src = "./src/img/trash-icon.png";

    tasksDiv.appendChild(tasksTitleInput);
    tasksDiv.appendChild(tasksTextarea);

    ancora.appendChild(dropAreaDiv);
    dropAreaDiv.appendChild(columnTitleArea);
    dropAreaDiv.appendChild(taskArea);
    dropAreaDiv.appendChild(tasksDiv);
    dropAreaDiv.appendChild(tasksButton);
    dropAreaDiv.appendChild(divImg);
    divImg.appendChild(imgLixo);

    taskArea.id = `-${Date.now()}`;
    
    tasksButton.addEventListener("click", ()=>{
        let task = {
            id: taskArea.id,
            columnID: dropAreaDiv.id,
            title: tasksTitleInput.value,
            text: tasksTextarea.value
         }
            createTasks(task, tasksTitleInput.id, tasksTextarea.id);
        });

    divImg.addEventListener("click", ()=> {
        for(let i = arrTasks.length-1; i >= 0; i--) {
            if(arrTasks[i].columnID == dropAreaDiv.id){
                arrTasks.splice(i, 1);
                localStorage.removeItem("tasksSave");
                const json = JSON.stringify(arrTasks);
                localStorage.setItem("tasksSave", json);
            }
        }
        for(let i=0;i<arrColumns.length;i++){
            if(arrColumns[i].id == dropAreaDiv.id){
                arrColumns.splice(i,1);
                localStorage.removeItem("columnsID");
                const json = JSON.stringify(arrColumns);
                localStorage.setItem("columnsID", json);
                }
            }
            dropAreaDiv.remove();
            columnCounter--
            if(columnCounter < 5){
                let esconde = document.getElementById("columnButton");
                esconde.style.display = "block";
            }
        })

        for(let i=0;i<arrTasksRecuperado.length;i++){
            if(arrTasksRecuperado[i].columnID == columnId.id){
                console.log(arrTasksRecuperado[i]);
                taskAreaId = arrTasksRecuperado[i].id;
                taskArea.id = arrTasksRecuperado[i].id;
                MontaTask(arrTasksRecuperado[i])
            }
        }
    
}

function MontaTask(Tasks){
    const taskArea = document.getElementById(Tasks.id);
    const tasksDiv = document.createElement("div");
    const titleH2 = document.createElement("h2");
    const textP = document.createElement("p");
    const imgLixo = document.createElement("img")

    tasksDiv.id = `+${Date.now()}`;
    titleH2.innerText = Tasks.title;
    textP.innerText = Tasks.text;
    imgLixo.src = "./src/img/trash-icon.png";
    imgLixo.addEventListener("click", ()=>{
        taskDelete(tasksDiv.id, Tasks);
    })

    tasksDiv.classList.add("tasksDiv");
    titleH2.classList.add("tasksTitle");
    textP.classList.add("tasksDescription");

    taskArea.appendChild(tasksDiv);
    tasksDiv.appendChild(titleH2);
    tasksDiv.appendChild(textP);
    tasksDiv.appendChild(imgLixo);
}

MontaTaskSave()