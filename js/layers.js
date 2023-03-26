"use strict"

/**
 * This is the UI of the app, with the button definitions, etc.
 * 
 * Created by: Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023
 * 
 */

var container = L.DomUtil.create('button', 'nav_button');
container.title = 'Show Layers menu';
container.innerHTML = '<img src="docs/images/layers.png"></img>';

var goToButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    container.addEventListener('click', function () {
        $('#offCanvas').foundation('open');
    });
    return container;
  }
});

map.addControl(new goToButton());


document.getElementById("satimglayer").addEventListener('change', function() {
    if (this.checked) {
        //L.tileLayer.provider('Esri.WorldStreetMap').addTo(map);
        satmap.addTo(map);
    } else {
        map.removeLayer(satmap);
    }
  });


  document.getElementById("streetimglayer").addEventListener('change', function() {
    if (this.checked) {
        //L.tileLayer.provider('Esri.WorldStreetMap').addTo(map);
        streetmap.addTo(map);
    } else {
        map.removeLayer(streetmap);
    }
  });

  document.getElementById("marine_height_layer").addEventListener('change', function() {
    if (this.checked) {
        //L.tileLayer.provider('Esri.WorldStreetMap').addTo(map);
        oceanbasemap.addTo(map);
    } else {
        map.removeLayer(oceanbasemap);
    }
  });