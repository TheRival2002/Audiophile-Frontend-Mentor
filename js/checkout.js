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
