function LocProfileLoad() {
    let urlParams = new URLSearchParams(window.location.search);
  	let name = urlParams.get('name').replaceAll("-", " ");  
    let location = urlParams.get('location').replaceAll("-", " ");
    let schedule = urlParams.get('schedule').replaceAll("_", " ");  
    let phone = urlParams.get('phone').replaceAll("-", " ");  
    let website = urlParams.get('website');    

	if(name != null || location != null || schedule != null || phone != null || website != null) {
		let namehtml = document.getElementById('name');
        namehtml.innerHTML = name;
        let locationhtml = document.getElementById('location');
        locationhtml.innerHTML = location;
        let schedulehtml = document.getElementById('schedule');
        schedulehtml.innerHTML = schedule;
        let phonehtml = document.getElementById('phone');
        phonehtml.innerHTML = phone;
        let websitehtml = document.getElementById('website');
        websitehtml.innerHTML = website;
	} else {
		map = new Map(MAP_CENTRE, 5);
	}
}