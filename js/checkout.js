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

const cashOn = document.querySelector(".cashOn");
const cashOff = document.querySelector(".cashOff");
const real = document.querySelector(".real");

cashOn.addEventListener("click", () => {
  real.lastElementChild.style.display = "flex";
  real.firstElementChild.style.display = "none";
  real.firstElementChild.nextElementSibling.style.display = "none";
});

cashOff.addEventListener("click", () => {
  real.lastElementChild.style.display = "none";
  real.firstElementChild.style.display = "block";
  real.firstElementChild.nextElementSibling.style.display = "block";
});
