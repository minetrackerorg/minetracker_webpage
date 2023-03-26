<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Underwater Minesweeper</title>
    <link rel="icon" type="image/x-icon" href="docs/icons/favicon.ico">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
    integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
    crossorigin=""/>
    <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
    crossorigin=""></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/leaflet.markercluster.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.css" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.1/MarkerCluster.Default.css" />


    <script src="js/leaflet-providers.js"></script>

    
    <!-- foundation -->
    <link rel="stylesheet" href="Foundation-Sites-CSS/css/foundation.css">
    <link rel="stylesheet" href="Foundation-Sites-CSS/css/app.css">
    
    <link rel="stylesheet" href="css/control.css">

	<style>
		html, body {
			height: 100%;
			margin: 0;
		}
		.leaflet-container {
			height: 400px;
			width: 600px;
			max-width: 100%;
			max-height: 100%;
		}
	</style>
</head>
<body>

    <div class="off-canvas position-right" id="offCanvas" data-off-canvas data-transition="push">
        <fieldset class="large-7 cell layers">
            <legend>Available layers</legend>
            <input id="streetimglayer" type="checkbox" checked><label for="streetimglayer"><img src="docs/images/street_layer.jpg" style="max-height: 36px; max-width: auto;"> Esri World Street Map</label><br>
            <input id="satimglayer" type="checkbox" checked><label for="satimglayer"><img src="docs/images/satelite-layer_original.jpg" style="max-height: 36px; max-width: auto;"> Esri World Imagery</label><br>
            <input id="marine_height_layer" type="checkbox" checked><label for="marine_height_layer"><img src="docs/images/marine_relief.jpg" style="max-height: 36px; max-width: auto;"> Esri Ocean Basemap</label><br>
            <input id="magnetic_measurements" type="checkbox" checked><label for="magnetic_measurements"><img src="docs/images/magnetic_measurements.jpg" style="max-height: 36px; max-width: auto;"> Magnetic measurements</label><br>
            <div>
                More about <a href="https://wiki.openstreetmap.org/wiki/Category:Openseamap_Symbols"> Open Seam Map signs </a>
            </div>
        </fieldset>
    </div>

    <div class="off-canvas position-right" id="offCanvasAddData" data-off-canvas data-transition="push" data-close-on-click="false">
        <fieldset class="large-7 cell layers">
        <form action="newData.php" method="post">
  <legend class="warning label">Adding a new detection</legend>
  <br>
  Position: 
  <div id="newPOICoordinates">
    <div id="newPoiLat"></div>
    <input  name="selectedlat" id="selectedlat">
    <div id="newPoiLong"></div>
    <input  name="selectedlng" id="selectedlng">
    <br>
  </div>
  <br>
  <label>
    Set a radius <i>(m)</i> if there was more than one element or the position is unclear.
    <input type="number" name="radius" value="0" min="0" max="100">
  </label>
  <label>Select type
    <select name="type">
      <option value="underwater mine">underwater mine</option>
      <option value="WWII aerial bomb">WWII aerial bomb</option>
      <option value="WWII field mines">WWII field mines</option>
      <option value="naval mine">naval mine</option>
      <option value="field mine">field mine</option>
    </select>
  </label>
  <label>Internet link:
    <input type="url" name="link" placeholder="https://" aria-describedby="exampleHelpText">
  </label>
  <label>
    Other additional info:
    <textarea name="additional_info" placeholder="None"></textarea>
  </label>
  <div class="grid-x grid-margin-x">
    <fieldset class="cell large-12">
      <legend>Select the method of the detection: </legend>
      <input id="formCheckbox1" type="checkbox" name="method[]" value="Visually"><label for="formCheckbox1">Visually</label><br>
      <input id="formCheckbox2" type="checkbox" name="method[]" value="Magnetometer"><label for="formCheckbox2">Magneto</label><br>
      <input id="formCheckbox3" type="checkbox" name="method[]" value="other"><label for="formCheckbox3">Other</label><br>
    </fieldset>
    <hr>
    <fieldset class="cell large-12">
      <legend>Status</legend>
      <input type="radio" name="status" value="deactivated" id="deactivated" required><label for="deactivated">deactivated</label><br>
      <input type="radio" name="status" value="active" id="formactive"><label for="formactive">active</label><br>
      <input type="radio" name="status" value="unknown" id="formunknown"><label for="formunknown">unknown</label><br>
    </fieldset>
  </div>
  <div class="input-group">
    <div class="input-group-button">
      <input type="submit" class="button" value="Submit">
      <!--<input type="cancel" class="button" id="cancelBtn" value="Cancel">-->
    </div>
  </div>
  <button id="closeAddDataMenu" class="close-button" aria-label="Close menu" type="button" data-close>
    <span aria-hidden="true">&times;</span>
  </button>
</form>

        </fieldset>
    </div>
    
    <div class="off-canvas position-left" id="offCanvasLeft" data-off-canvas data-transition="push">
    </div>
    
    <div class="off-canvas-content" data-off-canvas-content id="map" style="width: 100%; height: 100%; position: relative;">
    </div>
    
    <!-- foundation -->
    <script src="Foundation-Sites-CSS/js/vendor/jquery.js"></script>
    <script src="Foundation-Sites-CSS/js/vendor/what-input.js"></script>
    <script src="Foundation-Sites-CSS/js/vendor/foundation.js"></script>
    <script src="Foundation-Sites-CSS/js/app.js"></script>
    
    <script>
        /*
        document.addEventListener('DOMContentLoaded', function() {
          var closeButton = document.getElementById('cancelBtn');
          var offCanvas = document.getElementById('offCanvasAddData');
      
          closeButton.addEventListener('click', function() {
            offCanvas.hide();
          });
        });*/
    </script>

    <!-- minehunter js -->
    <script src="js/maplayer.js"></script>
    <script src="js/userLocation.js"></script>
    <script src="js/goto.js"></script>
    <script src="js/layers.js"></script>
    <script src="js/addDataManuallyUI.js"></script>


    <script>
        var mineIcon = L.icon({
            iconUrl: 'docs/images/activemine.png',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });

        // Create an array of marker objects
        <?php
            // Read the JSON file
            $json = file_get_contents('DB/mine.json');

            // Parse the JSON data to an array
            $data = json_decode($json, true);

            // Generate the markers array
            $markers = array();
            foreach ($data as $item) {
                $marker = array(
                    'lat' => $item['lat'],
                    'lng' => $item['lng'],
                    'link' => $item['link'],
                    'popupContent' => $item['popupContent'],
                    'iconUrl' => 'docs/images/inactivebomb.png'
                );
                array_push($markers, $marker);
            }

            // Output the markers array in the required format
            echo 'var markers = ' . json_encode($markers) . ';';
        ?>


        // Create a marker cluster group
        var markerClusterGroup = L.markerClusterGroup();

        // Loop through the array of markers and create a new marker for each one
        for (var i = 0; i < markers.length; i++) {
            var markerOnJSON = L.marker([markers[i].lat, markers[i].lng], {icon:  L.icon({
            iconUrl: markers[i].iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        })});

            // Set the popup content for this marker
            markerOnJSON.bindPopup(markers[i].popupContent + '<br><a href="'+markers[i].link+'"> link </a>');

            // Add the marker to the cluster group
            markerClusterGroup.addLayer(markerOnJSON);
        }

        // Add the cluster group to the map
        map.addLayer(markerClusterGroup);

    </script>
    
</body>
</html>