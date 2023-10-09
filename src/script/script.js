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
let arrayColumnID = [];
let columnCounter = 0;
function createColumn() {
    if (columnCounter < 5) {
        const ancora = document.getElementById("columnsID");
        const dropAreaDiv = document.createElement("div");
        const columnTitleInput = document.createElement("input");
        const tasksButton = document.createElement("button");
        const deleteColumn = document.createElement("button");
        const divImg = document.createElement("div");
        const imgLixo = document.createElement("img");

        dropAreaDiv.classList.add("dropArea");
        generateID =`-${Date.now()}`;
        arrayColumnID.push(generateID);
        dropAreaDiv.id = generateID;
        tasksButton.id = columnCounter;
        columnTitleInput.classList.add("columnTitle");
        tasksButton.classList.add("tasksButton");
        tasksButton.innerText = "+";
        let buttonID = tasksButton.id;
        tasksButton.addEventListener("click", function(){
            createTasks(arrayColumnID, tasksButton, buttonID);
        });
        columnTitleInput.setAttribute("placeholder", "Título");
        columnTitleInput.setAttribute("maxlength", "15");

        imgLixo.src = "./src/img/trash-icon.png";
        deleteColumn.appendChild(imgLixo);
        deleteColumn.classList.add("deleteColumn");
        deleteColumn.addEventListener("click", function(){
            columnDelete(arrayColumnID, buttonID);
        })

        ancora.appendChild(dropAreaDiv);
        dropAreaDiv.appendChild(columnTitleInput);
        dropAreaDiv.appendChild(tasksButton);
        dropAreaDiv.appendChild(deleteColumn);
        dropAreaDiv.appendChild(divImg);
        console.log(arrayColumnID)
    }
    columnCounter++;

    if (columnCounter == 5) {
        let esconde = document.getElementById("columnButton");
        esconde.style.display = "none";
    }
}

let counterTask = 0;
let arrayTaskID = [];
function createTasks(arrayColumnID, tasksButton, buttonID) {
    console.log(arrayColumnID)
    const tasksDiv = document.createElement("div");
    const tasksTitleInput = document.createElement("input");
    const tasksTextarea = document.createElement("textarea");
    const imgLixo = document.createElement("img");


    imgLixo.src = "./src/img/trash-icon.png";
    tasksDiv.classList.add("tasksDiv");
    tasksDiv.id = `-${Date.now()}`
    arrayTaskID.push(tasksDiv.id);
    tasksTitleInput.classList.add("tasksTitle");
    tasksTitleInput.setAttribute("placeholder", "Título");
    tasksTitleInput.setAttribute("maxlength", "15");
    tasksTextarea.classList.add("tasksDescription");
    tasksTextarea.setAttribute("placeholder", "Descrição");
    imgLixo.id = counterTask;

    tasksDiv.appendChild(tasksTitleInput);
    tasksDiv.appendChild(tasksTextarea);
    tasksDiv.appendChild(imgLixo);

    const column = document.getElementById(arrayColumnID[buttonID]);
    column.appendChild(tasksDiv);

    column.insertBefore(tasksDiv, tasksButton);
    imgLixo.addEventListener("click", function(){
        let imgLixoID = imgLixo.id;
        taskDelete(arrayTaskID, imgLixoID);
    })
    counterTask++
}

function taskDelete(arrayTaskID, imgLixoID){
    let tasksDiv = document.getElementById(arrayTaskID[imgLixoID]).remove();
}

function columnDelete(arrayColumnID, buttonID){
    let columnDiv = document.getElementById(arrayColumnID[buttonID]).remove();
    arrayColumnID.splice(buttonID);
    if(columnCounter < 5){
        let esconde = document.getElementById("columnButton");
        esconde.style.display = "block";
    }
}