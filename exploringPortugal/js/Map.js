/* GLOBAL CONSTANTS */

const MAP_CENTRE =
	[38.661,-9.2044];  // FCT coordinates
const REGIONS_CORD =
	{"norte" : [41.301977,-7.74669], "centro" : [40.175996,-7.915166], "lisboa" : [38.704895,-9.137148],
		"alentejo" : [38.158728,-7.893503], "algarve" : [37.099392, -8.154431], "madeira" : [32.945422, -16.708784], "acores" : [38.30361, -27.058975]};
const REGIONS_ZOOM =
	{"norte" : 9, "centro" : 9, "lisboa" : 11,
		"alentejo" : 9, "algarve" : 9, "madeira" : 10, "acores" : 7};
const MAP_ID =
	"mapid";
const MAP_ATTRIBUTION =
	'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> '
	+ 'contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const MAP_URL =
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token='
	+ 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
const MAP_ERROR =
	"https://upload.wikimedia.org/wikipedia/commons/e/e0/SNice.svg";
const MAP_LAYERS =
	["streets-v11", "outdoors-v11", "light-v10", "dark-v10", "satellite-v9",
		"satellite-streets-v11", "navigation-day-v1", "navigation-night-v1"]
const RESOURCES_DIR =
	"resources/";
const pointTypes = ["vg"]
const VG_ORDERS =
	["Beach", "Festival", "Hotel", "Monument", "Museum", "Nature", "Religion", "Restaurant", "Sports", "Other"];
const RGN_FILE_NAME =
	"rgn.xml";


/* GLOBAL VARIABLES */

let map = null;


/* USEFUL FUNCTIONS */

// Capitalize the first letter of a string.
function capitalize(str)
{
	return str.length > 0
			? str[0].toUpperCase() + str.slice(1)
			: str;
}

// Distance in km between to pairs of coordinates over the earth's surface.
// https://en.wikipedia.org/wiki/Haversine_formula
function haversine(lat1, lon1, lat2, lon2)
{
    function toRad(deg) { return deg * 3.1415926535898 / 180.0; }
    let dLat = toRad(lat2 - lat1), dLon = toRad (lon2 - lon1);
    let sa = Math.sin(dLat / 2.0), so = Math.sin(dLon / 2.0);
    let a = sa * sa + so * so * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
    return 6372.8 * 2.0 * Math.asin (Math.sqrt(a))
}

function loadXMLDoc(filename)
{
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", filename, false);
	try {
		xhttp.send();
	}
	catch(err) {
		alert("Could not access the local geocaching database via AJAX.\n"
			+ "Therefore, no POIs will be visible.\n");
	}
	return xhttp.responseXML;	
}

function getAllValuesByTagName(xml, name)  {
	return xml.getElementsByTagName(name);
}

function getFirstValueByTagName(xml, name)  {
	return getAllValuesByTagName(xml, name)[0].childNodes[0].nodeValue;
}

class POI {
	constructor (xml) {
		this.name = getFirstValueByTagName(xml, "name");
		this.latitude = getFirstValueByTagName(xml, "latitude");
		this.longitude = getFirstValueByTagName(xml, "longitude");
		console.log(this.name);
	}
}

class VG extends POI {
	constructor(xml) {
		super (xml);
		this.order = getFirstValueByTagName(xml, "order");
		this.location = getFirstValueByTagName(xml, "location");
		this.schedule = getFirstValueByTagName(xml, "schedule");
		this.phone = getFirstValueByTagName(xml, "phone");
		this.link = getFirstValueByTagName(xml, "link");
		this.visible = true;

		this.tags = getFirstValueByTagName(xml, "tags");
        //this.tags = getAllValuesByTagName(this.tags, "tag")[0].childNodes[0].nodeValue;
        //console.log(this.tags);
	}

	isVisible () {
		return this.visible;
	}

