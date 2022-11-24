function ProfileLoad() {
    let opPost = document.getElementById('division-option-posts');
    let opFav = document.getElementById('division-option-fav');
    let opCom = document.getElementById('division-option-com');
    let divPost = document.getElementById('division-div-posts');
    let divFav = document.getElementById('division-div-fav');
    let divCom = document.getElementById('division-div-com');

    opPost.addEventListener("click", function () {
        opPost.classList.add("on");
        divPost.classList.add("on");
        opFav.classList.remove("on");
        divFav.classList.remove("on");
        opCom.classList.remove("on");
        divCom.classList.remove("on");
    });

    opFav.addEventListener("click", function () {
        opPost.classList.remove("on");
        divPost.classList.remove("on");
        opFav.classList.add("on");
        divFav.classList.add("on");
        opCom.classList.remove("on");
        divCom.classList.remove("on");
    });

    opCom.addEventListener("click", function () {
        opPost.classList.remove("on");
        divPost.classList.remove("on");
        opFav.classList.remove("on");
        divFav.classList.remove("on");
        opCom.classList.add("on");
        divCom.classList.add("on");
    });

    let submitCom = document.getElementById('submmit-comment');
    let center_comment = document.getElementById('center-comment');

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13) {
            let comment = document.getElementById('add-comment');

            if (comment.value != "") {
                let row = document.createElement('div');
                row.className = "realComment"
                row.innerHTML = "<br>"

                let img = document.createElement('img');
                img.className = "comment-image";
                img.src = "../../images/nova logo" + ".png";

                let text = document.createElement("p");
                text.className = "comment-text";
                text.innerHTML = "<b>NOVA Student</b>" + "<br>" + comment.value;

                row.appendChild(img);
                row.appendChild(text);
                center_comment.appendChild(row);
                comment.value = '';
            }
        }    
    });
    

    submitCom.addEventListener("click", function () {
        let comment = document.getElementById('add-comment');

        if (comment.value != "") {
            let row = document.createElement('div');
            row.className = "realComment"
            row.innerHTML = "<br>"

            let img = document.createElement('img');
            img.className = "comment-image";
            img.src = "../../images/nova logo" + ".png";

            let text = document.createElement("p");
            text.className = "comment-text";
            text.innerHTML = "<b>NOVA Student</b>" + "<br>" + comment.value;

            row.appendChild(img);
            row.appendChild(text);
            center_comment.appendChild(row);
            comment.value = '';
        }
    });

    let follow = document.getElementById('follow');
    let binary = 0;

    follow.addEventListener("click", function () {
        if(binary == 0) {
        follow.classList.add("followed");
        follow.innerHTML = "Following"
        binary++;
        } else {
        follow.classList.remove("followed");
        follow.innerHTML = "Follow"
        binary--;
        }
    });
}