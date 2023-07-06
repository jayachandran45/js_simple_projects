// Get all the element we want from the DOM
const clickEle = document.querySelectorAll(".head-section > div");
const textChangeEle = document.querySelectorAll(".head-section > div > p");
const arrowEle = document.querySelectorAll(".head-section > div > svg");
const pEle = document.querySelectorAll(".body-section");

// This is the entry point of the project.
clickEle.forEach((e) => {
  e.addEventListener("click", (e) => {
    // make sure to use currentTarget property in the event object because the addEventListener element has nested elements . whenever you use e.target it will gives the innermost cliked element . For that you can use the e.currentTarget to get the element which is attached to the addEventListener
    const check = e.currentTarget.dataset.id;
    // change the text value for that we need the textele and check value (because I need to associate the text only where I clicked)
    changeText(textChangeEle, check);
    // change the svg arrow icon
    changeIcon(arrowEle, check);
    // expand and collapse
    accordian(pEle, check);
  });
});

function changeText(textChangeEle, check) {
  textChangeEle.forEach((e) => {
    if (e.parentElement.dataset.id === check) {
      if (e.innerHTML === "Expand") {
        e.innerHTML = "Collapse";
      } else {
        e.innerHTML = "Expand";
      }
    }
  });
}

function changeIcon(arrowEle, check) {
  arrowEle.forEach((e) => {
    if (e.parentElement.dataset.id === check) {
      e.classList.toggle("change");
    }
  });
}

// fuction  for Expand and Collapse
function accordian(ele, check) {
  ele.forEach((e) => {
    if (e.parentElement.querySelector("[data-id]").dataset.id === check) {
      e.classList.toggle("accordian");
    }
  });
}
