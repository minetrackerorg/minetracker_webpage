"use strict"

/**
 * This is the UI of the app, with the button definitions, etc.
 * 
 * Created by: Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023 & ChatGPT from OpenAI
 * 
 * based on: https://github.com/Leaflet/Leaflet/blob/main/docs/examples/extending/extending-3-controls.md
 */

var container = L.DomUtil.create('button', 'nav_button');
container.title = 'Go to my position';
container.innerHTML = '<img src="docs/images/gps.png"></img>';

var goToButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    container.addEventListener('click', function () {
      var lat = currentPosition.coords.latitude;
      var lng = currentPosition.coords.longitude
      if (lat && lng) {
        map.setView([lat, lng], 16);
      }
    });

    return container;
  }
});

map.addControl(new goToButton());