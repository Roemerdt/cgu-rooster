<?php

// echo $_GET['l_id'];
$lln = $_POST['l_id'];
$output = array();

echo $_POST['lln'];

$servername = "localhost";
$username = "root";
$password = "root";
$dbname = "rooster";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}


$sql = "SELECT * FROM users WHERE lln = $lln";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
	array_push($output, true);
    while($row = $result->fetch_assoc()) {
        array_push($output, $row["auth_token"]);
    }
    echo json_encode($output);
} else {
    array_push($output, false);
    echo json_encode($output);
}
$conn->close();

?>