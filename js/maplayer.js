"use strict"

/***
 * Set map layers and tile layers.
 * Created by: - Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023
 *   		   - ChatGPT by OpenAi, 2023 03 25
 * 
 * based on https://github.com/leaflet-extras/leaflet-providers
 */

const map = L.map('map').setView([51.505, -0.09], 3/*, layers: [
    ,
    L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openseamap.org/">OpenSeaMap</a>'
        })
]*/);

var streetmap = L.tileLayer.provider('Esri.WorldStreetMap'); //
var satmap = L.tileLayer.provider('Esri.WorldImagery'); //
var oceanbasemap = L.tileLayer.provider('Esri.OceanBasemap'); //

streetmap.addTo(map);
satmap.addTo(map);
oceanbasemap.addTo(map);

var tilesToLoad = 0;

oceanbasemap.on('tileload', function() {
  tilesToLoad++;
});

oceanbasemap.on('tileunload', function() {
  tilesToLoad--;
  if (tilesToLoad === 0) {
    map.removeLayer(oceanbasemap);
  }
});

const tiles = L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openseamap.org/">OpenSeaMap</a>'
}).addTo(map);

tiles.setZIndex(999);

L.Control.Watermark = L.Control.extend({
	onAdd: function(map) {
		var img = L.DomUtil.create('img');

		img.src = 'docs/images/logo.png';
		img.style.width = '200px';
		img.id="ourlogo";

		return img;
	},

	onRemove: function(map) {
		// Nothing to do here
	}
});

L.control.watermark = function(opts) {
	return new L.Control.Watermark(opts);
}

L.control.watermark({ position: 'bottomleft' }).addTo(map);

