// all shoping carts
let cartCounter = document.querySelector(".cart-counter");
const cartItems = document.querySelector(".cart-items");
const itemsQuantity = document.querySelector(".cart-items-quantity");
const totalPrice = document.querySelector(".total-price");
const btns = document.querySelectorAll(".add-to-cart");
const removeAll = document.querySelector(".remove-all");
const productsCounter = document.querySelector(".product-counter");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// getting products
class Products {
  async getProducts() {
    try {
      let result = await fetch("./data.json");
      let data = await result.json();
      let products = data.map((item) => {
        const title = item.name;
        const price = item.price;
        const id = item.id;
        const image = item.slug;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  getBagButtons() {
    btns.forEach((btn) => {
      let id = btn.dataset.id;
      let inCart = cart.find((item) => item.id === Number(id));
      if (inCart) {
        btn.textContent = "Added";
        btn.disabled = true;
      }
      btn.addEventListener("click", (e) => {
        e.target.textContent = "Added";
        e.target.disabled = true;
        // getting a product from products
        let cartItem = {
          ...Storage.getProduct(id),
          amount: Number(productsCounter.textContent),
        };
        // adding it to the cart
        cart.push(cartItem);
        // saving cart to local storage
        Storage.saveCart(cart);
        // set cart values
        this.setCartValues(cart);
        // display cart item
        this.addCartItem(cartItem);
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    totalPrice.textContent = tempTotal;
    itemsQuantity.textContent = itemsTotal;
    if (itemsQuantity.textContent === "0") {
      itemsQuantity.style.display = "none";
    } else {
      itemsQuantity.style.display = "block";
    }
    cartCounter.textContent = itemsTotal;
    if (Number(totalPrice.textContent) > 9999) {
      if (Number(totalPrice.textContent) > 99999) {
        totalPrice.textContent =
          totalPrice.textContent.slice(0, 3) +
          "," +
          totalPrice.textContent.slice(3);
      } else {
        totalPrice.textContent =
          totalPrice.textContent.slice(0, 2) +
          "," +
          totalPrice.textContent.slice(2);
      }
    }
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img class="cart-item-img" src="./assets/cart/image-${item.image}.jpg">
      <div class="cart-item-info">
        <h5>${item.title}</h5>
        <p>$ ${item.price}</p>
      </div>
      <div class="full-product-counter">
        <button class="cart-lower-count" data-id="${item.id}">
          -
        </button>
        <p class="counter">${item.amount}</p>
        <button class="cart-upper-count" data-id="${item.id}">
          +
        </button>
      </div>
    `;
    cartItems.appendChild(div);
  }
  setupAPP() {
    this.setCartValues(cart);
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic() {
    // clearing the whole cart
    removeAll.addEventListener("click", () => {
      this.clearCart();
    });
    // setting the logic
    cartItems.addEventListener("click", (e) => {
      if (e.target.classList.contains("cart-lower-count")) {
        let cartLowerCount = e.target;
        let id = cartLowerCount.dataset.id;
        if (cartLowerCount.nextElementSibling.textContent === "1") {
          cartItems.removeChild(cartLowerCount.parentElement.parentElement);
          this.removeItem(Number(id));
          btns.forEach((btn) => {
            if (btn.dataset.id === id) {
              btn.disabled = false;
              btn.textContent = "Add to Cart";
            }
          });
        } else {
          let tempItem = cart.find((item) => item.id === Number(id));
          tempItem.amount -= 1;
          cartLowerCount.nextElementSibling.textContent = tempItem.amount;
          Storage.saveCart(cart);
          this.setCartValues(cart);
        }
      } else if (e.target.classList.contains("cart-upper-count")) {
        let cartUpperCount = e.target;
        let id = cartUpperCount.dataset.id;
        let tempItem = cart.find((item) => item.id === Number(id));
        tempItem.amount += 1;
        cartUpperCount.previousElementSibling.textContent = tempItem.amount;
        Storage.saveCart(cart);
        this.setCartValues(cart);
      }
    });
  }
  clearCart() {
    let allCartItems = cart.map((item) => item.id);
    allCartItems.forEach((id) => this.removeItem(id));
    while (cartItems.children.length > 0) {
      cartItems.removeChild(cartItems.children[0]);
    }
    btns.forEach((btn) => {
      btn.disabled = false;
      btn.textContent = "Add to Cart";
    });
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === Number(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  // getting all products
  products
    .getProducts()
    .then((products) => Storage.saveProducts(products))
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});

// getting the checkout page in order

// checkout summary details
const summaryCartItems = document.querySelector(".summary-cart-items");
const summaryTotalPrice = document.querySelectorAll(".summary-total-price");
const grandTotalPrice = document.querySelector(".grand-total-price");

getFromStorage(cart);

function getFromStorage(cart) {
  const summaryCartItemsLS = cart;
  summaryCartItemsLS.forEach((item) => {
    addSummaryCartItem(item);
  });
  summarySetCartValues(cart);
}

function addSummaryCartItem(item) {
  const div = document.createElement("div");
  div.classList.add("summary-cart-item");
  div.innerHTML = `
    <img class="summary-cart-item-img" src="./assets/cart/image-${item.image}.jpg"
    alt="${item.image}">
    <div class="summary-cart-item-info">
      <h5>${item.title}</h5>
      <p>$ ${item.price}</p>
    </div>
    <div class="cart-item-product-amount">
      <p>x<span class="cart-item-amount">${item.amount}</span></p>
    </div>
  `;
  summaryCartItems.appendChild(div);
}

function summarySetCartValues(cart) {
  summaryTotalPrice.forEach((price, index) => {
    let tempTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
    });
    if (index === 1) {
      price.textContent = "100";
    }
    if (index === 2) {
      price.textContent = "500";
    }
    if (index === 0) {
      price.textContent = tempTotal;
      grandTotalPrice.textContent = tempTotal + 600;
      if (Number(price.textContent) > 9999) {
        if (Number(price.textContent) > 99999) {
          price.textContent =
            price.textContent.slice(0, 3) + "," + price.textContent.slice(3);
          grandTotalPrice.textContent =
            grandTotalPrice.textContent.slice(0, 3) +
            "," +
            grandTotalPrice.textContent.slice(3);
        } else {
          price.textContent =
            price.textContent.slice(0, 2) + "," + price.textContent.slice(2);
          grandTotalPrice.textContent =
            grandTotalPrice.textContent.slice(0, 2) +
            "," +
            grandTotalPrice.textContent.slice(2);
        }
      } else if (
        Number(price.textContent) <= 9999 &&
        Number(price.textContent) > 0
      ) {
        price.textContent =
          price.textContent.slice(0, 1) + "," + price.textContent.slice(1);
        grandTotalPrice.textContent =
          grandTotalPrice.textContent.slice(0, 1) +
          "," +
          grandTotalPrice.textContent.slice(1);
      }
    }
  });
}
