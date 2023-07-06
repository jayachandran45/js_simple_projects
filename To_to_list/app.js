const inputEle = document.getElementById("list");
const addBtnEle = document.getElementById("add-btn");
const addListSessionEle = document.getElementById("add-list-session");
const appendEle = document.querySelector(".append");
const key = "localStorage-list";
let listarr = getLocalStorage() || [];

listarr.forEach((e) => {
  renderEle(e);
});

// This function is to make a stickout to the list associative with the delete btn
function hover() {
  const deleteEle = document.querySelectorAll("#delete-btn");
  deleteEle.forEach((e) => {
    e.addEventListener("mouseenter", (e) => {
      const textEle = e.currentTarget.parentElement.querySelector("h3");
      textEle.classList.add("strike");
    });
  });
  deleteEle.forEach((e) => {
    e.addEventListener("mouseleave", (e) => {
      const textEle = e.currentTarget.parentElement.querySelector("h3");
      textEle.classList.remove("strike");
    });
  });
}
// calling the hover fun to make all the applying the style for all the initialy rendered elements
hover();

// add an event listener in document because I dynamically added html element
document.addEventListener("click", (e) => {
  if (e.target.matches("#delete-btn")) {
    deleteList(e.target.parentNode);
    const parentEle = e.target.parentNode.querySelector("input[type=checkbox]");
    const idValue = parentEle.dataset.checkid;
    // I want to delete the object completly from the local storage which can be achieved by deleting the object from the array based on its nearest elements data attribute value
    const index = listarr.findIndex((item) => item["id"] === idValue);
    console.log(listarr.splice(index, 1));
    localStorage.setItem(`${key}`, JSON.stringify(listarr));
  }
});

// function which will return input field value which will be added as a list
function getValue() {
  if (inputEle.value === "") {
    return null;
  } else {
    return inputEle.value;
  }
}

// This function will clone a html template element which contains nested elements and then we append the cloned element where we want to render in the document
function renderEle(value) {
  const cloneTemplate = addListSessionEle.content.cloneNode(true);
  const h3Ele = cloneTemplate.querySelector(".list");
  const inputEle = cloneTemplate.querySelector("input[type=checkbox]");
  inputEle.dataset.checkid = value.id;
  // This condition will persists the value of checkbox
  if (value.state) {
    inputEle.checked = true;
  } else {
    inputEle.checked = false;
  }
  h3Ele.innerHTML = value.val;
  appendEle.appendChild(cloneTemplate);
}

addBtnEle.addEventListener("click", () => {
  const value = getValue();
  const newValue = {
    val: value,
    state: false,
    id: new Date().valueOf().toString(),
  };
  // clearing the input value after getting the value
  inputEle.value = "";
  // condition for if input field is empty. It wont render the template
  if (value !== null) {
    renderEle(newValue);
  } else {
    console.log("Enter a value and then click the button");
  }
  setLocalStorage(newValue);

  hover();
});

function setLocalStorage(value) {
  if (value.val !== null) {
    listarr.push(value);
    localStorage.setItem(`${key}`, JSON.stringify(listarr));
  }
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem(`${key}`));
}

function deleteList(e) {
  e.remove();
}

// code for checkbox
document.addEventListener("click", (e) => {
  if (e.target.matches("input[type=checkbox]")) {
    const id = e.target.dataset.checkid;
    const idValue = listarr.find((ele) => ele.id === id);
    if (idValue.state === true) {
      idValue.state = false;
    } else {
      idValue.state = true;
    }
    localStorage.setItem(`${key}`, JSON.stringify(listarr));
  }
});
