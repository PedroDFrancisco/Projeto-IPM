function loadAddMarker() {
    let addMarker_button = document.getElementById("add-marker");
    let create_button = document.getElementById("add-marker-create");

    addMarker_button.addEventListener("click", function () {
        let filter = document.getElementById("filter-wrapper");
        let builder = document.getElementById("add-marker-wrapper");

        filter.classList.add("off");
        builder.classList.add("on");

        addMarker_button.classList.add("create");
        create_button.classList.remove("create");
    });

    
    create_button.addEventListener("click", function () {
        let name = document.getElementById("add-name").value;
        let cat = document.getElementById("add-marker-category");
        let latlong = document.getElementById("add-lat-long");
        latlong = latlong.value.split(" ");
        let location = document.getElementById("add-location").value;
        let schedule = document.getElementById("add-schedule").value;
        let phone = document.getElementById("add-phone").value;
        let link = document.getElementById("add-link").value;
        let tags = document.getElementById("add-tags").value;


        let vg = new NormVG(name, latlong[0], latlong[1], cat.options[cat.selectedIndex].text, location, schedule, phone, link, tags);

        map.addMarker(map.getIcons(), vg);

        let filter = document.getElementById("filter-wrapper");
        let builder = document.getElementById("add-marker-wrapper");

        filter.classList.remove("off");
        builder.classList.remove("on");
        addMarker_button.classList.remove("create");
        create_button.classList.add("create");
    });

    let close_button = document.getElementById("close-wrapper");

    close_button.addEventListener("click", function () {
        let filter = document.getElementById("filter-wrapper");
        let builder = document.getElementById("add-marker-wrapper");

        filter.classList.remove("off");
        builder.classList.remove("on");
        addMarker_button.classList.remove("create");
        create_button.classList.add("create");
    });

}