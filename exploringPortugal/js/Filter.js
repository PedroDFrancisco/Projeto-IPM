const IMG_DIR = "resources/";
var add_lat_long = false;

function Filter() {
    let div = document.getElementById('filter-wrapper');
    let urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get('category'); 

    for(let i = 0; i < VG_ORDERS.length; i++) {
        let row = document.createElement('div');
        row.className = "filter " + VG_ORDERS[i];

        let checkbox = document.createElement('input');
        checkbox.className = "filter checkbox";
        checkbox.type = "checkbox";

	    if(category != null) {
            if(VG_ORDERS[i] === category) {
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
            }
        } else {
            checkbox.checked = true;
        }

        checkbox.id = VG_ORDERS[i];
        
        if(category != null) {
            checkboxUpdate(checkbox);
        }
        
        checkbox.addEventListener("click", function () {
                    checkboxUpdate(this);
        });

        let imgtext = document.createElement('div');
        imgtext.className = "filter-image-text-wrapper";

        let img = document.createElement('img');
        img.className = "filter-image";
        img.src = IMG_DIR + VG_ORDERS[i] + ".png";

        let text = document.createElement("p");
        text.className = "filter-text";
        text.innerHTML = VG_ORDERS[i];
        
        imgtext.appendChild(img);
        imgtext.appendChild(text);
        row.appendChild(imgtext);
        row.appendChild(checkbox);
        div.appendChild(row);
    }

    let marker_pos = document.getElementById('add-lat-long');

    marker_pos.addEventListener("click", function () {
        add_lat_long = !add_lat_long;
        marker_pos.placeholder = "Click Map";
    });
}
