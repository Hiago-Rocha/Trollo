function abrirMenu(){
    let ligar = document.getElementById("corFundoID");
    if(ligar.style.display === "none"){
        ligar.style.display = "block";
    }else{
        ligar.style.display = "none";
    };
};

function mudarCor(cor){
    let fundo = document.getElementById("fundo");
    fundo.style.backgroundColor = cor;
}