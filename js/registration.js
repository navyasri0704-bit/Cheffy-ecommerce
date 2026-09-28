document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("registrationForm");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById("togglePassword");

    const terms =
        document.getElementById("terms");

    const message =
        document.getElementById("registerMessage");


    // ==========================================
    // SHOW / HIDE PASSWORD
    // ==========================================

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            function () {

                if (password.type === "password") {

                    password.type = "text";

                    togglePassword.innerHTML =
                        '<i class="fa-solid fa-eye-slash"></i>';

                } else {

                    password.type = "password";

                    togglePassword.innerHTML =
                        '<i class="fa-solid fa-eye"></i>';

                }

            }
        );

    }


    // ==========================================
    // REGISTRATION FORM
    // ==========================================

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // ==========================================
            // GET FORM VALUES
            // ==========================================

            const firstName =
                document
                    .getElementById("firstName")
                    .value
                    .trim();

            const lastName =
                document
                    .getElementById("lastName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("email")
                    .value
                    .trim();

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();

            const passwordValue =
                password.value;

            const confirmPasswordValue =
                confirmPassword.value;


            // ==========================================
            // PASSWORD CHECK
            // ==========================================

            if (
                passwordValue !==
                confirmPasswordValue
            ) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color =
                    "#d9534f";

                return;

            }


            // ==========================================
            // TERMS CHECK
            // ==========================================

            if (!terms.checked) {

                message.textContent =
                    "Please accept the Terms & Conditions.";

                message.style.color =
                    "#d9534f";

                return;

            }


            // ==========================================
            // SHOW LOADING MESSAGE
            // ==========================================

            message.textContent =
                "Creating your account...";

            message.style.color =
                "#0f766e";


            try {

                // ==========================================
                // SEND DATA TO EXPRESS SERVER
                // ==========================================

                const response =
                    await fetch("/register", {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify({

                            firstName:
                                firstName,

                            lastName:
                                lastName,

                            email:
                                email,

                            username:
                                username,

                            password:
                                passwordValue

                        })

                    });


                // ==========================================
                // GET SERVER RESPONSE
                // ==========================================

                const data =
                    await response.json();


                // ==========================================
                // SUCCESS
                // ==========================================

                if (
                    response.ok &&
                    data.success
                ) {

                    message.textContent =
                        "Registration successful! Redirecting...";

                    message.style.color =
                        "#2f8f63";


                    form.reset();


                    // Go to login page

                    setTimeout(function () {

                        window.location.href =
                            "login.html";

                    }, 1500);

                }


                // ==========================================
                // SERVER ERROR
                // ==========================================

                else {

                    message.textContent =
                        data.message ||
                        "Registration failed.";

                    message.style.color =
                        "#d9534f";

                }

            }


            // ==========================================
            // CONNECTION ERROR
            // ==========================================

            catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                message.textContent =
                    "Unable to connect with server.";

                message.style.color =
                    "#d9534f";

            }

        }

    );

});