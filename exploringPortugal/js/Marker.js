function loadAddMarker() {
    let addMarker_button = document.getElementById("add-marker");

    addMarker_button.addEventListener("click", function () {
        let filter = document.getElementById("filter-wrapper");
        let builder = document.getElementById("add-marker-wrapper");

        filter.classList.add("off");
        builder.classList.add("on");
    });

    let close_button = document.getElementById("close-wrapper");

    close_button.addEventListener("click", function () {
        let filter = document.getElementById("filter-wrapper");
        let builder = document.getElementById("add-marker-wrapper");

        filter.classList.remove("off");
        builder.classList.remove("on");
    });
}