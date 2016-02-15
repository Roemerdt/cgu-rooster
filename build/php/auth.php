<?php 

$auth_token = $_POST['auth'];
$lln = $_POST['lln'];

echo $auth_token;
echo $lln;

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

$sql = "INSERT INTO users (lln, auth_token)
VALUES ('$lln', '$auth_token')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully" . '<br>';
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

 ?>