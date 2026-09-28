// ==========================================
// CHEFFY LOGIN JAVASCRIPT
// ==========================================


// ==========================================
// PAGE LOAD
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // ==========================================
        // PASSWORD TOGGLE
        // ==========================================

        const togglePassword =
            document.getElementById("togglePassword");

        const password =
            document.getElementById("password");


        if (togglePassword && password) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (password.type === "password") {

                        password.type = "text";

                        togglePassword.innerHTML =
                            '<i class="fa-solid fa-eye-slash"></i>';

                    }

                    else {

                        password.type = "password";

                        togglePassword.innerHTML =
                            '<i class="fa-solid fa-eye"></i>';

                    }

                }
            );

        }



        // ==========================================
        // LOGIN FORM
        // ==========================================

        const loginForm =
            document.getElementById("loginForm");


        if (loginForm) {

            loginForm.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    login();

                }
            );

        }

    }
);



// ==========================================
// LOGIN FUNCTION
// ==========================================

async function login() {


    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const message =
        document.getElementById("message");



    // ==========================================
    // CHECK EMPTY FIELDS
    // ==========================================

    if (
        username === "" ||
        password === ""
    ) {

        message.textContent =
            "Please enter username and password.";

        message.style.color =
            "#d9534f";

        return;

    }



    // ==========================================
    // CONNECT TO BACKEND
    // ==========================================

    try {


        message.textContent =
            "Checking login...";

        message.style.color =
            "#0f766e";



        const response =
            await fetch(
                "/login",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        username:
                            username,

                        password:
                            password

                    })

                }
            );



        // ==========================================
        // GET SERVER RESPONSE
        // ==========================================

        const data =
            await response.json();



        // ==========================================
        // LOGIN SUCCESS
        // ==========================================

        if (
            response.ok &&
            data.success
        ) {


            message.textContent =
                "Login successful!";

            message.style.color =
                "#2f8f63";



            // ==========================================
            // SAVE USER
            // ==========================================

            localStorage.setItem(

                "cheffyUser",

                JSON.stringify(
                    data.user
                )

            );



            // ==========================================
            // SAVE LOGIN STATUS
            // ==========================================

            localStorage.setItem(

                "cheffyLoggedIn",

                "true"

            );



            // ==========================================
            // REDIRECT TO HOME
            // ==========================================

            setTimeout(
                function () {

                    window.location.href =
                        "index.html";

                },
                1000
            );

        }



        // ==========================================
        // LOGIN FAILED
        // ==========================================

        else {


            message.textContent =
                data.message ||
                "Invalid username or password.";

            message.style.color =
                "#d9534f";

        }

    }



    // ==========================================
    // CONNECTION ERROR
    // ==========================================

    catch (error) {


        console.error(
            "Login error:",
            error
        );


        message.textContent =
            "Unable to connect with server.";

        message.style.color =
            "#d9534f";

    }

}



// ==========================================
// LOGOUT FUNCTION
// ==========================================

function logout() {


    // Remove saved user

    localStorage.removeItem(
        "cheffyUser"
    );


    // Remove login status

    localStorage.removeItem(
        "cheffyLoggedIn"
    );


    // Redirect to login

    window.location.href =
        "login.html";

}