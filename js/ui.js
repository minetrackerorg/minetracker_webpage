/**
 * This is the UI of the app, with the button definitions, etc.
 * 
 * Created by: Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023
 * 
 * based on: https://github.com/Leaflet/Leaflet/blob/main/docs/examples/extending/extending-3-controls.md
 */

var backToCurrentPosition = L.Control.Watermark = L.Control.extend({
	onAdd: function(map) {
		var img = L.DomUtil.create('img');

		img.src = 'docs/images/gps.png';
		img.style.width = '30px';

        img.id = "goToMyPosition";
        //L.DomEvent.on(document, 'click', map.panTo(new L.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude)), this);

		return img;
	},

	onRemove: function(map) {
		//L.DomEvent.off()
	}
});

backToCurrentPosition = function(opts) {
	return new L.Control.Watermark(opts);
}

setTimeout(() => {backToCurrentPosition({ position: 'bottomright' }).addTo(map);  document.getElementById("goToMyPosition").addEventListener("click", map.panTo(new L.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude))); }, 8000);
