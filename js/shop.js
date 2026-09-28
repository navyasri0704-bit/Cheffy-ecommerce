// Add your JavaScript here
// ==========================================
// CHEFFY SHOP PAGE JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    quantityButtons();

    searchProducts();

    categoryFilter();

    addToCart();

    pagination();

});


// ==========================================
// QUANTITY BUTTONS
// ==========================================

function quantityButtons() {

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const minus = product.querySelector(".minus");
        const plus = product.querySelector(".plus");
        const input = product.querySelector("input");

        plus.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        });

        minus.addEventListener("click", () => {

            if (parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }

        });

    });

}


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function searchProducts() {

    const search = document.getElementById("search");

    if (!search) return;

    search.addEventListener("keyup", () => {

        const value = search.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            const name = card.querySelector("h3").innerText.toLowerCase();

            if (name.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}


// ==========================================
// CATEGORY FILTER
// ==========================================

function categoryFilter() {

    const category = document.getElementById("category");

    if (!category) return;

    category.addEventListener("change", () => {

        const value = category.value.toLowerCase();

        document.querySelectorAll(".product-card").forEach(card => {

            if (value === "all") {

                card.style.display = "block";

            }

            else if (card.classList.contains(value)) {

                card.style.display = "block";

            }

            else {

                card.style.display = "none";

            }

        });

    });

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart() {

    const buttons = document.querySelectorAll(".cart-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.parentElement;

            const name = card.querySelector("h3").innerText;

            const price = card.querySelector("h4").innerText;

            const image = card.querySelector("img").getAttribute("src");

            const qty = parseInt(card.querySelector("input").value);

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existing = cart.find(item => item.name === name);

            if (existing) {

                existing.quantity += qty;

            }

            else {

                cart.push({

                    name: name,
                    price: price,
                    image: image,
                    quantity: qty

                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            button.innerHTML = "✔ Added";

            button.style.background = "#28a745";

            setTimeout(() => {

                button.innerHTML = "Add To Cart";

                button.style.background = "#4f8785";

            }, 1200);

            updateCartCount();

        });

    });

}


// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    const icons = document.querySelectorAll(".fa-cart-shopping");

    icons.forEach(icon => {

        icon.setAttribute("data-count", total);

    });

}


// ==========================================
// PAGINATION (DEMO)
// ==========================================

function pagination() {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.addEventListener("click", () => {

            pages.forEach(btn => {

                btn.classList.remove("active");

            });

            page.classList.add("active");

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });

}


// ==========================================
// IMAGE HOVER EFFECT
// ==========================================

document.querySelectorAll(".product-card img").forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.1)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});


// ==========================================
// SCROLL SHADOW
// ==========================================

window.addEventListener("scroll", () => {

    const nav = document.querySelector("nav");

    if (window.scrollY > 60) {

        nav.style.boxShadow = "0 6px 18px rgba(0,0,0,.18)";

    }

    else {

        nav.style.boxShadow = "none";

    }

});