var products = [{
    index: 1,
    id: 'p1',
    name: 'Samsung TV',
    price: 500000,
    Image: "Images/product1.png"
},
{
    index: 2,
    id: 'p2',
    name: 'Pixel 4a',
    price: 250000,
    Image: "Images/product2.png"
},
{
    index: 3,
    id: 'p3',
    name: 'PS 5',
    price: 300000,
    Image: "Images/product3.png"
},
{
    index: 4,
    id: 'p4',
    name: 'MacBook Air',
    price: 800000,
    Image: "Images/product4.png"
},
{
    index: 5,
    id: 'p5',
    name: 'Apple Watch',
    price: 95000,
    Image: "Images/product5.png"
},
{
    index: 6,
    id: 'p6',
    name: 'Air Pods',
    price: 75000,
    Image: "Images/product6.png"
},

]

/*Calling the Products Container*/
var productsContainer = document.getElementById("products-container")
//HERE
function isInCart(id){
    return cart.some(item => item.id === id);
}
let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

/*To display products*/
function displayProducts() {
            productsContainer.innerHTML += "";


    products.forEach(product => {
let inCart = isInCart(product.id);
        productsContainer.innerHTML += `

       <div class="product-card">

    <div class="product-image">
        <img src="${product.Image}" alt="${product.name}">
        <span class="price-tag">GHS ${product.price}</span>
    </div>

    <h3>${product.name}</h3>

   <button
    class="${inCart ? 'remove-cart-btn' : 'add-cart-btn'}"
    onclick="toggleCart('${product.id}')"
>
    ${inCart ? 'REMOVE FROM CART' : 'ADD TO CART'}
</button>
</div>

        `;
    });

}

displayProducts();
/*cart count/total*/




function addToCart(id) {
    var product = products.find(
        product => product.id === id
    );
    let existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);

    }
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

    updateCartCount();
    productsContainer.innerHTML = "";
    displayProducts();
}


/*Declaration of variables*/
let customerName = "";

var cartTotal =
    document.getElementById("cartcount");
var cartBtn = document.getElementById("cartbtn");
var cartModal = document.getElementById("cart-modal");
var closeCart = document.getElementById("close-cart");
//close Cart and turn to shopping
const continueBtn = document.getElementById("continueshp");

continueBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
});
var totalElement = document.getElementById("cart-total");
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});
cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
});

closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});

/*showing the cart items inside the cart model*/

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    cartItems.innerHTML = "";
    let total = 0

    cart.forEach(product => {
        total += product.price * product.quantity;

        cartItems.innerHTML += `
<div class="cart-item">
<div class="item-name">
    <h4>${product.name}</h4>
</div>

<div class="item-price">
    <p>GHS ${product.price}</p>
</div>
    <div class="quantity-controls">

        <button class="qty-btn" onclick="decreaseQuantity('${product.id}')">-</button>

        <span>${product.quantity}</span>

        <button class="qty-btn" onclick="increaseQuantity('${product.id}')">+</button>

    </div>
<div class="remove-btn">

    <button class="remove-btn-style" onclick="removeFromCart('${product.id}')">
        Remove
    </button>
    </div>

</div>
`;
    });
    totalElement.textContent = total;

}

var cartBtn = document.getElementById("cartbtn");



/*Remove cart */

function removeFromCart(id) {
    cart = cart.filter(
        product => product.id !== id
    );
    updateCartCount();
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    productsContainer.innerHTML ="";
    displayProducts();
}

function toggleCart(id) {

    let existingProduct = cart.find(
        item => item.id === id
    );

    if (existingProduct) {
        removeFromCart(id);
    } else {
        addToCart(id);
    }
}
/*increasing and decreasing */

function increaseQuantity(id) {
    let product = cart.find(
        item => item.id === id
    );
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}


function decreaseQuantity(id) {
    let product = cart.find(
        item => item.id === id
    );
    if (product.quantity > 1) {
        product.quantity--;
    } else {
        removeFromCart(id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

updateCartCount();
displayCart();


const checkoutBtn =
    document.getElementById("Checkout-btn");
checkoutBtn.addEventListener("click", () => {

    const name =
        document.getElementById("name").value.trim();
    customerName = name;

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("phone-error").textContent = "";

    document.getElementById("name").classList.remove("input-error");
    document.getElementById("email").classList.remove("input-error");
    document.getElementById("phone").classList.remove("input-error");

    let isValid = true;
    if (name === "") {
        document.getElementById("name-error").textContent =
            "Please enter your name";

        document.getElementById("name").classList.add("input-error");
        isValid = false;

    } else {
        document.getElementById("name").classList.add("input-success");
    }

    if (email === "") {
        document.getElementById("email-error").textContent =
            "Please enter your email";

        document.getElementById("email").classList.add("input-error");
        isValid = false;

    } else {
        document.getElementById("email").classList.add("input-success");
    }

    if (phone === "") {
        document.getElementById("phone-error").textContent =
            "Please enter your phone number";

        document.getElementById("phone").classList.add("input-error");

    }

    else {
        document.getElementById("phone").classList.add("input-success");
    }

    if (!email.includes("@")) {

        document.getElementById("email-error").textContent =
            "Please enter a valid email address";

        document.getElementById("email").classList.add("input-error");
        isValid = false;
    }

    if (phone.length < 10) {

        document.getElementById("phone-error").textContent =
            "Phone number must be at least 10 digits";

        document.getElementById("phone").classList.add("input-error");
        isValid = false

    }
    if (!/^\d+$/.test(phone)) {
        document.getElementById("phone-error").textContent =
            "Please number must contain only numbers";

        document.getElementById("phone").classList.add("input-error");
        isValid = false;
    }
    if (!isValid) {
        return;

    }
    if (cart.length === 0) {

        alert("Your cart is empty");

        return;
    }

    startPayment(email, totalElement.textContent);
});




/*Paystack Integretion*/
function startPayment(email, amount) {

    let handler = PaystackPop.setup({

        key: 'pk_test_4ea58c676d8ddaa4e36d5d8226d77355a6c24a35',

        email: email,

        amount: amount * 100,

        currency: 'GHS',

        callback: function (response) {

            document.getElementById("summary-modal").style.display = "flex";

            document.getElementById("success-message").textContent =
                `Thank you, ${customerName}! Your payment was successful🎉!`;
            let summaryHTML = "";

            cart.forEach(item => {
                summaryHTML += `
        <p>
            ${item.name} -
            Qty: ${item.quantity} -
            GHS ${item.price * item.quantity}
        </p>
    `;
            });

            document.getElementById("summmary-items").innerHTML =
                summaryHTML;
            /*clear form*/
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";


            /*Remove green borders*/
            document.getElementById("name").classList.remove("input-success");
            document.getElementById("email").classList.remove("input-success");
            document.getElementById("phone").classList.remove("input-success");
            cart = [];
            productsContainer.innerHTML = "";
            displayProducts();
            const summaryModal =
                document.getElementById("summary-modal");

            const closeSummary =
                document.getElementById("close-summary");

            closeSummary.addEventListener("click", () => {
                summaryModal.style.display = "none";
            });


            localStorage.removeItem("cart");

            cartTotal.textContent = 0;

            displayCart();

            cartModal.style.display = "none";

        },

        onClose: function () {

            alert('Payment cancelled');

        }

    });

    handler.openIframe();
}


/*quantity upadate*/

function updateCartCount() {
   
    cartTotal.textContent = cart.length;
}