// Add your JavaScript here
// ==========================================
// CHEFFY FAQ PAGE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    initializeFAQ();

    initializeChatButton();

});


// ==========================================
// FAQ ACCORDION
// ==========================================

function initializeFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".question");

        // Make keyboard accessible
        question.setAttribute("tabindex", "0");

        // Mouse click
        question.addEventListener("click", () => {

            toggleFAQ(item);

        });

        // Keyboard support
        question.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();

                toggleFAQ(item);

            }

        });

    });

}


// ==========================================
// TOGGLE FAQ
// ==========================================

function toggleFAQ(selectedItem) {

    const allItems = document.querySelectorAll(".faq-item");

    allItems.forEach(item => {

        if (item !== selectedItem) {

            item.classList.remove("active");

        }

    });

    selectedItem.classList.toggle("active");

}


// ==========================================
// CHAT BUTTON
// ==========================================

function initializeChatButton() {

    const chatBtn = document.querySelector(".chat-btn");

    if (!chatBtn) return;

    chatBtn.addEventListener("click", () => {

        alert("👋 Hello!\n\nOur customer support team will be available soon.");

    });

}


// ==========================================
// SMOOTH SCROLL TO TOP
// ==========================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 50) {

        nav.style.boxShadow = "0 6px 18px rgba(0,0,0,.15)";

    } else {

        nav.style.boxShadow = "none";

    }

});


// ==========================================
// PAGE LOAD ANIMATION
// ==========================================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});