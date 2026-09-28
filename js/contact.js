// ==========================================
// CHEFFY CONTACT PAGE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeContactForm();

    initializeChatButton();

    navbarShadow();

});


// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

function initializeContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();

        const email = document.getElementById("email").value.trim();

        const subject = document.getElementById("subject").value.trim();

        const message = document.getElementById("message").value.trim();

        // Name Validation
        if (name.length < 3) {

            alert("Please enter a valid name.");

            return;

        }

        // Email Validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        // Subject Validation
        if (subject.length < 3) {

            alert("Please enter a subject.");

            return;

        }

        // Message Validation
        if (message.length < 10) {

            alert("Message should contain at least 10 characters.");

            return;

        }

        alert(
            "🎉 Thank you, " +
            name +
            "!\n\nYour message has been sent successfully."
        );

        form.reset();

    });

}


// ==========================================
// CHAT BUTTON
// ==========================================

function initializeChatButton() {

    const chatBtn = document.querySelector(".chat-btn");

    if (!chatBtn) return;

    chatBtn.addEventListener("click", () => {

        alert("👋 Customer Support will be available soon!");

    });

}


// ==========================================
// NAVBAR SHADOW
// ==========================================

function navbarShadow() {

    window.addEventListener("scroll", () => {

        const nav = document.querySelector("nav");

        if (!nav) return;

        if (window.scrollY > 50) {

            nav.style.boxShadow =
                "0 6px 18px rgba(0,0,0,.15)";

        }

        else {

            nav.style.boxShadow = "none";

        }

    });

}


// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});