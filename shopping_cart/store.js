// importing modules to get uuid for every product that we created

import { v4 } from "./node_modules/uuid/dist/esm-browser/index.js";

const gridEle = document.querySelector(".gird-container");
const appendEle = document.querySelector(".append");
const cloneEle = document.querySelector(".card");
const cloneCartEle = document.querySelector(".cart-card");
const iEle = document.querySelector("i");

let cardItem = [];
let cartCardItem = [];
//  render it inside append element
localStorage.setItem("cartItem", JSON.stringify({}));
cartCardItem = JSON.parse(localStorage.getItem("cartItem"));
if (cartCardItem.length) {
  cartCardItem.forEach((e) => {
    let color = e.color;
    let description = e.description;
    let amount = e.amount;
    let count = e.count;

    // code if the same element is there then i need to increse the count
    const appendChildEle = document.querySelectorAll(".append > div");
    const arrColor = [];
    appendChildEle.forEach((e) => {
      const color = e.querySelector(".cart-main").style.backgroundColor;
      arrColor.push(color);
    });
    if (appendChildEle.length === 0) {
      addCartCard(color, description, amount);
    } else {
      // appendChildEle.forEach((e) => {
      //   if (color === e.querySelector(".cart-main").style.backgroundColor) {
      //     e.querySelector(".no-order").innerHTML += 1;
      //   } else if (
      //     color !== e.querySelector(".cart-main").style.backgroundColor
      //   ) {
      //     addCartCard(color, description, amount);
      //   }
      // });
      for (let i = 0; i < appendChildEle.length; i++) {
        if (arrColor.includes(color)) {
          count = Number(
            appendChildEle[arrColor.indexOf(color)].querySelector(".no-order")
              .innerHTML
          );
          count += 1;
          appendChildEle[arrColor.indexOf(color)].querySelector(
            ".no-order"
          ).innerHTML = count;

          break;
        } else {
          addCartCard(color, description, amount);
          break;
        }
      }
    }
  });
}

// const value = JSON.stringify(cardItem);
// console.log(value);
// const orgvalue = JSON.parse(value);
// console.log(orgvalue);

function addCard(color, description, money) {
  const cardClone = cloneEle.content.cloneNode(true);
  // Getting all dynamically added elements which are going to change every time when we add an product
  const mainEle = cardClone.querySelector(".main");
  const colorTextEle = cardClone.querySelector(".color");
  const descriptionEle = cardClone.querySelector(".description");
  const amountEle = cardClone.querySelector(".amount");

  // adding dynamic element content
  mainEle.style.backgroundColor = color;
  colorTextEle.innerHTML = color;
  descriptionEle.innerHTML = description;
  amountEle.innerHTML = money;
  colorTextEle.innerHTML = color;
  mainEle.style.backgroundColor = color;

  // append the template clone where we needed
  gridEle.appendChild(cardClone);

  // storing value as array of object to utilize where ever we want
  const value = {
    product_id: v4(),
    description: description,
    color: color,
    money: money,
  };
  cardItem.push(value);
}

// calling addCartCard when only clicking the button
document.addEventListener("click", (e) => {
  if (e.target.matches("#addtocart")) {
    let count = 1;
    const cardParent = e.target.closest(".body").parentElement;
    const color = cardParent.querySelector(".main").style.backgroundColor;
    const description = cardParent.querySelector(".description").innerHTML;
    const amount = cardParent.querySelector(".amount").innerHTML;

    // code if the same element is there then i need to increse the count
    const appendChildEle = document.querySelectorAll(".append > div");
    const arrColor = [];
    appendChildEle.forEach((e) => {
      const color = e.querySelector(".cart-main").style.backgroundColor;
      arrColor.push(color);
    });
    if (appendChildEle.length === 0) {
      addCartCard(color, description, amount);
    } else {
      for (let i = 0; i < appendChildEle.length; i++) {
        if (arrColor.includes(color)) {
          count = Number(
            appendChildEle[arrColor.indexOf(color)].querySelector(".no-order")
              .innerHTML
          );
          count += 1;
          appendChildEle[arrColor.indexOf(color)].querySelector(
            ".no-order"
          ).innerHTML = count;

          break;
        } else {
          addCartCard(color, description, amount);
          break;
        }
      }
    }
    // random value generator using
    const uid = v4();
    // store it in obj to persists it via LocalStorage
    const value = {
      color: color,
      description: description,
      amount: amount,
      count: count,
      uuid: uid,
    };
    cartCardItem.push(value);

    // setting values in local storage
    localStorage.setItem("cartItem", JSON.stringify(cartCardItem));
  }
});

// 1st method

// when clicking button getting the elements value
function getValue(traversEle) {}

function addCartCard(cartColor, cartDescription, cartAmout) {
  const CartCard = cloneCartEle.content.cloneNode(true);
  const colorDiv = CartCard.querySelector(".cart-main");
  CartCard.querySelector(".description").innerHTML = cartDescription;
  CartCard.querySelector(".color").innerHTML = cartColor;
  CartCard.querySelector(".amount").innerHTML = cartAmout;
  colorDiv.style.backgroundColor = cartColor;
  appendEle.appendChild(CartCard);
}

addCard("Green", "primary color", "$8");
addCard("Red", "secondary color", "$17");
addCard("pink", "secondary color", "$9");
addCard("Green", "primary color", "$8");
addCard("Green", "primary color", "$8");
addCard("Red", "secondary color", "$17");
addCard("Red", "secondary color", "$17");
addCard("pink", "secondary color", "$9");

document.addEventListener("click", (e) => {
  if (e.target.matches(".remove")) {
    let count = parseInt(
      e.target.parentElement.querySelector(".no-order").innerHTML
    );
    console.log(count, typeof count);

    // remove the entire element when count is 0
    e.target.parentElement.querySelector(".no-order").innerHTML = count - 1;

    if (count === 1) {
      const removeEle = e.target.parentElement.parentElement;
      removeEle.remove();
    }
    // to remove element from cart card item array
    const color =
      e.target.parentElement.querySelector(".cart-main").style.backgroundColor;
    const index = cartCardItem.findIndex((e) => e.color === color);
    console.log(cartCardItem.splice(index, 1));

    localStorage.setItem("cartItem", JSON.stringify(cartCardItem));
  }
});

// code for show hide when icon click
iEle.addEventListener("click", () => {
  if (appendEle) {
    appendEle.classList.toggle("show");
  }
});
