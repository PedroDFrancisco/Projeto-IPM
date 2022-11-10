/* GLOBAL CONSTANTS */

const MAP_CENTRE =
	[38.661,-9.2044];  // FCT coordinates
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
	["order1", "order2", "order3", "order4"];
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
	}
}

class VG extends POI {
	constructor(xml) {
		super (xml);
		this.altitude = getFirstValueByTagName(xml, "altitude");
		this.type = getFirstValueByTagName(xml, "type");
		this.visible = true;
		this.circle = this.createCircle ();
	}

	createCircle () {
		let alt;
		if (this.altitude == "ND")
			alt = 0;
		else 
			alt = parseInt(this.altitude);

		return L.circle([parseFloat(this.latitude), parseFloat(this.longitude)],
			   			alt * 2,
			    		{color: 'red', fillColor: 'pink', fillOpacity: 0.4}
		);
	}

	isVisible () {
		return this.visible;
	}

	getCircle () {
		return this.circle;
	}
}

class VG1 extends VG {
	constructor (xml, order) {
		super (xml);
        //this.tags = getFirstValueByTagName(xml, "tags");
        this.tags = getAllValuesByTagName(xml, "tags")[0];
        this.tags = getAllValuesByTagName(this.tags, "tag")[0].childNodes[0].nodeValue;
        console.log(this.tags);
		this.order = order;
		this.nearVG1 = 0;
	}

	checkDistance (distance) {
		return distance >= 30000 && distance <= 60000;
	}

	popMessage () {
		return "I'm the marker of VG <b>" + this.name + "</b>." + "<br>" +
		"Latitude: " + this.latitude + "<br>" +
		"Longitude: " + this.longitude + "<br>" +
		"Altitude: " + this.altitude + "<br>" +
		"Ordem: " + this.order + "<br>" +
		"Tipo: " + this.type + "<br>" + 
		"VGs de ordem 1 num raio de 60 km: " + this.nearVG1 +
		"<br> <INPUT TYPE=\"button\" ID=\"Same Order\" VALUE=\"Mesma ordem\" " + 
		"ONCLICK=\"sameOrder(" + this.order + ")\">" +
		"<br> <INPUT TYPE=\"button\" ID=\"Street View\" VALUE=\"Street View\" " +
		"ONCLICK=\"changeToGoogleStreetView(" + this.latitude + "," + this.longitude + ")\">";
	}
}

class VG2 extends VG {
	constructor (xml, order) {
		super (xml);
		this.order = order;
	}

	checkDistance (distance) {
		return distance >= 20000 && distance <= 30000;
	}

	popMessage () {
		return "I'm the marker of VG <b>" + this.name + "</b>." + "<br>" +
		"Latitude: " + this.latitude + "<br>" +
		"Longitude: " + this.longitude + "<br>" +
		"Altitude: " + this.altitude + "<br>" +
		"Ordem: " + this.order + "<br>" +
		"Tipo: " + this.type +
		"<br> <INPUT TYPE=\"button\" ID=\"Same Order\" VALUE=\"Mesma ordem\" " + 
		"ONCLICK=\"sameOrder(" + this.order + ")\">" +
		"<br> <INPUT TYPE=\"button\" ID=\"Street View\" VALUE=\"Street View\" " +
		"ONCLICK=\"changeToGoogleStreetView(" + this.latitude + "," + this.longitude + ")\">" +
		"<br> <INPUT TYPE=\"button\" ID=\"NearVGs3\" VALUE=\"VGs de ordem 3 até 30 km\" " + 
		"ONCLICK=\"nearVG3(" + this.latitude + "," + this.longitude + ")\">";
	}
}

class VG3 extends VG {
	constructor (xml, order) {
		super (xml);
		this.order = order;
	}

	checkDistance (distance) {
		return distance >= 5000 && distance <= 10000;
	}

	popMessage () {
		return "I'm the marker of VG <b>" + this.name + "</b>." + "<br>" +
		"Latitude: " + this.latitude + "<br>" +
		"Longitude: " + this.longitude + "<br>" +
		"Altitude: " + this.altitude + "<br>" +
		"Ordem: " + this.order + "<br>" +
		"Tipo: " + this.type +
		"<br> <INPUT TYPE=\"button\" ID=\"Same Order\" VALUE=\"Mesma ordem\" " + 
		"ONCLICK=\"sameOrder(" + this.order + ")\">" +
		"<br> <INPUT TYPE=\"button\" ID=\"Street View\" VALUE=\"Street View\" " +
		"ONCLICK=\"changeToGoogleStreetView(" + this.latitude + "," + this.longitude + ")\">";
	}
}

