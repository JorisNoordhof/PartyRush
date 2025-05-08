document.getElementById("subscribeBtn").addEventListener("click", function () {
    const form = document.getElementById("newsletterForm");
    const formData = new FormData(form);
    const messageDiv = document.getElementById("newsletterMessage");

    fetch("save_email.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Toon de melding
        messageDiv.innerHTML = `<div class="alert alert-success">${data}</div>`;
        form.reset(); // Reset het formulier na succesvolle invoer
    })
    .catch(error => {
        console.error("Fout:", error);
        messageDiv.innerHTML = `<div class="alert bg-danger">Er is een fout opgetreden. Probeer het opnieuw.</div>`;
    });
});
