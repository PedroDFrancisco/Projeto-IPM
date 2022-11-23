function LocProfileLoad() {
    let urlParams = new URLSearchParams(window.location.search);
  	let name = urlParams.get('name');  
    let location = urlParams.get('location');
    let schedule = urlParams.get('schedule');  
    let phone = urlParams.get('phone');  
    let website = urlParams.get('website');    

	if(name != null || location != null || schedule != null || phone != null || website != null) {
		let namehtml = document.getElementById('name');
        namehtml.innerHTML = name.replaceAll("-", " ");
        let locationhtml = document.getElementById('location');
        locationhtml.innerHTML = location.replaceAll("-", " ");
        let schedulehtml = document.getElementById('schedule');
        schedulehtml.innerHTML = schedule.replaceAll("_", " ");
        let phonehtml = document.getElementById('phone');
        phonehtml.innerHTML = phone.replaceAll("-", " ");
        let websitehtml = document.getElementById('website');
        websitehtml.innerHTML = website;
	}

  let submitCom = document.getElementById('submmit-comment');
  let divCom = document.getElementById('add-comment');

    submitCom.addEventListener("click", function () {
        let comment = document.getElementById('comment-text');

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
            divCom.appendChild(row);
            comment.value = '';
        }
    });
}