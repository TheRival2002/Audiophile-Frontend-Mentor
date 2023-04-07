let counter = document.querySelector(".counter");
let productCounter = document.querySelector(".product-counter");
const lowerCount = document.querySelectorAll(".lower-count");
const upperCount = document.querySelectorAll(".upper-count");

lowerCount.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.nextElementSibling.classList.contains("counter")) {
      let count = Number(counter.textContent);
      if (count <= 1) {
        count = 1;
      } else {
        count -= 1;
      }
      counter.textContent = count;
    } else {
      let productCount = Number(productCounter.textContent);
      if (productCount <= 1) {
        productCount = 1;
      } else {
        productCount -= 1;
      }
      productCounter.textContent = productCount;
    }
  });
});

upperCount.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.previousElementSibling.classList.contains("counter")) {
      let count = Number(counter.textContent);
      count += 1;
      counter.textContent = count;
    } else {
      let productCount = Number(productCounter.textContent);
      productCount += 1;
      productCounter.textContent = productCount;
    }
  });
});

// Shopping cart

const shopCart = document.querySelector(".shopping-cart");
let cartCounter = document.querySelector(".cart-counter");
const cartItems = document.querySelector(".cart-items");
let cartItem = document.querySelector(".cart-item");
let totalPrice = document.querySelector(".total-price");
const removeAll = document.querySelector(".remove-all");

let cart = [];

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("./data.JSON");
      let data = await result.json();
      data = data.map((item) => {
        const title = item.name;
        const price = item.price;
        const id = item.id;
        const image = item.slug;
        return { title, price, id, image };
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  getCartButton() {
    const button = document.querySelector(".add-to-cart");

    button.addEventListener("click", (event) => {
      event.target.textContent = "Added";
      event.target.disabled = true;
      this.populateCart(cart);
      this.setCartValues(cart);
    });
  }
  setCartValues(cart) {
    const button = document.querySelector(".add-to-cart");
    let id = button.dataset.id;
    let tempTotal = 0;
    let itemsTotal = 0;
    tempTotal += cart[id - 1].price;
    itemsTotal += 1;
    totalPrice.textContent = parseFloat(tempTotal.toFixed(2));
    cartCounter.textContent = itemsTotal;
  }
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img class="cart-item-img" src="./assets/cart/image-${item.image}.jpg">
      <div class="cart-item-info" data-id="${item.id}">
        <h5>${item.title}</h5>
        <p>$ ${item.price}</p>
      </div>
      <div class="full-product-counter">
        <button class="lower-count">
          -
        </button>
        <p class="counter">1</p>
        <button class="upper-count">
          +
        </button>
      </div>
    `;
    cartItems.appendChild(div);
  }
  setupAPP() {
    cart = Storage.getCart();
  }
  populateCart(cart) {
    const button = document.querySelector(".add-to-cart");
    let id = button.dataset.id;
    this.addCartItem(cart[id - 1]);
  }
}

// local storage
class Storage {
  static getCart() {
    return localStorage.getItem("products")
      ? JSON.parse(localStorage.getItem("products"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  products.getProducts().then(() => ui.getCartButton());
});
