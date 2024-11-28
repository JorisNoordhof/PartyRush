<?php
$servername = "ec2-13-60-211-17.eu-north-1.compute.amazonaws.com"; // of het IP-adres van je database
$username = "JorisN";
$password = "123456";
$dbname = "";

// Maak verbinding
$conn = new mysqli($servername, $username, $password, $dbname);

// Controleer verbinding
if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
}

echo "test";

$sql = "SELECT * FROM jouw_tabel";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output gegevens van elke rij
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Naam: " . $row["naam"]. "<br>";
    }
} else {
    echo "0 resultaten";
}
$conn->close();
?>
