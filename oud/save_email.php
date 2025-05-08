<?php
// Databaseconfiguratie
$host = 'localhost:3306';
$dbname = 'PR-DB01';
$username = 'email_form'; 
$password = 'k#9kp72W2'; 

header('Content-Type: text/plain'); // Stel het type in als tekst voor AJAX

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $checkStmt = $pdo->prepare("SELECT COUNT(*) FROM emails WHERE email_adress = :email");
            $checkStmt->bindParam(':email', $email);
            $checkStmt->execute();
            $emailExists = $checkStmt->fetchColumn();

            if ($emailExists) {
                echo "Dit e-mailadres is al opgeslagen.";
            } else {
                $stmt = $pdo->prepare("INSERT INTO emails (email_adress) VALUES (:email)");
                $stmt->bindParam(':email', $email);

                if ($stmt->execute()) {
                    echo "E-mailadres succesvol opgeslagen!";
                } else {
                    echo "Er is een fout opgetreden bij het opslaan.";
                }
            }
        } else {
            echo "Ongeldig e-mailadres.";
        }
    }
} catch (PDOException $e) {
    echo "Databasefout: " . $e->getMessage();
}
?>