	popMessage () {
		return "<b>" + this.name + "</b>" + "<br>" +
		"Category: " + this.order + "<br>" +
		"Location: " + this.location + "<br>" +
		"Schedule: " + this.schedule + "<br>" +
		"Phone: " + this.phone + "<br>" +
		"Website: " + this.link + "<br>" +
		"Tags: " + this.tags + "<br>" +
		"<br> <a href= /exploringPortugal/html/locationsProfile.html?name="+this.name.replaceAll(" ", "-")+"&location="+
		this.location.replaceAll(" ", "-")+"&schedule="+this.schedule.replaceAll(" ", "_")+"&phone="+
		this.phone.replaceAll(" ", "-")+"&website="+this.link+">"+"<button>More Info</button>" +"</a>";
	}
}

class NormVG {
	constructor(name, lat, long, order, location, schedule, phone, link, tags) {
		this.name = name;
		this.latitude = lat;
		this.longitude = long;
		this.order = order;
		this.location = location;
		this.schedule = schedule;
		this.phone = phone;
		this.link = link;
		this.visible = true;

		this.tags = tags;
        //this.tags = getAllValuesByTagName(this.tags, "tag")[0].childNodes[0].nodeValue;
        //console.log(this.tags);
	}

	isVisible () {
		return this.visible;
	}

	popMessage () {
		return "<b>" + this.name + "</b>" + "<br>" +
		"Category: " + this.order + "<br>" +
		"Location: " + this.location + "<br>" +
		"Schedule: " + this.schedule + "<br>" +
		"Phone: " + this.phone + "<br>" +
		"Website: " + this.link +
		"Tags: " + this.tags + "<br>" +
		"<br> <a href= /exploringPortugal/html/locationsProfile.html?name="+this.name.replaceAll(" ", "-")+"&location="+
		this.location.replaceAll(" ", "-")+"&schedule="+this.schedule.replaceAll(" ", "_")+"&phone="+
		this.phone.replaceAll(" ", "-")+"&website="+this.link+">"+"<button>More Info</button>" +"</a>";
	}
}

/* MAP */

class Map {
	constructor(center, zoom) {
		this.lmap = L.map(MAP_ID).setView(center, zoom);
		this.addBaseLayers(MAP_LAYERS);
		let icons = this.loadIcons(RESOURCES_DIR);
		this.vgs = this.loadRGN(RESOURCES_DIR + RGN_FILE_NAME);
		this.markers = [];
		this.clusterPointsGroup = null;
		this.clusterCirclesGroup = null;
		this.populate(icons, this.vgs);
		this.addClickHandler(e =>
			L.popup()
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
		);
	}

	makeMapLayer(name, spec) {
		let urlTemplate = MAP_URL;
		let attr = MAP_ATTRIBUTION;
		let errorTileUrl = MAP_ERROR;
		let layer =
			L.tileLayer(urlTemplate, {
					minZoom: 5,
					maxZoom: 19,
					errorTileUrl: errorTileUrl,
					id: spec,
					tileSize: 512,
					zoomOffset: -1,
					attribution: attr
			});
		return layer;
	}

	addBaseLayers(specs) {
		let baseMaps = [];
		for(let i in specs)
			baseMaps[capitalize(specs[i])] =
				this.makeMapLayer(specs[i], "mapbox/" + specs[i]);
		baseMaps[capitalize(specs[0])].addTo(this.lmap);
		L.control.scale({maxWidth: 150, metric: true, imperial: false})
									.setPosition("topleft").addTo(this.lmap);
		L.control.layers(baseMaps, {}).setPosition("topleft").addTo(this.lmap);
		return baseMaps;
	}

