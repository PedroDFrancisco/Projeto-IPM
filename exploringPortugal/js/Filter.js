const IMG_DIR = "resources/";
const BASE_FILTERS = ["order1", "order2", "order3", "order4"];

function Filter() {
    let div = document.getElementById('filter-wrapper');
    console.log(div);

    for(let i = 0; i < BASE_FILTERS.length; i++) {
        let row = document.createElement('div');
        row.className = "filter " + BASE_FILTERS[i];

        let checkbox = document.createElement('input');
        checkbox.className = "filter checkbox";
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.id = i+1;
        checkbox.addEventListener("click", function () {
                    checkboxUpdate(this);
        });

        let img = document.createElement('img');
        img.className = "filter-image";
        img.src = IMG_DIR + BASE_FILTERS[i] + ".png";

        let text = document.createElement("p");
        text.className = "filter-text";
        text.innerHTML = BASE_FILTERS[i];
        
        row.appendChild(img);
        row.appendChild(text);
        row.appendChild(checkbox);
        div.appendChild(row);
    }
}
