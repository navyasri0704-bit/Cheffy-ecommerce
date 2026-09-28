// Add your JavaScript here
// ===============================
// CHEFFY MAIN JAVASCRIPT
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    initializeButtons();

    newsletterValidation();

    chatButton();

    smoothScrolling();

    highlightCurrentPage();

});


// ===============================
// ADD TO CART
// ===============================

function initializeButtons() {

    const buttons = document.querySelectorAll(".product-card button");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.parentElement;

            const name = card.querySelector("h3").innerText;

            const price = card.querySelector("h4").innerText;

            const image = card.querySelector("img").src;

            const product = {
                name,
                price,
                image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === product.name);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push(product);

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            button.innerHTML = "✔ Added";

            button.style.background = "#28a745";

            setTimeout(() => {

                button.innerHTML = "Add To Cart";

                button.style.background = "#5c9c9a";

            }, 1000);

        });

    });

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    const cartIcons = document.querySelectorAll(".fa-cart-shopping");

    cartIcons.forEach(icon => {

        icon.setAttribute("data-count", total);

    });

}


// ===============================
// NEWSLETTER
// ===============================

function newsletterValidation() {

    const form = document.querySelector(".newsletter form");

    if (!form) return;

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        const email = form.querySelector("input").value.trim();

        const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

        if (!pattern.test(email)) {

            alert("Please enter a valid email.");

            return;

        }

        alert("Thank you for subscribing!");

        form.reset();

    });

}


// ===============================
// CHAT BUTTON
// ===============================

function chatButton() {

    const chat = document.querySelector(".chat-btn");

    if (!chat) return;

    chat.addEventListener("click", () => {

        alert("Customer Support will be available soon.");

    });

}


// ===============================
// SMOOTH SCROLL
// ===============================

function smoothScrolling() {

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", function(e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

}


// ===============================
// ACTIVE NAVBAR
// ===============================

function highlightCurrentPage() {

    const page = window.location.pathname.split("/").pop();

    const links = document.querySelectorAll("nav a");

    links.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === page) {

            link.classList.add("active");

        }

    });

}


// ===============================
// SCROLL EFFECT
// ===============================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 50) {

        nav.style.boxShadow = "0 4px 15px rgba(0,0,0,.15)";

    } else {

        nav.style.boxShadow = "none";

    }

});