	loadIcons(dir) {
		let icons = [];
		let iconOptions = {
			iconUrl: "??",
			shadowUrl: "??",
			iconSize: [65, 70],
			// shadowSize: [16, 16],
			iconAnchor: [65/2, 50],
			shadowAnchor: [8, 8],
			popupAnchor: [0, -40] // offset the determines where the popup should open
		};
		for(let i = 0 ; i < VG_ORDERS.length ; i++) {
			iconOptions.iconUrl = dir + VG_ORDERS[i] + ".png";
		    icons[VG_ORDERS[i]] = L.icon(iconOptions);
		}
		return icons;
	}

	loadRGN(filename) {
		let xmlDoc = loadXMLDoc(filename);
		let xs = getAllValuesByTagName(xmlDoc, "vg"); 
		let vgs = [];
		if(xs.length == 0)
			alert("Empty file");
		else {
			for(let i = 0 ; i < xs.length ; i++) {
				let vg = new VG(xs[i]);
				vgs.push(vg);
			}
		}
		return vgs;
	}

	populate(icons, vgs)  {
		this.clusterPointsGroup = L.markerClusterGroup({chunkedLoading: true});
		this.clusterCirclesGroup = L.markerClusterGroup({chunkedLoading: true});
		for(let i = 0 ; i < vgs.length ; i++) {
			this.addMarker(icons, vgs[i]);
		}
		this.lmap.addLayer(this.clusterPointsGroup);
		this.lmap.addLayer(this.clusterCirclesGroup);
	}

	addMarker(icons, vg) {
		let marker = L.marker([vg.latitude, vg.longitude], {icon: icons[vg.order]}); 
		marker.bindPopup(vg.popMessage())//.bindTooltip(vg.name);
		this.clusterPointsGroup.addLayer(marker);
		this.markers.push (marker);
	}
	
	addClickHandler(handler) {
		let m = this.lmap;
		function handler2(e) {
			return handler(e).openOn(m);
		}
		return this.lmap.on('click', handler2);
	}

	removeOrdIcons(order) {
		for (let i = 0; i < this.markers.length; i++) {
			if (this.vgs[i].order == order) {
				this.clusterPointsGroup.removeLayer(this.markers[i]);
				this.vgs[i].visible = false;
				
				if (map.circlesActivated) {
					this.clusterCirclesGroup.removeLayer(this.vgs[i].getCircle());
				}
			}		
		}
	}

	addOrdIcons(order) {
		for (let i = 0; i < this.markers.length; i++) {
			if (this.vgs[i].order == order) {
				this.clusterPointsGroup.addLayer(this.markers[i]);
				this.vgs[i].visible = true;
			
				if (map.circlesActivated) {
					this.clusterCirclesGroup.addLayer(this.vgs[i].getCircle());
				}
			}		
		}
	}

	createEvents() {
		//this.lmap.on("zoomend layerremove moveend", this.stats);
		//this.lmap.on("click", this.removePointsCircles);
		this.lmap.on("click", function(pos) {
			if(add_lat_long) {
				let marker_pos = document.getElementById('add-lat-long');
				marker_pos.value = pos.latlng.lat + " " + pos.latlng.lng;
				add_lat_long = false;
				//console.log(pos.latlng.lat + " " + pos.latlng.lng);
				//this.map.setLatLng(this.latlng);
				//console.log(pos.latlng.toString());
			}
		});
	}

	getIcons() {
		return this.loadIcons(RESOURCES_DIR);;
	}
}


/* FUNCTIONS for HTML */

function onLoad()
{
	let urlParams = new URLSearchParams(window.location.search);
  	let region = urlParams.get('region');  
	if(region != null) {
		map = new Map(REGIONS_CORD[region], REGIONS_ZOOM[region]);
	} else {
		map = new Map(MAP_CENTRE, 5);
	}
	
	map.createEvents();
}

function checkboxUpdate (checkbox) {
	if (checkbox.checked) {
		map.addOrdIcons(checkbox.id);
	}
	else {
		map.removeOrdIcons(checkbox.id);
	}
}

function changeToGoogleStreetView(lat, long) {
	document.location = "http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long;
}