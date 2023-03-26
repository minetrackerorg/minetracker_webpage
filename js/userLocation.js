"use strict"

/***
 * User position on the map as a marker with popup.
 * Created by: Sándor Burian from Óbuda University, BioTech Lab @ CASSINI hackathon 2023
 * 
 * based on: 
 *           - https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/
 *           - https://leafletjs.com/examples/quick-start/
 */

//popup
var marker = 0; // = L.marker([51.5, -0.09]).addTo(map);
//marker.bindPopup('<b>My current position</b><br><div id="curerntPosisionLatitude"> </div> <br><div id="curerntPosisionLongitude"> </div><div id="currentPositionErrorMsg"> </div>');

//user position
  const successCallback = (position) => {
    //console.log(position);
    currentPosition = position;

    if(marker == 0){
        marker = L.marker([currentPosition.coords.latitude, currentPosition.coords.longitude]).addTo(map);
        marker.bindPopup('<b>My current position</b><br><div id="curerntPosisionLatitude">Latitude: '+currentPosition.coords.latitude+'</div> <br><div id="curerntPosisionLongitude">Longitude: '+currentPosition.coords.longitude+' </div><div id="currentPositionErrorMsg"> </div>');
        prevUserPosition = position;

        map.panTo(new L.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude));
        setTimeout(() => {  map.setZoom(13); map.panTo(new L.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude)); }, 1500);
    }
    else {
        if(currentPosition.coords.latitude != prevUserPosition.coords.latitude || currentPosition.coords.longitude != prevUserPosition.coords.longitude){
            map.removeLayer(marker);
            marker = L.marker([currentPosition.coords.latitude, currentPosition.coords.longitude]).addTo(map);
            marker.bindPopup('<b>My current position</b><br><div id="curerntPosisionLatitude">Latitude: '+currentPosition.coords.latitude+'</div> <br><div id="curerntPosisionLongitude">Longitude: '+currentPosition.coords.longitude+' </div><div id="currentPositionErrorMsg"> </div>');
        }
   }
    //map = L.map('map').setView([currentPosition.coords.latitude, currentPosition.coords.longitude], 13);

    //document.getElementById("curerntPosisionLatitude").innerHTML = "Latitude: " + currentPosition.coords.latitude;
    //document.getElementById("curerntPosisionLongitude").innerHTML = "Longitude: " + currentPosition.coords.longitude;
  };
  
  const errorCallback = (error) => {
    //console.log(error);
    errorOnCurrentPosition = error;
    /*
    document.getElementById("currentPositionErrorMsg").innerHTML = errorOnCurrentPosition.message;
    document.getElementById("curerntPosisionLatitude").innerHTML = "";
    document.getElementById("curerntPosisionLongitude").innerHTML = "";
    */
  };
  
//navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
  };
  
const id = navigator.geolocation.watchPosition(
    successCallback,
    errorCallback,
    options
  );
var prevUserPosition;
var currentPosition;
var errorOnCurrentPosition;