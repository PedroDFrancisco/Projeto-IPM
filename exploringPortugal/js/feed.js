function suggestions1(){

    var sp = document.getElementById("sp1");
    var img = sp.querySelector("img");
    var na = sp.querySelector("h2");
    var followers = sp.querySelector("h3");
    
    img.src = "../../images/users/RicFazeres.jpg"
    na.innerHTML = "RicFazeres";
    followers.innerHTML = "400k followers";

    sp = document.getElementById("sp2");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/Quaresma.jpg"
    na.innerHTML = "Quaresma";
    followers.innerHTML = "3.2M followers";

    sp = document.getElementById("sp3");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/MykeTyson.jpg"
    na.innerHTML = "MykeTyson";
    followers.innerHTML = "19.4M followers";

    sp = document.getElementById("sp4");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/SofiaBarbosa.jpg"
    na.innerHTML = "Sofia Barbosa";
    followers.innerHTML = "300k followers";
}

function suggestions2(){

    var sp = document.getElementById("sp1");
    var img = sp.querySelector("img");
    var na = sp.querySelector("h2");
    var followers = sp.querySelector("h3");
    
    img.src = "../../images/users/Eder.jpg"
    na.innerHTML = "Éder";
    followers.innerHTML = "430k followers";

    sp = document.getElementById("sp2");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/DanielaRuah.jpg"
    na.innerHTML = "Daniela Ruah";
    followers.innerHTML = "1.1M followers";

    sp = document.getElementById("sp3");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/fernandoMendes.jpg"
    na.innerHTML = "Fernando Mendes";
    followers.innerHTML = "100k followers";

    sp = document.getElementById("sp4");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/Profjam.jpg"
    na.innerHTML = "Profjam";
    followers.innerHTML = "100k followers";
}

function suggestions3(){

    var sp = document.getElementById("sp5");
    var img = sp.querySelector("img");
    var na = sp.querySelector("h2");
    var followers = sp.querySelector("h3");
    
    img.src = "../../images/users/EstadioDeAlvalade.jpg"
    na.innerHTML = "Estádio de Alvalade";
    followers.innerHTML = "1.3M followers";

    sp = document.getElementById("sp6");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/MEOSudoeste.jpg"
    na.innerHTML = "MEO Sudoeste";
    followers.innerHTML = "70k followers";

    sp = document.getElementById("sp7");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/CasteloDeObidos.jpg"
    na.innerHTML = "Castelo de Óbidos";
    followers.innerHTML = "5k followers";

    sp = document.getElementById("sp8");
    img = sp.querySelector("img");
    na = sp.querySelector("h2");
    followers = sp.querySelector("h3");
    
    img.src = "../../images/users/SantuarioNossaSenhoraDosRemédios.jpg"
    na.innerHTML = "Santuário de Nª Sra. dos Remédios";
    followers.innerHTML = "100k followers";
}

function init() {
    suggestions3();
    suggestions1();
    document.getElementById("upperleftarrow").addEventListener("click", function () {
        switchPage();
    });
    document.getElementById("upperrightarrow").addEventListener("click", function () {
       switchPage();
    });
}
function switchPage(){
    if(document.getElementById("sp1").querySelector("h2").innerHTML == "RicFazeres"){
        suggestions2();
        fernandoMendeslink();
    } else {
        removelink();
        suggestions1();
    }
}
function removelink(){
    document.getElementById("sp3").removeEventListener("click", relocate);
}

function fernandoMendeslink(){
    document.getElementById("sp3").addEventListener("click", relocate);
}

function relocate(){
    window.location = "../html/userProfile.html";
}
    