<?php
// Define the path to the JSON file
$json_file = 'DB/mine.json';

// Get the existing JSON data
$json_data = file_get_contents($json_file);

// Decode the JSON data to an associative array
$mines = json_decode($json_data, true);

// Create a new mine array with the form data
$new_mine = array(
    'lat' => $_POST['selectedlat'],
    'lng' => $_POST['selectedlng'],
    'type' => $_POST['type'],
    'radius' => $_POST['radius'],
    'link' => $_POST['link'],
    'info' => $_POST['info'],
    'method' => implode(', ', $_POST['method']),
    'status' => $_POST['status'],
    'popupContent' => $_POST['additional_info'],
    'imagelink' => $_POST['imagelink']
);

// Add the new mine to the mines array
$mines[] = $new_mine;

// Encode the updated mines array to JSON
$json_data = json_encode($mines, JSON_PRETTY_PRINT);

// Save the updated JSON data to the file
file_put_contents($json_file, $json_data);

// Redirect the user back to the form page
header('Location: index.php');
exit;
?>
