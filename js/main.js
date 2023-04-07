const mobileNav = document.querySelector(".mobile-nav");
const primaryNavSmall = document.querySelector(".primary-nav-small");
const shoppingCartBtn = document.querySelector(".shopping-cart-btn");
const shoppingCart = document.querySelector(".shopping-cart");
const finalToPay = document.querySelector(".final-to-pay");

mobileNav.addEventListener("click", () => {
  primaryNavSmall.toggleAttribute("data-visible");
});

shoppingCartBtn.addEventListener("click", () => {
  shoppingCart.toggleAttribute("data-visible");
});
