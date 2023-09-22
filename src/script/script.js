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