class VG4 extends VG {
	constructor (xml, order) {
		super (xml);
		this.order = order;
	}

	checkDistance (distance) {
		return true;
	}

	popMessage () {
		return "I'm the marker of VG <b>" + this.name + "</b>." + "<br>" +
		"Latitude: " + this.latitude + "<br>" +
		"Longitude: " + this.longitude + "<br>" +
		"Altitude: " + this.altitude + "<br>" +
		"Ordem: " + this.order + "<br>" +
		"Tipo: " + this.type +
		"<br> <INPUT TYPE=\"button\" ID=\"Same Order\" VALUE=\"Mesma ordem\" " + 
		"ONCLICK=\"sameOrder(" + this.order + ")\">" +
		"<br> <INPUT TYPE=\"button\" ID=\"Street View\" VALUE=\"Street View\" " +
		"ONCLICK=\"changeToGoogleStreetView(" + this.latitude + "," + this.longitude + ")\">";
	}
}

/* MAP */

class Map {
	constructor(center, zoom) {
		this.lmap = L.map(MAP_ID).setView(center, zoom);
		this.addBaseLayers(MAP_LAYERS);
		let icons = this.loadIcons(RESOURCES_DIR);
		this.vgs = this.loadRGN(RESOURCES_DIR + RGN_FILE_NAME);
		this.countVG1 ();
		this.markers = [];
		this.clusterPointsGroup = null;
		this.clusterCirclesGroup = null;
		this.populate(icons, this.vgs);
		this.addClickHandler(e =>
			L.popup()
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
		);
		this.circles = [];
		this.circlesActivated = false;
	}

	makeMapLayer(name, spec) {
		let urlTemplate = MAP_URL;
		let attr = MAP_ATTRIBUTION;
		let errorTileUrl = MAP_ERROR;
		let layer =
			L.tileLayer(urlTemplate, {
					minZoom: 6,
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
			iconSize: [16, 16],
			shadowSize: [16, 16],
			iconAnchor: [8, 8],
			shadowAnchor: [8, 8],
			popupAnchor: [0, -6] // offset the determines where the popup should open
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
				let order = getFirstValueByTagName (xs[i], "order");
				let circle = null;
				let vg;
				switch (order) {
					case "1":
						vg = new VG1 (xs[i], order);
						break;
					case "2":
						vg = new VG2 (xs[i], order);
						break;
					case "3":
						vg = new VG3 (xs[i], order);
						break;
					default:
						vg = new VG4 (xs[i], order);
				}
				vgs.push(vg);
			}
		}
		return vgs;
	}

