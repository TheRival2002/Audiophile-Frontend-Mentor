const mobileNav = document.querySelector(".mobile-nav");
const primaryNavSmall = document.querySelector(".primary-nav-small");
const shoppingCartBtn = document.querySelector(".shopping-cart-btn");
const shoppingCart = document.querySelector(".shopping-cart");

const infos = document.querySelectorAll(".product-info");
const imgs = document.querySelectorAll(".product-img");

// mobile nav menu
mobileNav.addEventListener("click", () => {
  primaryNavSmall.toggleAttribute("data-visible");
});

// shopping cart functionality
shoppingCartBtn.addEventListener("click", () => {
  shoppingCart.toggleAttribute("data-visible");
});

// the first item sliding in on load
window.addEventListener("DOMContentLoaded", () => {
  infos.forEach((info, index) => {
    if (index === 0) {
      info.classList.add("slide-in");
    }
  });
  imgs.forEach((img, index) => {
    if (index === 0) {
      img.classList.add("slide-in");
    }
  });
});

// all the items sliding in on scroll
window.addEventListener("scroll", () => {
  infos.forEach((info, index) => {
    const topOffset = window.pageYOffset;
    const infoFromTop = info.getBoundingClientRect().top;
    if (index === 0) {
      info.classList.add("slide-in");
    } else if (index === 2) {
      if (topOffset > infoFromTop + 800) {
        info.classList.add("slide-in");
      } else {
        info.classList.remove("slide-in");
      }
    } else {
      if (topOffset > infoFromTop + 200) {
        info.classList.add("slide-in");
      } else {
        info.classList.remove("slide-in");
      }
    }
  });
  imgs.forEach((img, index) => {
    const topOffset = window.pageYOffset;
    const imgFromTop = img.getBoundingClientRect().top;
    if (index === 0) {
      img.classList.add("slide-in");
    } else if (index === 2) {
      if (topOffset > imgFromTop + 800) {
        img.classList.add("slide-in");
      } else {
        img.classList.remove("slide-in");
      }
    } else {
      if (topOffset > imgFromTop + 200) {
        img.classList.add("slide-in");
      } else {
        img.classList.remove("slide-in");
      }
    }
  });
  const topOffset = window.pageYOffset;
  if (topOffset > 150) {
    shoppingCart.removeAttribute("data-visible");
    primaryNavSmall.removeAttribute("data-visible");
  }
});
