const IMG_DIR = "resources/";
const BASE_FILTERS = ["order1", "order2", "order3", "order4"];

function Filter() {
    let div = document.getElementById('filter-wrapper');
    console.log(div);

    for(let i = 0; i < BASE_FILTERS.length; i++) {
        let row = document.createElement('div');
        let img = document.createElement('img');
        let text = document.createElement("p");
        img.src = IMG_DIR + BASE_FILTERS[i] + ".png";
        text.className = "filter-text";
        img.className = "filter-image";
        row.className = "filter " + BASE_FILTERS[i];
        text.innerHTML = BASE_FILTERS[i];
        row.appendChild(img);
        row.appendChild(text);
        div.appendChild(row);
    }
}
