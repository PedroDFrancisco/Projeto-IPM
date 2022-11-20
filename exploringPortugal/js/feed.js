function suggestions1(){
    var sp = document.getElementById("sp1");
    const img = sp.querySelector("img");
    var name = document.createElement("h2");
    var followers = document.createElement("h3");
    
    img.src = "../images/users/RicFazeres.jpg"
    name.innerHTML = "RicFazeres";
    followers.innerHTML = "400k followers"
    sp.append(name, followers);
}