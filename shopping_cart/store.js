const gridEle = document.querySelector(".gird-container");
const cloneEle = document.querySelector(".card");
console.log(gridEle);

function addCard(color) {
  const cardClone = cloneEle.content.cloneNode(true);
  const mainEle = cardClone.querySelector(".main");
  const colorTextEle = cardClone.querySelector(".body > div > h3");
  colorTextEle.innerHTML = color;
  mainEle.style.backgroundColor = color;
  gridEle.appendChild(cardClone);
}

addCard("Green");
addCard("Red");
addCard("pink");
addCard("Green");
addCard("Green");
addCard("Red");
addCard("Red");
addCard("pink");