	countVG1 () {
		for(let i = 0 ; i < this.vgs.length ; i++) {
			if (this.vgs[i].order == "1") {
				for(let j = 0 ; j < this.vgs.length ; j++) {
					if (i != j && this.vgs[j].order == "1") {
						let dist = haversine(this.vgs[i].latitude, this.vgs[i].longitude,
							  			     this.vgs[j].latitude, this.vgs[j].longitude);
					
						if (dist <= 60) {
							this.vgs[i].nearVG1++;
						}
					}
				}
			}
		}
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
		let marker = L.marker([vg.latitude, vg.longitude], {icon: icons['order'+vg.order]}); 
		marker.bindPopup(vg.popMessage()).bindTooltip(vg.name);
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

	addCircle(pos, radius, popup) {
		let circle =
			L.circle(pos,
				radius,
				{color: 'red', fillColor: 'pink', fillOpacity: 0.4}
			);
		circle.addTo(this.lmap);
		if( popup != "" )
			circle.bindPopup(popup);
		return circle;
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
		this.stats ();
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
		this.stats ();
	}
	
	stats () {
		let sttag = document.getElementById("visible_caches");
		
		let bounds = map.lmap.getBounds();
		
		let w = bounds.getWest();
		let s = bounds.getSouth();
		let e = bounds.getEast();
		let n = bounds.getNorth();
		
		let points = [];

		let highestPoint = {
			alt  : 0,
			name : ""
		};
		let lowestPoint = {
			alt  : 999999999,
			name : ""
		};
		let vgsOrd1 = 0;
		let vgsOrd2 = 0;
		let vgsOrd3 = 0;
		let vgsOrd4 = 0;

		for (let i = 0; i < map.vgs.length; i++) {
			let vg = map.vgs[i];
			
			let vgLat = parseFloat(vg.latitude);
			let vglong = parseFloat(vg.longitude);

			if (vgLat >= s && vgLat <= n && vglong >= w && vglong <= e && vg.isVisible()) {
					points.push(vg);

					let altitude = parseFloat(vg.altitude);

					if (altitude > highestPoint.alt) {
						highestPoint.alt = altitude;
						highestPoint.name = vg.name;
					}

					if (altitude < lowestPoint.alt) {
						lowestPoint.alt = altitude;
						lowestPoint.name = vg.name; 
					}

					switch (vg.order) {
						case "1":
							vgsOrd1++;
							break;
						case "2":
							vgsOrd2++;
							break;
						case "3":
							vgsOrd3++;
							break;
						default:
							vgsOrd4++;
					}
				}
		}

		sttag.innerHTML = 
		"<br>" + "VGs visíveis   : " + points.length +
		"<br>" + 
		"<br>" + "VGs de ordem 1 : " + vgsOrd1 +
		"<br>" + "VGs de ordem 2 : " + vgsOrd2 +
		"<br>" + "VGs de ordem 3 : " + vgsOrd3 +
		"<br>" + "VGs de ordem 4 : " + vgsOrd4 +
		"<br>" + 
		"<br>" + "Altitude máxima: " + highestPoint.alt + 
		"<br>" + "(" + highestPoint.name + ")" +
		"<br>" +
		"<br>" + "Altitude mínima: " + lowestPoint.alt + 
		"<br>" + "(" + lowestPoint.name + ") ";
	}

	removePointsCircles () {
		if (map.circlesActivated) {
			map.circlesActivated = false;

			for (let i = 0; i < map.vgs.length; i++) {
				map.clusterCirclesGroup.removeLayer(map.vgs[i].getCircle());
			}
		}
	}

	createEvents() {
		this.lmap.on("zoomend layerremove moveend", this.stats);
		this.lmap.on("click", this.removePointsCircles);
	}
}

/* FUNCTIONS for HTML */

function onLoad()
{
	map = new Map(MAP_CENTRE, 12);
	map.addCircle(MAP_CENTRE, 100, "FCT/UNL");
	map.createEvents();
	map.stats();
}

function checkboxUpdate (checkbox) {
	if (checkbox.checked) {
		map.addOrdIcons(checkbox.id);
	}
	else {
		map.removeOrdIcons(checkbox.id);
	}
}

function validateVgs () {
	let invalidVgs = [];

	for (let i = 0; i < map.markers.length; i++) {
		let order = map.vgs[i].order;
		let coords1 = map.markers[i].getLatLng();
		let invalid = false;

		for (let j = i+1 ; j < map.markers.length; j++) {
			if (map.vgs[j].order == order) {
				let coords2 = map.markers[j].getLatLng();
				let distance = map.lmap.distance(coords1, coords2);
				if (map.vgs[i].checkDistance(distance)) {
					invalid = true;
					break;
				}
			}
		}

		if (!invalid) {
			invalidVgs.push(map.vgs[i]);
		}
	}

	msg = "";
	for (let i = 0; i < invalidVgs.length; i++) {
		msg += "Nome: " + invalidVgs[i].name + "\nOrdem :" + invalidVgs[i].order + "\n\n";
	}

	alert(msg);
}

function vgsAltitude () {
	for (let i = 0; i < map.vgs.length; i++) {
		if (map.clusterPointsGroup.hasLayer(map.markers[i])) {
			map.clusterCirclesGroup.addLayer(map.vgs[i].getCircle());
			map.circlesActivated = true;
		}
	}
}

function sameOrder (order) {
	for (let i = 0; i < map.vgs.length; i++) {
		if (map.vgs[i].order == order) {
			map.clusterCirclesGroup.addLayer(map.vgs[i].getCircle());
			map.circlesActivated = true;
		}	
	}
}

function changeToGoogleStreetView(lat, long) {
	document.location = "http://maps.google.com/maps?q=&layer=c&cbll=" + lat + "," + long;
}

function nearVG3(lat, long) {
	for (let i = 0; i < map.vgs.length; i++) {
		if (map.vgs[i].order == "2" && 
			lat != map.vgs[i].latitude && 
			long != map.vgs[i].longitude) {
			dist = haversine (lat, long, map.vgs[i].latitude, map.vgs[i].longitude);

			if (dist <= 30) {
				map.vgs[i].addCircle();
			}
		}
	}

	map.circlesActivated = true;
}