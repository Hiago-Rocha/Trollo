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
let contador = 0;
function createColumn(){
    if(contador<5){
        contador++
        const ancora = document.getElementById("columnsID");
        const divDropArea = document.createElement("div");
        const inputTitle = document.createElement("input");
        const form = document.createElement("form");
        const pButton = document.createElement("p");
        const imgLixo = document.createElement("img");
        const divImg = document.createElement("div");
    

        divDropArea.classList.add(`dropArea`);
        divDropArea.id = `-${Date.now()}`
        inputTitle.classList.add("title-coluna");
        form.classList.add("form");
        pButton.classList.add("button+");
        pButton.innerText = "+";
        pButton.addEventListener("click", addForms());
        inputTitle.setAttribute("placeholder", "Título");
        inputTitle.setAttribute("maxlength", "15");
        imgLixo.src = "./src/img/trash-icon.png";

        ancora.appendChild(divDropArea);
        divDropArea.appendChild(inputTitle);
        divDropArea.appendChild(form);
        divDropArea.appendChild(pButton);
        divDropArea.appendChild(imgLixo);

        if(contador== 5){
            let escode = document.getElementById("buttonAddColumn");
            escode.style.display = "none";
        }
    }
}

function addForms(){
    
}
