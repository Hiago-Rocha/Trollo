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
let counter = 0;
function createColumn() {
    if (counter < 5) {
        const ancora = document.getElementById("columnsID");
        const dropAreaDiv = document.createElement("div");
        const columnTitleInput = document.createElement("input");
        const tasksButton = document.createElement("button");
        const deleteColumn = document.createElement("button");
        const divImg = document.createElement("div");
        const imgLixo = document.createElement("img");

        dropAreaDiv.classList.add("dropArea");
        generateID = `-${Date.now()}`;
        dropAreaDiv.id = generateID;
        columnTitleInput.classList.add("columnTitle");
        tasksButton.classList.add("tasksButton");
        tasksButton.innerText = "+";
        tasksButton.addEventListener("click", function(){
            createTasks(generateID, tasksButton);
        });
        columnTitleInput.setAttribute("placeholder", "Título");
        columnTitleInput.setAttribute("maxlength", "15");

        imgLixo.src = "./src/img/trash-icon.png";
        deleteColumn.appendChild(imgLixo);
        deleteColumn.classList.add("deleteColumn");

        ancora.appendChild(dropAreaDiv);
        dropAreaDiv.appendChild(columnTitleInput);
        dropAreaDiv.appendChild(tasksButton);
        dropAreaDiv.appendChild(deleteColumn);
        dropAreaDiv.appendChild(divImg);
    }
    counter++;

    if (counter == 5) {
        let esconde = document.getElementById("columnButton");
        esconde.style.display = "none";
    }
}

function createTasks(generateID, tasksButton) {
    const tasksDiv = document.createElement("div");
    const tasksTitleInput = document.createElement("input");
    const tasksTextarea = document.createElement("textarea");

    tasksDiv.classList.add("tasksDiv");
    tasksDiv.id = `-${Date.now()}`
    tasksTitleInput.classList.add("tasksTitle");
    tasksTitleInput.setAttribute("placeholder", "Título");
    tasksTitleInput.setAttribute("maxlength", "15");
    tasksTextarea.classList.add("tasksDescription");
    tasksTextarea.setAttribute("placeholder", "Descrição");

    tasksDiv.appendChild(tasksTitleInput);
    tasksDiv.appendChild(tasksTextarea);

    const column = document.getElementById(generateID);
    column.appendChild(tasksDiv);

    column.insertBefore(tasksDiv, tasksButton);
}
