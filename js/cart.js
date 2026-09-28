// Add your JavaScript here
// ===============================
// CHEFFY CART
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadCart();

    document.getElementById("clearCart")
    .addEventListener("click", clearCart);

    document.getElementById("checkoutBtn")
    .addEventListener("click", checkout);

});

// ===============================
// LOAD CART
// ===============================

function loadCart(){

    const cartBody=document.getElementById("cartItems");

    const empty=document.getElementById("emptyCart");

    const container=document.querySelector(".cart-container");

    let cart=JSON.parse(localStorage.getItem("cart"))||[];

    cartBody.innerHTML="";

    if(cart.length===0){

        container.style.display="none";

        empty.style.display="block";

        return;

    }

    container.style.display="grid";

    empty.style.display="none";

    let subtotal=0;

    cart.forEach((item,index)=>{

        const price=parseFloat(item.price.replace("$",""));

        const total=price*item.quantity;

        subtotal+=total;

        cartBody.innerHTML+=`

        <tr>

        <td>

        <img src="${item.image}">

        </td>

        <td>${item.name}</td>

        <td>$${price.toFixed(2)}</td>

        <td>${item.quantity}</td>

        <td>$${total.toFixed(2)}</td>

        <td>

        <button class="remove-btn"

        onclick="removeItem(${index})">

        Remove

        </button>

        </td>

        </tr>

        `;

    });

    document.getElementById("subtotal").innerHTML="$"+subtotal.toFixed(2);

    document.getElementById("grandTotal").innerHTML="$"+(subtotal+5).toFixed(2);

}

// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){

    let cart=JSON.parse(localStorage.getItem("cart"))||[];

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}

// ===============================
// CLEAR CART
// ===============================

function clearCart(){

    if(confirm("Clear entire cart?")){

        localStorage.removeItem("cart");

        loadCart();

    }

}

// ===============================
// CHECKOUT
// ===============================

function checkout(){

    let cart=JSON.parse(localStorage.getItem("cart"))||[];

    if(cart.length===0){

        alert("Your cart is empty.");

        return;

    }

    alert("🎉 Order placed successfully!\n\nThank you for shopping with CHEFFY.");

    localStorage.removeItem("cart");

    loadCart();

}

// ===============================
// NAVBAR SHADOW
// ===============================

window.addEventListener("scroll",()=>{

    const nav=document.querySelector("nav");

    if(window.scrollY>50){

        nav.style.boxShadow="0 5px 15px rgba(0,0,0,.15)";

    }else{

        nav.style.boxShadow="none";

    }

});