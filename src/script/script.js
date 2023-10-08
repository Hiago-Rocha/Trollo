function abrirMenu(){
    let ligar = document.getElementById("corFundoID");
    if(ligar.style.display === "none"){
        ligar.style.display = "block";
    }else{
        ligar.style.display = "none";
    };
};

function mudarCor(corFundo){
    let h1 = document.getElementById("trolloh1");
    let fundo = document.getElementById("fundo");
    fundo.style.backgroundColor = corFundo;
    h1.style.color = corFundo;
    salvarCor(corFundo);
}

function salvarCor(corFundo){
    localStorage.setItem("corSalva", corFundo);
}

window.onload = function carregarCor(){
    let corRecuperada = localStorage.getItem('corSalva')
    let h1 = document.getElementById("trolloh1");
    let fundo = document.getElementById("fundo");
    fundo.style.backgroundColor = corRecuperada;
    h1.style.color = corRecuperada;
}
let counter = 0;
function createColumn(){
    if(counter < 5){
        const ancora = document.getElementById("columnsID");
        const dropAreaDiv = document.createElement("div");
        const columnTitleInput = document.createElement("input");
        const form = document.createElement("form");
        const tasksButton = document.createElement("p");
        const imgLixo = document.createElement("img");
        const divImg = document.createElement("div");
        
        
        dropAreaDiv.classList.add("dropArea");
        dropAreaDiv.id = `-${Date.now()}`
        columnTitleInput.classList.add("columnTitle");
        form.classList.add("form");
        tasksButton.classList.add("tasksButton");
        tasksButton.innerText = "+";
        tasksButton.addEventListener("click", createTasks());
        columnTitleInput.setAttribute("placeholder", "Título");
        columnTitleInput.setAttribute("maxlength", "15");
        imgLixo.src = "./src/img/trash-icon.png";
        
        ancora.appendChild(dropAreaDiv);
        dropAreaDiv.appendChild(columnTitleInput);
        dropAreaDiv.appendChild(form);
        dropAreaDiv.appendChild(tasksButton);
        dropAreaDiv.appendChild(imgLixo);
        
        counter++;

        if(counter == 5){
            let escode = document.getElementById("columnButton");
            escode.style.display = "none";
        }
    }
}

function createTasks(){
    const tasksDiv = document.createElement("div");
    const tasksTitleInput = document.createElement("input");
    const tasksForm = document.createElement("form");

    tasksDiv.classList.add("tasksDiv");
    tasksDiv.id = `-${Date.now()}`
    tasksTitleInput.classList.add("tasksTitle");
    tasksForm.classList.add("tasksForm");
}
