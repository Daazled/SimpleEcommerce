let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in nav
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Add to cart (products.html)
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const product = { name, price };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert(`${name} has been added to your cart!`);
  });
});

// Render cart (cart.html)
function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return; // Only run on cart.html

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item, index) => {
      total += item.price;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });
  }

  const cartTotal = document.getElementById("cart-total");
  if (cartTotal) cartTotal.textContent = total.toFixed(2);
}

// Remove single item
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Clear cart
const clearCartBtn = document.getElementById("clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
  });
}

// Checkout button
const checkoutBtn = document.getElementById("checkout");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Clear the cart and go to thank you page
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    window.location.href = "thankyou.html";
  });
}

updateCartCount();
renderCart();

// Load More functionality
const productList = document.getElementById("product-list");
const loadMoreBtn = document.getElementById("load-more");

if (productList && loadMoreBtn) {
  let visibleProducts = 6; // show first 6
  const allProducts = [...productList.querySelectorAll(".product-card")];

  // Hide extra products initially
  allProducts.forEach((product, index) => {
    if (index >= visibleProducts) product.style.display = "none";
  });

  loadMoreBtn.addEventListener("click", () => {
    visibleProducts += 3; // show 3 more each click
    allProducts.forEach((product, index) => {
      if (index < visibleProducts) product.style.display = "block";
    });

    // Hide button if all products are shown
    if (visibleProducts >= allProducts.length) {
      loadMoreBtn.style.display = "none";
    }
  });
}
