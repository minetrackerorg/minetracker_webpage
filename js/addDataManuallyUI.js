"use strict"

/**
 * 
 * Option to add data manually to our dataset.
 * 
 * Created by: Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023
 *             ChatGPT by OpenAI, 2023 03 25
 * 
 */

function selectNewLocation(latlng) {
  document.getElementById("selectedlat").value = document.getElementById("newPoiLat").innerHTML;
  document.getElementById("selectedlng").value = document.getElementById("newPoiLong").innerHTML;
}

var tmpID;
function addMarker(e) {
  tmpID = e.latlng.lat+e.latlng.lng;
  var marker = L.marker(e.latlng, { id: tmpID }).addTo(map);
  console.log(e.latlng);
  document.getElementById("newPoiLat").innerHTML=e.latlng.lat;
  document.getElementById("selectedlat").value=e.latlng.lat;
  document.getElementById("newPoiLong").innerHTML=e.latlng.lng;
  document.getElementById("selectedlng").value=e.latlng.lng;
  map.off('dblclick', addMarker);
  $('#offCanvasAddData').foundation('open');
  var element = document.querySelector('[title="Add New data manually to the dataset"]').innerHTML = '<img src="docs/images/new_data.png"></img>';
  selectNewLocation();
}

var containerForNewData = L.DomUtil.create('button', 'add_button');
containerForNewData.title = 'Add New data manually to the dataset';
containerForNewData.innerHTML = '<img src="docs/images/new_data.png"></img>';

var addNewDataButton = L.Control.extend({
  options: {
    position: 'bottomright'
  },

  onAdd: function (map) {
    containerForNewData.addEventListener('click', function () {
        containerForNewData.innerHTML = '<img src="docs/images/new_data_proces.png"></img>';
        
        map.on('dblclick', addMarker);

        //$('#offCanvasAddData').foundation('open');
    });
    return containerForNewData;
  }
});

map.addControl(new addNewDataButton());




