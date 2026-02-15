let cart = {};
let total = 0;

function addToCart(item, price) {
  if (cart[item]) {
    cart[item].qty += 1;
  } else {
    cart[item] = { price: price, qty: 1 };
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  total = 0;

  for (let item in cart) {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item} - ₹${cart[item].price}
      <button onclick="changeQty('${item}', -1)">➖</button>
      ${cart[item].qty}
      <button onclick="changeQty('${item}', 1)">➕</button>
    `;
    cartItems.appendChild(li);
    total += cart[item].price * cart[item].qty;
  }

  document.getElementById("total").innerText = total;
}

function changeQty(item, change) {
  cart[item].qty += change;
  if (cart[item].qty <= 0) delete cart[item];
  updateCart();
}

function filterByBudget(maxPrice) {
  document.querySelectorAll(".card").forEach(food => {
    food.style.display =
      food.getAttribute("data-price") <= maxPrice ? "block" : "none";
  });
}

function filterByMood(mood) {
  document.querySelectorAll(".card").forEach(food => {
    food.style.display =
      food.getAttribute("data-mood").includes(mood) ? "block" : "none";
  });
}
function filterByType(type) {
  const foods = document.querySelectorAll(".card");

  foods.forEach(food => {
    const foodType = food.getAttribute("data-type");

    if (type === "all" || foodType.includes(type)) {
      food.style.display = "block";
    } else {
      food.style.display = "none";
    }
  });
}
function sortByPrice(order) {
  const container = document.querySelector(".food-container");
  const foods = Array.from(document.querySelectorAll(".card"));

  foods.sort((a, b) => {
    const priceA = parseInt(a.getAttribute("data-price"));
    const priceB = parseInt(b.getAttribute("data-price"));

    return order === "low" ? priceA - priceB : priceB - priceA;
  });

  foods.forEach(food => container.appendChild(food));
}